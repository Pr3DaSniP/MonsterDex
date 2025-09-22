import { onMounted, ref } from 'vue'
import { decode } from '@msgpack/msgpack'
import type { BackgroundMonsterImg } from '@/types/monsters'

const loading = ref(true)
const progress = ref(0)
const allMonsters = ref<BackgroundMonsterImg[]>([])
const monstersCache = ref<Record<number, BackgroundMonsterImg[]>>({})

function pickRandomValidMonsters(arr: BackgroundMonsterImg[], n: number): BackgroundMonsterImg[] {
  const validMonsters = arr.filter((m) => m.image_filename != null)
  const result: BackgroundMonsterImg[] = []
  const taken = new Set<number>()

  while (result.length < n && taken.size < validMonsters.length) {
    const index = Math.floor(Math.random() * validMonsters.length)
    if (!taken.has(index)) {
      result.push(validMonsters[index])
      taken.add(index)
    }
  }
  return result
}

export function useBackgroundMonsters() {

  async function loadAllImagesMonsters() {
    loading.value = true
    progress.value = 0
    try {
      const res = await fetch('/data/all_monsters_images.msgpack')
      const contentLength = res.headers.get('Content-Length')
      const total = contentLength ? parseInt(contentLength) : 0

      if (!res.body) throw new Error('ReadableStream non disponible')

      const reader = res.body.getReader()
      const chunks: Uint8Array[] = []
      let receivedLength = 0

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value!)
        receivedLength += value!.length
        if (total) progress.value = (receivedLength / total) * 100
      }

      // concaténer tous les chunks
      const fullArray = new Uint8Array(receivedLength)
      let position = 0
      for (const chunk of chunks) {
        fullArray.set(chunk, position)
        position += chunk.length
      }

      allMonsters.value = decode(fullArray) as BackgroundMonsterImg[]
    } catch (err) {
      console.error('Erreur de chargement:', err)
      allMonsters.value = []
    } finally {
      loading.value = false
      progress.value = 100
    }
  }

  function getRandomMonsters(key: number, count: number = 20) {
    if (!monstersCache.value[key]) {
      monstersCache.value[key] = pickRandomValidMonsters(allMonsters.value, count)
    }

    return monstersCache.value[key]
  }

  return { loadAllImagesMonsters, getRandomMonsters, loading, progress }
}

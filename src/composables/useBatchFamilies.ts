import { ref } from 'vue'

export function useBatchFamilies(families: any[]) {
  const renderedFamilies = ref<any[]>([])
  const batchSize = 1 // ici 1 famille à la fois
  let index = 0

  function startRendering() {
    function batch() {
      const next = families.slice(index, index + batchSize)
      renderedFamilies.value.push(...next)
      index += batchSize
      if (index < families.length) {
        requestAnimationFrame(batch) // laisse le DOM respirer
      }
    }
    batch()
  }

  return { renderedFamilies, startRendering }
}

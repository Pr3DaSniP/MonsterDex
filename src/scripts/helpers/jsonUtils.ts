import { writeFile, readFile } from 'fs/promises'
import path from 'path'

// Fonction pour sauvegarder un json
export async function saveJson(path: string, filename: string, data: any): Promise<void> {
  try {
    await writeFile(`${path}/${filename}.json`, JSON.stringify(data, null, 2))
  } catch (e: unknown) {
    if (e instanceof Error) console.error(e.toString())
    else console.error('Unknown error', e)
  }
}

// Fonction pour mettre à jour un json en ajoutant et/ou supprimant des éléments
export async function updateJson(
  folderPath: string,
  filename: string,
  toRemove: number[],
  toAdd: number[],
): Promise<void> {
  const url = `${folderPath}/${filename}.json`
  const filePath = path.resolve(url)
  let existing: number[] = []

  try {
    const fileContent = await readFile(filePath, 'utf-8')
    existing = JSON.parse(fileContent)
  } catch (e: unknown) {
    if (e instanceof Error)
      console.warn(`Fichier ${filename} introuvable ou vide, un nouveau sera créé.`)
    else console.warn('Unknown error', e)
  }

  existing = existing.filter((item) => !toRemove.includes(item))
  existing.push(...toAdd)
  saveJson(folderPath, 'families_id', existing)
}

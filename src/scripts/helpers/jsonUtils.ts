import { writeFile, readFile } from 'fs/promises'
import pathModule from 'path'

export async function saveJson(path: string, filename: string, data: any): Promise<void> {
  try {
    const fullPath = pathModule.join(path, filename);
    await writeFile(fullPath, JSON.stringify(data, null, 2))
    console.log(`✅ Fichier sauvegardé en Json: ${fullPath}`);
  } catch (e: unknown) {
    if (e instanceof Error) console.error(e.toString())
    else console.error('Unknown error', e)
  }
}

export async function updateJson(
  folderPath: string,
  filename: string,
  toRemove: number[],
  toAdd: number[],
): Promise<void> {
  const url = `${folderPath}/${filename}.json`
  const filePath = pathModule.resolve(url)
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

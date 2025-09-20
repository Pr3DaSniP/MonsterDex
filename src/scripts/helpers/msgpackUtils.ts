import { encode } from '@msgpack/msgpack'
import { writeFile } from 'fs/promises';
import pathModule from 'path'

export async function saveMsgPack(path: string, filename: string, data: any): Promise<void> {
  try {
    const buffer = encode(data); // transforme l'objet JS en buffer MessagePack
    const fullPath = pathModule.join(path, filename);
    await writeFile(fullPath, buffer);
    console.log(`✅ Fichier sauvegardé en MessagePack: ${fullPath}`);
  } catch (err) {
    console.error("❌ Erreur lors de la sauvegarde du fichier MessagePack :", err);
    throw err;
  }
}
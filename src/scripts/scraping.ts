import 'dotenv/config'
import fs from 'fs/promises'

import { fetchFamiliesIds } from './fetchers/fetchFamiliesIds.ts'
import { fetchMonstersByFamily } from './fetchers/fetchMonstersByFamily.ts'
import { loggingFamily } from './logging/loggingFamily.ts'

import { saveJson } from './helpers/jsonUtils.ts'
import { saveMsgPack } from './helpers/msgpackUtils.ts'
import { type SimpleMonsterWithVariants, type BackgroundMonsterImg, type Family, type MonsterRule } from '../types/monsters.ts'

import { applyRules } from './helpers/applyRules.ts'
;(async () => {
  /*
   *  Création du dossier data dans public
   */
  const dataFolder = process.env.OUTPUT_FOLDER || './public/data'
  await fs.mkdir(dataFolder, { recursive: true })

  // /*
  //  * Récupération des exceptions
  //  */
  const file = await fs.readFile('src/scripts/monster-exceptions.json', 'utf-8')
  const rules: MonsterRule[] = JSON.parse(file)

  // /*
  //  *  Récupération des ids des familles de monstres
  //  */
  const families_ids: number[] = await fetchFamiliesIds()
  console.log(`Found ${families_ids.length} families.`)

  let imgMonsters: BackgroundMonsterImg[] = []
  let families: Family[] = []

  for (const familyId of families_ids) {
    /*
     * Récupération des monstres de la famille et création de la liste des monstres
     */
    const family = await fetchMonstersByFamily(familyId, {
      family_id: familyId,
      awaken_level: 1, // Filtre pour les monstres éveillés
      obtainable: true, // Filtre pour les monstres obtenables
    })
    families.push(family)

    /*
     *Création de la liste des images de monstres
     */
    family.monsters.map((m: SimpleMonsterWithVariants) => {
      imgMonsters.push({
        image_filename: m.variants[0].image_filename!,
        id: m.variants[0].com2us_id,
      })
    })

    loggingFamily(family)
  }

  families = await applyRules(rules, families)

  Promise.all([
    saveJson(dataFolder, 'all_monsters_images.json', imgMonsters),
    saveMsgPack(dataFolder, 'all_monsters_images.msgpack', imgMonsters),
    saveJson(dataFolder, 'all_monsters.json', families),
    saveMsgPack(dataFolder, 'all_monsters.msgpack', families),
  ])
})()

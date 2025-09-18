import 'dotenv/config'
import fs from 'fs/promises'
import { encode } from '@msgpack/msgpack'
import { fetchFamiliesIds } from './fetchers/fetchFamiliesIds'
import { fetchMonstersByFamily } from './fetchers/fetchMonstersByFamily'
import { loggingFamilies } from './logging/loggingFamilies'

import { saveJson } from './helpers/jsonUtils'
import { BackgroundMonsterImg, MonsterRule, SimpleMonster } from '../types/monsters'

import { mergeFamilies } from './merger/mergeFamiliesFromFile'
import { applyRules } from './helpers/applyRules'
import { fetchSecondAwakenedFamiliesIds } from './fetchers/fetchSecondAwakenedFamiliesIds'
;(async () => {
  /*
   *  Création du dossier data dans public
   */
  const dataFolder = process.env.OUTPUT_FOLDER || './public/data'
  await fs.mkdir(dataFolder, { recursive: true })

  /*
   * Récupération des exceptions
   */
  const file = await fs.readFile('src/scripts/monster-exceptions.json', 'utf-8')
  const rules: MonsterRule[] = JSON.parse(file)

  /*
   *  Récupération des ids des familles de monstres
   */
  const families_ids = await fetchFamiliesIds()
  console.log(`Found ${families_ids.length} families.`)

  //   let imgMonsters: BackgroundMonsterImg[] = []
  let monsters: SimpleMonster[][] = []

  for (const familyId of families_ids) {
    /*
     * Récupération des monstres de la famille et création de la liste des monstres
     */
    const family = await fetchMonstersByFamily(familyId, {
      family_id: familyId,
      awaken_level: 1, // Filtre pour les monstres éveillés
      obtainable: true, // Filtre pour les monstres obtenables
    })
    monsters.push(family)

    /*
     *Création de la liste des images de monstres
     */
    // family.map((m) => {
    //   imgMonsters.push({ image_filename: m.image_filename!, id: m.com2us_id })
    // })

    // loggingFamilies(familyId, family)
  }

  monsters = await applyRules(rules, monsters)

  //   saveJson(dataFolder, 'all_monsters_images', imgMonsters)
  //   const packedImgMonsters = encode(imgMonsters)
  //   fs.writeFile(dataFolder + '/all_monsters_images.msgpack', Buffer.from(packedImgMonsters))

  //   saveJson(dataFolder, `all_monsters`, monsters)
  //   const packedMonsters = encode(monsters)
  //   fs.writeFile(dataFolder + '/all_monsters.msgpack', Buffer.from(packedMonsters))
})()




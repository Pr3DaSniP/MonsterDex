import 'dotenv/config';
import fs from "fs/promises";
import { encode } from '@msgpack/msgpack'
import { fetchFamiliesIds } from './fetchers/fetchFamiliesIds'
import { fetchMonstersByFamily } from './fetchers/fetchMonstersByFamily'
import { loggingFamilies } from './logging/loggingFamilies.js';

import { saveJson } from './helpers/jsonUtils.js';
import { BackgroundMonsterImg } from '../types/monsters.js';

(async () => {
    const dataFolder = process.env.OUTPUT_FOLDER || "./public/data";
    await fs.mkdir(dataFolder, { recursive: true });

    const families_ids = await fetchFamiliesIds();
    console.log(`Found ${families_ids.length} families.`);

    let imgMonsters: BackgroundMonsterImg[] = [];

    for(const familyId of families_ids) {
        const family = await fetchMonstersByFamily(familyId);
        loggingFamilies(familyId, family);
        family.map((m) => {
            imgMonsters.push({image_filename: m.image_filename!});
        })
    }

    saveJson(dataFolder, 'all_monsters_images', imgMonsters);
    const packedImgMonsters = encode(imgMonsters);
    fs.writeFile(dataFolder + '/all_monsters_images.msgpack', Buffer.from(packedImgMonsters));
})();

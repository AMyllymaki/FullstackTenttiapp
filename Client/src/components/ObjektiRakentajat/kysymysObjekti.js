
import { v4 as uuidv4 } from 'uuid';

export const uusiKysymys = (id = uuidv4()) => {

    let kysymys =
    {
        id: id,
        kuvaus: "Kysymyksen kuvaus",
        vastausVaihtoehdot: [],
        oikeatVastaukset: [],
    }

    return kysymys
}

export const uusiKysymysKannasta = (kysymys) => 
{
    let uusiKysymys =
    {
        id: kysymys.id,
        aihe_id: kysymys.aihe_id,
        kysymys: kysymys.kysymys,
        vastausVaihtoehdot: kysymys.vastausVaihtoehdot,
        oikeatVastaukset: [],
    }

    return uusiKysymys
}
import ServerSettings from '../../ServerSettings.js'
import axios from 'axios';

export const haeVastausVaihtoehdot = async (kysymysID) => {
    try {
        let result = await axios.get(ServerSettings.baseURL + "/vastausvaihtoehto/kysymys/" + kysymysID)

        if (result.statusText === "OK") {

            return result

        } else {
            throw ("vastausvaihtoehto haku ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}


export const haeVastausVaihtoehdotJaLiitäKysymykseen = async (kysymys) => {
    try {
        let result = await axios.get(ServerSettings.baseURL + "/vastausvaihtoehto/kysymys/" + kysymys.id)

        if (result.statusText === "OK") {

            kysymys.vastausVaihtoehdot = result.data

            return kysymys

        } else {
            throw ("vastausvaihtoehto haku ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}



//Palauttaa uuden komponenti ID:n
export const lisääVastausVaihtoehto = async (vastausvaihtoehto) => {

    try {

        const result = await axios.post(ServerSettings.baseURL + "/vastausvaihtoehto/", vastausvaihtoehto)

        if (result.statusText === "OK") {

            return result.data.toString()

        } else {
            throw ("vastausvaihtoehto lisäys ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}


export const poistaVastausVaihtoehto = async (id) => {
    try {
        let result = await axios.delete(ServerSettings.baseURL + "/vastausvaihtoehto/" + id)

        if (result.statusText === "OK") {

            return result

        } else {
            throw ("vastausvaihtoehto poisto ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

export const muokkaaVastausVaihtoehtoa = async (id, vastausvaihtoehto) => {
    try {
        let result = await axios.put(ServerSettings.baseURL + "/vastausvaihtoehto/" + id, vastausvaihtoehto)

        if (result.statusText === "OK") {

            return result

        } else {
            throw ("vastausvaihtoehto muokkaus ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}


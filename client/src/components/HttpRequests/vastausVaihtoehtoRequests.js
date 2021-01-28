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

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    };

    try {

        const result = await axios.post(ServerSettings.baseURL +  "/authenticated" + "/vastausvaihtoehto/", vastausvaihtoehto, config)

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

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    };

    try {
        let result = await axios.delete(ServerSettings.baseURL + "/authenticated" +  "/vastausvaihtoehto/" + id, config)

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

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    };
    
    try {
        let result = await axios.put(ServerSettings.baseURL + "/authenticated" +  "/vastausvaihtoehto/" + id, vastausvaihtoehto, config)

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


import ServerSettings from '../../ServerSettings.js'
import axios from 'axios';

export const haeKysymykset = async () => {
    try {
        let result = await axios.get(ServerSettings.baseURL + "/kysymys/")

        if (result.statusText === "OK") {


            return result

        } else {
            throw ("Kysymysten haku ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

//Palauttaa uuden komponenti ID:n
export const lisääKysymys = async (kysymys) => {


    try {

        const result = await axios.post(ServerSettings.baseURL + "/kysymys/", kysymys)

        if (result.statusText === "OK") {

            return result.data.toString()

        } else {
            throw ("Kysymyksen lisäys ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}


export const poistaKysymys = async (id) => {
    try {
        let result = await axios.delete(ServerSettings.baseURL + "/kysymys/" + id)

        if (result.statusText === "OK") {

            return result

        } else {
            throw ("Kysymyksen poisto ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

export const muokkaaKysymystä = async (id, kysymys) => {
    try {
        let result = await axios.put(ServerSettings.baseURL + "/kysymys/" + id, kysymys)

        if (result.statusText === "OK") {

            return result

        } else {
            throw ("Kysymyksen muokkaus ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}


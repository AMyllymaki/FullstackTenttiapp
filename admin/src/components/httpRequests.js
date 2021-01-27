import ServerSettings from '../ServerSettings.js'
import axios from 'axios';


export const haeKäyttäjät = async (secret) => {

    const config = {
        headers: { Authorization: secret }
    };

    try {
        let result = await axios.get(ServerSettings.baseURL + "/kayttaja", config)

        if (result.statusText === "OK") {

            console.log("Käyttäjät haettu haettu")

            return result

        } else {
            throw ("Käyttäjähaussa ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}


export const registerAdmin = async (credentials) => {

    try {
        let result = await axios.post(ServerSettings.baseURL + "/rekisteroi/", credentials)

        if (result.status === 400) {
            throw ("Rekisteröinti ei onnistunut")
        }

        if (result.statusText === "OK") {


            return result

        } else {
            throw ("Rekisteröinti ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}


export const poistaKäyttäjä = async (id, secret) => {

    const config = {
        headers: { Authorization: secret }
    };

    try {
        let result = await axios.delete(ServerSettings.baseURL + "/kayttaja/" + id, config)


        if (result.statusText === "OK") {

            return result

        } else {
            throw ("käyttäjän poistossa ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}


export const muutaRooli = async (id, rooli, secret) => {

    const config = {
        headers: { Authorization: secret },
      
    };

    const body=
    {
        rooli: rooli
    }

    try {
        let result = await axios.put(ServerSettings.baseURL + "/kayttaja/" + id, body, config)


        if (result.statusText === "OK") {

            return result

        } else {
            throw ("roolin muutoksessa ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

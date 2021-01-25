import ServerSettings from '../../ServerSettings.js'
import axios from 'axios';

//Palauttaa uuden komponenti ID:n
export const lisääVastaus = async (vastaus) => {

    try {

        const result = await axios.post(ServerSettings.baseURL + "/vastaus/", vastaus)

        if (result.statusText === "OK") {

            return result.data

        } else {
            throw ("Vastaus lisäys ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

export const haeKäyttäjänVastauksetTenttiin = async (käyttäjäID, tenttiID) => {
    try {

        console.log("Haetaan käyttäjän vastaukset")

        let result = await axios.get(ServerSettings.baseURL + "/vastaus/kayttaja/" + käyttäjäID + "/tentti/" + tenttiID)


        if (result.statusText === "OK") {

            console.log(result)


            return result

        } else {
            throw ("haeKäyttäjänVastauksetTenttiin ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

export const muokkaaVastausta = async (vastaus) => {

    console.log(vastaus)

    try {
        let result = await axios.put(ServerSettings.baseURL + "/vastaus/" + vastaus.id, vastaus)

        if (result.statusText === "OK") {

            return result

        } else {
            throw ("Tentin muokkauksessa ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}
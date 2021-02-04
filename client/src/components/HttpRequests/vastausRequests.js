import ServerSettings from '../../ServerSettings.js'
import axios from 'axios';

//Palauttaa uuden komponenti ID:n
export const lisääVastaus = async (vastaus) => {

    try {

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        };

        const result = await axios.post(ServerSettings.baseURL + "/user" + "/vastaus/", vastaus, config)

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

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        };

        console.log("Haetaan käyttäjän vastaukset")

        let result = await axios.get(ServerSettings.baseURL + "/user/vastaus/kayttaja/" + käyttäjäID + "/tentti/" + tenttiID, config)


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

    try {

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
        };

        let result = await axios.put(ServerSettings.baseURL + "/user" + "/vastaus/" + vastaus.id, vastaus, config)

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
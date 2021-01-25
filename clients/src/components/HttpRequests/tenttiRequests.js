import ServerSettings from '../../ServerSettings.js'
import axios from 'axios';

export const haeTentit = async () => {

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    };

    try {
        let result = await axios.get(ServerSettings.baseURL + "/authenticated" + "/tentti/", config)

        if (result.statusText === "OK") {

            console.log("Tentit haettu")

            return result

        } else {
            throw ("Tenttihaussa ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

//Palauttaa uuden komponenti ID:n
export const lisääTentti = async (tentti) => {

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    };
  
    try {

        const result = await axios.post(ServerSettings.baseURL + "/authenticated" + "/tentti/", tentti, config)

        if (result.statusText === "OK") {

         
            return result.data.toString()

        } else {
            throw ("Tenttilisäyksessä ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}


export const poistaTentti = async (id) => {

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    };

    try {
        let result = await axios.delete(ServerSettings.baseURL + "/authenticated"  + "/tentti/" + id, config)

   
        if (result.statusText === "OK") {

            return result

        } else {
            throw ("Tentin poistossa ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

export const muokkaaTenttiä = async (id, tentti) => {

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    };

    try {
        let result = await axios.put(ServerSettings.baseURL + "/authenticated"  + "/tentti/" + id, tentti, config)

      
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

export const julkaiseTentti = async (id) => {

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    };

    const bodyParameters = {
    };


    try {
        let result = await axios.put(ServerSettings.baseURL + "/authenticated"  + "/julkaise/tentti/" + id, bodyParameters, config)

        if (result.data.length > 0) {

            return result

        } else {
            throw ("Tentin julkaisu ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}
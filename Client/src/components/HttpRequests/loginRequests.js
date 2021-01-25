import ServerSettings from '../../ServerSettings.js'
import axios from 'axios';


export const loginUsername = async (credentials) => {
  
    try {
        let result = await axios.post(ServerSettings.baseURL + "/login/", credentials)

        if (result.statusText === "OK") {


            return result

        } else {
            throw ("Kirjautuminen ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

export const loginToken = async (token) => {

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const bodyParameters = {
     };

     console.log(config)
  
    try {
        let result = await axios.post(ServerSettings.baseURL + "/authenticated" + "/loginToken/", bodyParameters, config)

        if (result.statusText === "OK") {


            return result

        } else {
            throw ("Kirjautuminen ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

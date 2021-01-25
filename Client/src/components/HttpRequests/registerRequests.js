import ServerSettings from '../../ServerSettings.js'
import axios from 'axios';

export const registerUser = async (credentials) => {
  
    try {
        let result = await axios.post(ServerSettings.baseURL + "/rekisteroi/", credentials)

        if(result.status === 400)
        {
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

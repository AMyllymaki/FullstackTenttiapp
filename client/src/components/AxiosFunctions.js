import axios from 'axios';

export const createData = async (data) => {


    try {
        return await axios.post("http://localhost:3000/tentit", data)

    } catch (exception) {
     
    }
}


export const fetchData = async () => {
    try {
        let result = await axios.get("http://localhost:4000/1")

        if (result.data.length > 0) {

            return result

        } else {
            throw ("Nyt pitää tentit kyllä alustaa!")
        }
    }
    catch (exception) {


        throw (exception)

    }
}

export const createVastaukset = async (data) => {


    try {
        return await axios.post("http://localhost:3000/vastaukset", data)

    } catch (exception) {
     
    }
}


export const fetchVastaukset = async () => {
    try {
        let result = await axios.get("http://localhost:3000/vastaukset")

        if (result.data.length > 0) {

           
            return result

        } else {
            throw ("Nyt pitää vastaukset kyllä alustaa!")
        }
    }
    catch (exception) {

        throw (exception)

    }
}

export const patchVastaukset = async (id, data) => {

    if(data === undefined)
    {
        return
    }

    try {
        return await axios.patch("http://localhost:3000/vastaukset", data)

    } catch (exception) {
   
    }
}


export const patchData = async (id, data) => {

    if(data === undefined)
    {
        return
    }

 
    try {
        return await axios.patch("http://localhost:3000/tentit", data)

    }
    catch (exception) {
    
    }
}
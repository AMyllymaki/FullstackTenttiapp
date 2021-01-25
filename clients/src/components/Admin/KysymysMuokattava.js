import { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ImageIcon from '@material-ui/icons/Image';
import Dropzone from '../Dropzone'


//This is from material-ui documentation

function KysymysMuokattava(props) {

    const [addPicture, setAddPicture] = useState(false)
    const [picture, setPicture] = useState(undefined)

    const { kysymys, vastausVaihtoehdot, oikeatVastaukset } = props.kysymys


    const checkboxClicked = (e, i) => {
        props.handleInputChange(e.target.checked, props.tenttiID, props.kysymysID, i, true)
    }

    const muutaKysymyksenKuvaus = (e) => {
        props.handleInputChange(e.target.value, props.tenttiID, props.kysymysID)
    }

    const muutaVastauksenKuvaus = (e, i) => {
        props.handleInputChange(e.target.value, props.tenttiID, props.kysymysID, i)
    }

    const PoistaVastaus = (i) => {
        props.handleDelete(props.tenttiID, props.kysymysID, i)
    }

    const PoistaKysymys = () => {
        props.handleDelete(props.tenttiID, props.kysymysID)
    }

    const handleLisäys = () => {
        props.handleAdding(props.tenttiID, props.kysymysID)
    }

    //Testausta varten
    const haeKysymysKomponentinNimi = (kysymysNimi, i) => {


        if (kysymysNimi === "Kysymyksen kuvaus" || kysymysNimi === undefined) {

            return "tyhjä_kysymys"
        }

        let paluuarvo = "kysymys" + i

        return paluuarvo
    }

    //Testausta varten
    const haeVastausvaihtoehtoKomponentinNimi = (vastausVaihtoehtoNimi, i) => {

        if (vastausVaihtoehtoNimi === "") {

            return "tyhjä_vastausvaihtoehto"
        }

        let paluuarvo = "vastausvaihtoehto" + i

        return paluuarvo
    }

    const getPictureFromDropzone = (picture) => {

        console.log(picture)
        setPicture(picture)
    }

    return (

        <Paper style={{ width: '100%', padding: 15 }}>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                <div style={{ width: '100%' }}>
                    <TextField
                        name={haeKysymysKomponentinNimi(kysymys, props.kysymysnro)}
                        fullWidth
                        label={kysymys}
                        variant="outlined"
                        onChange={(e) => muutaKysymyksenKuvaus(e)} />

                    <div style={{ display: 'flex', width: '100%', minHeight: 75, maxHeight: 200, paddingTop: 10,  paddingBottom: 10,  alignItems: 'center' }}>
                        <IconButton onClick={() => PoistaKysymys()}>
                            <DeleteIcon />
                        </IconButton>

                        {addPicture ?
                            picture ?
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                                    <img src={picture} width={150} height={150} />
                                </div>
                                :
                                <Dropzone getPictureFromDropzone={getPictureFromDropzone} />
                            :
                            <IconButton onClick={() => setAddPicture(true)}>
                                <ImageIcon />
                            </IconButton>
                        }
                    </div>
                    {vastausVaihtoehdot.map((vastausVaihtoehto, i) =>

                        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Checkbox
                                checked={vastausVaihtoehto.oikea_vastaus}
                                onChange={(e) => checkboxClicked(e, vastausVaihtoehto.id)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <TextField
                                name={haeVastausvaihtoehtoKomponentinNimi(vastausVaihtoehto.vaihtoehto, i)}
                                fullWidth
                                label={vastausVaihtoehto.vaihtoehto}
                                variant="outlined"
                                onChange={(e) => muutaVastauksenKuvaus(e, vastausVaihtoehto.id)} />

                            <IconButton onClick={() => PoistaVastaus(vastausVaihtoehto.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>)}

                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton name={"LisääVastausvaihtoehto"} onClick={() => handleLisäys()} >
                            <AddCircleRoundedIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default KysymysMuokattava
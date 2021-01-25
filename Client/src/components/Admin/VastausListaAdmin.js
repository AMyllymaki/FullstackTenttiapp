
import { UserContext } from '../../App.js'
import { useContext} from 'react';

import KysymysMuokattava from './KysymysMuokattava'
import logo from '../../images/selmaSpin.gif'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import DeleteIcon from '@material-ui/icons/Delete';

import { uusiKysymys, uusiKysymysKannasta } from '../ObjektiRakentajat/kysymysObjekti'
import { uusiTentti } from '../ObjektiRakentajat/tenttiObjekti'
import { uusiVastausvaihtoehto } from '../ObjektiRakentajat/vastausVaihtoehtoObjekti'

import { poistaTentti, lisääTentti, muokkaaTenttiä } from "../HttpRequests/tenttiRequests.js"
import { poistaKysymys, lisääKysymys, muokkaaKysymystä } from "../HttpRequests/kysymysRequests.js"
import { lisääVastausVaihtoehto, poistaVastausVaihtoehto, muokkaaVastausVaihtoehtoa } from "../HttpRequests/vastausVaihtoehtoRequests.js"
import { lisääKysymysTenttiin, haeTentinKysymykset } from "../HttpRequests/tenttiKysymysRequests.js"

function VastausListaAdmin() {

    const { state, dispatch } = useContext(UserContext)
   
    const valitseTentti = (tentti) => {

        haeTentinKysymykset(tentti.id).then((kysymykset) => {

            let tmpKysymykset = []
            let tmpTentit = JSON.parse(JSON.stringify(state.tentit))
            let muutettuTentti = haeIDllä(tentti.id, tmpTentit)

            kysymykset.forEach(kysymys => {
                let uusiKysymys = uusiKysymysKannasta(kysymys)
                tmpKysymykset.push(uusiKysymys)
            });

            muutettuTentti.kysymykset = tmpKysymykset
            dispatch({ type: "MuutaTenttejä", payload: tmpTentit })


        }).catch((error) => {
            console.log(error)
        })

        dispatch({ type: "PiilotaVastaukset" })
        dispatch({ type: "MuutaValittuTentti", payload: tentti.id })
    }

    //Jos tenttiID ja kysymysID -> Lisätään vastausvaihtoehto
    //Jos tenttiID -> lisätään kysymys
    //muuten -> lisätään tentti
    const lisääKomponentti = (tenttiID = undefined, kysymysID = undefined) => {

        let tmpTentit = JSON.parse(JSON.stringify(state.tentit))

        if (tenttiID === undefined) {

            let tentti = uusiTentti()
            lisääTentti(tentti).then((response) => {


                tentti.id = response
                tmpTentit.push(tentti)
                lisääTenttiTestaustaVarten(tentti.id)
                dispatch({ type: "MuutaTenttejä", payload: tmpTentit })



            }).catch((error) => {
                console.log(error)
            })

            return
        }

        let tenttiJohonLisätään = haeIDllä(tenttiID, tmpTentit)
        let kysymysJohonLisätään = haeIDllä(kysymysID, tenttiJohonLisätään.kysymykset)

        if (tenttiID !== undefined && kysymysID !== undefined) {

            let vVaihtoehto = uusiVastausvaihtoehto(kysymysID)

            lisääVastausVaihtoehto(vVaihtoehto).then((response) => {

                vVaihtoehto.id = response
                kysymysJohonLisätään.vastausVaihtoehdot.push(vVaihtoehto)
                dispatch({ type: "MuutaTenttejä", payload: tmpTentit })

            }).catch((error) => {
                console.log(error)
            })
        }
        else if (tenttiID !== undefined) {

            let kysymys = uusiKysymys()

            lisääKysymys(kysymys).then((response) => {

                kysymys.id = response

                lisääKysymysTenttiin(tenttiJohonLisätään.id, kysymys.id).then((response) => {

                    tenttiJohonLisätään.kysymykset.push(kysymys)
                    dispatch({ type: "MuutaTenttejä", payload: tmpTentit })

                }).catch((error) => {
                    console.log(error)
                })

            }).catch((error) => {
                console.log(error)
            })

        }


    }

    //Jos tenttiID ja kysymysID ja i -> Muuta vastausvaihtoehtoa
    //Jos tenttiID ja kysymysID -> Muuta kysymyskuvausta
    //Jos tenttiID -> Muuta tenttinimeä
    const muutaKomponenttia = (uusiArvo, tenttiID, kysymysID = undefined, vastausVaihtoehtoID = undefined, oikeaVastausMuutos = false) => {

        let tmpTentit = JSON.parse(JSON.stringify(state.tentit))

        let muutettuTentti = haeIDllä(tenttiID, tmpTentit)
        let muutettuKysymys
        let muutettuVastausvaihtoehto

        if (muutettuTentti.kysymykset === undefined) {
            muutettuKysymys = undefined
        }
        else {

            muutettuKysymys = haeIDllä(kysymysID, muutettuTentti.kysymykset)
        }

        if (muutettuKysymys !== undefined) {
            muutettuVastausvaihtoehto = haeIDllä(vastausVaihtoehtoID, muutettuKysymys.vastausVaihtoehdot)
        }

        if (oikeaVastausMuutos) {
            muutettuVastausvaihtoehto.oikea_vastaus = uusiArvo

            muokkaaVastausVaihtoehtoa(vastausVaihtoehtoID, muutettuVastausvaihtoehto).then((response) => {

                dispatch({ type: "MuutaTenttejä", payload: tmpTentit })

            }).catch((error) => {
                console.log(error)
            })

        }
        else if (kysymysID !== undefined && vastausVaihtoehtoID !== undefined) {

            muutettuVastausvaihtoehto.vaihtoehto = uusiArvo

            muokkaaVastausVaihtoehtoa(vastausVaihtoehtoID, muutettuVastausvaihtoehto).then((response) => {

                dispatch({ type: "MuutaTenttejä", payload: tmpTentit })

            }).catch((error) => {
                console.log(error)
            })
        }
        else if (kysymysID !== undefined) {

            muutettuKysymys.kysymys = uusiArvo

            muokkaaKysymystä(kysymysID, muutettuKysymys).then((response) => {

                dispatch({ type: "MuutaTenttejä", payload: tmpTentit })

            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            muutettuTentti.nimi = uusiArvo

            muokkaaTenttiä(tenttiID, muutettuTentti).then((response) => {

                dispatch({ type: "MuutaTenttejä", payload: tmpTentit })

            }).catch((error) => {
                console.log(error)
            })

        }

        // dispatch({ type: "MuutaTenttejä", payload: tmpTentit })
    }

    //Jos tenttiID ja kysymysID ja i -> Poista vastaus
    //Jos tenttiID ja kysymysID -> Poista kysymys
    //Jos tenttiID -> Poista tentti
    const poistaKomponentti = (tenttiID, kysymysID = undefined, vastausVaihtoehtoID = undefined) => {

        let tmpTentit = JSON.parse(JSON.stringify(state.tentit))

        let PoistettavanTentti = haeIDllä(tenttiID, tmpTentit)
        let PoistettavanKysymys
        let PoistettavaVastausvaihtoehto

        if (PoistettavanTentti.kysymykset === undefined) {
            PoistettavanKysymys = undefined
        }
        else {
            PoistettavanKysymys = haeIDllä(kysymysID, PoistettavanTentti.kysymykset)
        }

        if (PoistettavanKysymys !== undefined) {
            PoistettavaVastausvaihtoehto = haeIDllä(vastausVaihtoehtoID, PoistettavanKysymys.vastausVaihtoehdot)
        }


        if (kysymysID !== undefined && vastausVaihtoehtoID !== undefined) {

            poistaVastausVaihtoehto(vastausVaihtoehtoID).then((response) => {

                PoistettavanKysymys.vastausVaihtoehdot = PoistettavanKysymys.vastausVaihtoehdot.filter(vastausvaihtoehto => vastausvaihtoehto.id !== vastausVaihtoehtoID)
                dispatch({ type: "MuutaTenttejä", payload: tmpTentit })

            }).catch((error) => {
                console.log(error)
            })

        }
        else if (kysymysID !== undefined) {

            poistaKysymys(kysymysID).then((response) => {

                PoistettavanTentti.kysymykset = PoistettavanTentti.kysymykset.filter(kysymys => kysymys.id !== kysymysID)
                dispatch({ type: "MuutaTenttejä", payload: tmpTentit })

            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            tmpTentit = tmpTentit.filter(tentti => tentti.id !== tenttiID)

            poistaTentti(tenttiID).then((response) => {

                dispatch({ type: "MuutaTenttejä", payload: tmpTentit })

            }).catch((error) => {
                console.log(error)
            })
        }
    }


    const haeIDllä = (id, taulukko) => {

        if (id === undefined) {
            return undefined
        }

        if (taulukko === undefined) {
            return undefined
        }

        return taulukko.find(alkio => alkio.id === id)
    }

    const checkValittuTentti = (valittuTentti) => {

        if (valittuTentti === undefined) {
            return undefined
        }

        return valittuTentti.id
    }


    const muutaTenttiä = (e, tentti) => {

        muutaKomponenttia(e.target.value, tentti.id)
    }

    //Lisää staten listaan objektin jossa on tässä sessiossa luodun tentin ID ja tenttiä vastaavan UI komponentin nimi
    const lisääTenttiTestaustaVarten = (tenttiID) => {
        let tmpTestausTentit = [...state.testausTentit]

        let pituus = tmpTestausTentit.length

        let tmpTentti =
        {
            id: tenttiID,
            nimi: "uusiTentti" + (pituus + 1)
        }

        tmpTestausTentit.push(tmpTentti)

        dispatch({ type: "LisääTestausTentti", payload: tmpTestausTentit })
    }

    //Testausta varten
    const haeTenttiKomponentinNimi = (tentinNimi, i) => {

        if (tentinNimi === "Tentin nimi") {
            return "tyhjä_tentti"
        }

        let paluuarvo = "tentti" + i

        return paluuarvo
    }

    

  

    let valittuTentti = haeIDllä(state.valittuTenttiIndex, state.tentit)

    return (<div style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
            {state.tentit.map((tentti, i) =>

                <div key={i} style={{ display: 'flex', flexDirection: 'row' }} >
                    <div onClick={() => valitseTentti(tentti)}>
                        <TextField
                            name={haeTenttiKomponentinNimi(tentti.nimi, i)}
                            color={tentti.id === checkValittuTentti(state.valittuTenttiIndex) ? "primary" : "secondary"}
                            fullWidth
                            label={tentti.nimi}
                            variant="outlined"
                            onChange={(e) => muutaTenttiä(e, tentti)} />
                    </div>
                    <IconButton onClick={() => poistaKomponentti(tentti.id)}>
                        <DeleteIcon />
                    </IconButton>

                    
                </div>
            )}

            <IconButton name={"LisääTenttiButton"} onClick={() => lisääKomponentti()} >
                <AddCircleRoundedIcon />
            </IconButton>

        </div>

        {
            state.loading ?
                <div style={{ width: '100%' }}>
                    <img src={logo} alt="Loading..." />
                </div>
                :
                valittuTentti !== undefined && valittuTentti.kysymykset && <div style={{ width: '100%' }}>
                    {valittuTentti.kysymykset.map((kysymys,i) =>
                        <KysymysMuokattava
                            key={kysymys.id}
                            tenttiID={valittuTentti.id}
                            kysymysID={kysymys.id}
                            handleInputChange={muutaKomponenttia}
                            handleDelete={poistaKomponentti}
                            handleAdding={lisääKomponentti}
                            kysymys={kysymys}
                            kysymysnro={i} />
                    )}

                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                        <IconButton name={"LisääKysymysButton"} onClick={() => lisääKomponentti(valittuTentti.id)} >
                            <AddCircleRoundedIcon />
                        </IconButton>
                    </div>
                </div>
        }
    </div>
    )
}

export default VastausListaAdmin
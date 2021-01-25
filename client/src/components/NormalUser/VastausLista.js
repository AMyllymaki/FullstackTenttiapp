
import { UserContext } from '../../App.js'
import { useContext, useState } from 'react';
import rand from '../Random'

import Kysymys from './Kysymys'
import logo from '../../images/selmaSpin.gif'
import Button from '@material-ui/core/Button';
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Radar } from 'react-chartjs-2'
import { uusiKysymysKannasta } from '../ObjektiRakentajat/kysymysObjekti'
import { haeTentinKysymykset } from "../HttpRequests/tenttiKysymysRequests.js"
import { lisääVastaus, haeKäyttäjänVastauksetTenttiin, muokkaaVastausta } from "../HttpRequests/vastausRequests.js"
import messages from '../../messages';
import { FormattedMessage } from 'react-intl';


function VastausLista() {

    const { state, dispatch } = useContext(UserContext)
    const [graafi, setGraafi] = useState(0)


    let lataus = undefined

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

        haeKäyttäjänVastauksetTenttiin(state.käyttäjäID, tentti.id).then((vastaukset) => {

            dispatch({ type: "MuutaVastaukset", payload: vastaukset.data })

        }).catch((error) => {
            console.log(error)
        })

        dispatch({ type: "PiilotaVastaukset" })
        dispatch({ type: "MuutaValittuTentti", payload: tentti.id })
    }

    const valitseVastaus = (vaihtoehto_id, id = undefined) => {

        let tmpVastaukset = [...state.vastaukset]
        let vastaus = haeIDllä(id, tmpVastaukset)

        if (vastaus === undefined) {

            vastaus =
            {
                tyyppi: true,
                vaihtoehto_id: vaihtoehto_id,
                käyttäjä_id: state.käyttäjäID,
            }

            lisääVastaus(vastaus).then((response) => {

                vastaus.id = response.id.toString()
                vastaus.vastauspäivämäärä = response.vastauspäivämäärä.toString()
                tmpVastaukset.push(vastaus)
                dispatch({ type: "MuutaVastaukset", payload: tmpVastaukset })

            }).catch((error) => {
                console.log(error)
            })

        }
        else {
            
            vastaus.tyyppi = !vastaus.tyyppi

            console.log(vastaus.tyyppi)

            muokkaaVastausta(vastaus).then((response) => {

                dispatch({ type: "MuutaVastaukset", payload: tmpVastaukset })

            }).catch((error) => {
                console.log(error)
            })


        }
    }


    const checkValittuTentti = (valittuTentti) => {

        if (valittuTentti === undefined) {
            return undefined
        }

        return valittuTentti.id
    }

    const lataa = () => {
        if (lataus !== undefined) {
            clearTimeout(lataus)
        }

        dispatch({ type: "Lataa" })

        lataus = setTimeout(() => {

            dispatch({ type: "LopetaLataus" })

        }, 1000 * rand(1));
    }



    const muutaNäytävastaukset = () => {

        if (state.näytäVastaukset) {

            dispatch({ type: "PiilotaVastaukset" })
        }
        else {
            dispatch({ type: "NäytäVastaukset" })
        }

    }

    const muutaNäytäGraafi = () => {

        if (state.näytäGraafi) {

            dispatch({ type: "PiilotaGraafi" })
        }
        else {
            dispatch({ type: "NäytäGraafi" })
        }

    }

    const haeIDllä = (id, taulukko) => {

        if (id === undefined) {
            return undefined
        }


        let subTaulukko = taulukko.find(alkio => alkio.id == id)

        return subTaulukko
    }

    const luoGraafi = (type = 0) => {

        let data

        switch (type) {
            case 0:
                data = {
                    labels: ['Oikein', 'Väärin'],
                    datasets: [
                        {
                            label: '# of Votes',
                            data: [43, 7],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 99, 132, 0.2)',

                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)',


                            ],
                            borderWidth: 1,
                        },
                    ],
                }
                return <Pie data={data} />

            case 1:
                data = {
                    labels: ['Oikein', 'Väärin'],
                    datasets: [
                        {
                            label: '# of Votes',
                            data: [43, 7],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 99, 132, 0.2)',

                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)',


                            ],
                            borderWidth: 1,
                        },
                    ],
                }
                return <Doughnut data={data} />
            case 2:

                var options = {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                }

                data = {
                    labels: ['Aritmetiikka', 'Todennäköisyys', "Geometria", "Trigonometria", "Joukko-oppi"],
                    datasets: [
                        {
                            label: 'Väärin',
                            data: [2, 1, 3, 1, 0],
                            backgroundColor: 'rgb(255, 99, 132)',
                        },
                        {
                            label: 'Oikein',
                            data: [8, 9, 7, 9, 10],
                            backgroundColor: 'rgb(54, 162, 235)',
                        },
                    ],
                }


                return <Bar data={data} options={options} />

            case 3:

                var options = {
                    scales: {
                        yAxes: [
                            {
                                stacked: true,
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                        xAxes: [
                            {
                                stacked: true,
                            },
                        ],
                    },
                }

                data = {
                    labels: ['Aritmetiikka', 'Todennäköisyys', "Geometria", "Trigonometria", "Joukko-oppi"],
                    datasets: [
                        {
                            label: 'Väärin',
                            data: [2, 1, 3, 1, 0],
                            backgroundColor: 'rgb(255, 99, 132)',
                        },
                        {
                            label: 'Oikein',
                            data: [8, 9, 7, 9, 10],
                            backgroundColor: 'rgb(54, 162, 235)',
                        },
                    ],
                }
                return <Bar data={data} options={options} />


            case 4:

                var options = {

                    scale: {
                        ticks: { beginAtZero: true },
                    },
                }

                data = {
                    labels: ['Aritmetiikka', 'Todennäköisyys', "Geometria", "Trigonometria", "Joukko-oppi"],
                    datasets: [
                        {
                            label: 'Oikein',
                            data: [8, 9, 7, 9, 10],
                            backgroundColor: 'rgb(54, 162, 235, 0.2)',
                        },
                    ],
                }


                return <Radar data={data} options={options} />
        }



        return data
    }

    const vaihdaGraafi = () => {
        let tmpGraafi = graafi

        if (tmpGraafi === 4) {
            tmpGraafi = 0
        }
        else {
            tmpGraafi = tmpGraafi + 1
        }

        setGraafi(tmpGraafi)
    }

    let valittuTentti = haeIDllä(state.valittuTenttiIndex, state.tentit)


    return (<div style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
            {state.tentit.map((tentti, i) =>

                <Button key={i} color="primary" variant={tentti.id === checkValittuTentti(valittuTentti) ? "outlined" : "text"} onClick={() => valitseTentti(tentti)} >{tentti.nimi}</Button>
            )}
        </div>

        {
            state.loading ?
                <div style={{ width: '100%' }}>
                    <img src={logo} alt="Loading..." />
                </div>
                :

                state.näytäGraafi ?
                    <div>
                        {
                            luoGraafi(graafi)
                        }

                        <div style={{ paddingTop: 20 }}>
                            <Button color="primary" variant="contained" onClick={muutaNäytäGraafi}>Piilota Graafi</Button>
                            <Button color="primary" variant="contained" onClick={vaihdaGraafi}>{"Graafi " + graafi}</Button>
                        </div>

                    </div>
                    :

                    valittuTentti !== undefined && <div style={{ width: '100%' }}>
                        {valittuTentti.kysymykset.map(kysymys =>
                            <Kysymys
                                key={kysymys.id}
                                handleCheckboxChange={valitseVastaus}
                                kysymys={kysymys} />
                        )}



                        <Button color="primary" variant="contained" onClick={muutaNäytävastaukset}>
                            {state.näytäVastaukset ?
                              <FormattedMessage {...messages.btnPiilotaVastaukset} />
                                :
                                <FormattedMessage {...messages.btnNäytävastaukset} />
                            }
                        </Button>

                        {state.näytäVastaukset &&
                            <Button color="primary" variant="contained" onClick={muutaNäytäGraafi}>   <FormattedMessage {...messages.btnNäytäGraafi} /></Button>
                        }

                    </div>
        }
    </div>
    )
}

export default VastausLista
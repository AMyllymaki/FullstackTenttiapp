import { useEffect, useReducer, createContext, useRef } from "react"
import Button from '@material-ui/core/Button';

import VastausLista from './components/NormalUser/VastausLista'
import VastausListaAdmin from './components/Admin/VastausListaAdmin'
import { haeTentit } from "./components/HttpRequests/tenttiRequests.js"
import Login from "./components/LoginPage/Login.js"
import { loginToken } from "./components/HttpRequests/loginRequests.js"
import { LoginSuccess, TriggerToast } from './components/SweetAlerts.js'
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const mainContainerStyle =
{
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 20,
  marginBottom: 50,

}

const tableContainerStyle =
{
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: 1184,
}

const UserContext = createContext(null)

const nollaaVastaukset = () => {
  window.localStorage.removeItem('vastaukset')
}



const initialState =
{
  näytäVastaukset: false,
  valittuTenttiIndex: undefined,
  vastaukset: [],
  loading: false,
  tentit: [],
  admin: false,
  näytäGraafi: false,
  käyttäjäID: undefined,
  käyttäjäRooli: undefined,

  //Pitää sisällään tässä sessiossa luotujen tenttien ID:t ja nimet näiden tenttien UI komponenteille
  testausTentit: [],

}

const reducer = (state = initialState, action) => {

  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {

    case "MuutaTenttejä":
      newState.tentit = action.payload

      //Tätä ei ehkä saa tehdä tässä. Jatkossa pitäisi nollata vain jonkun tietyn kysymyksen tiedot
      nollaaVastaukset()

      return newState
    case "NäytäVastaukset":
      newState.näytäVastaukset = true
      return newState
    case "PiilotaVastaukset":
      newState.näytäVastaukset = false
      return newState
    case "Lataa":
      newState.loading = true
      return newState
    case "LopetaLataus":
      newState.loading = false
      return newState
    case "MuutaValittuTentti":
      newState.valittuTenttiIndex = action.payload
      return newState
    case "MuutaVastaukset":
      newState.vastaukset = action.payload
      return newState
    case "LuoTentit":
      newState.tentit = action.payload
      return newState
    case "VaihdaKäyttäjä":
      newState.admin = action.payload
      return newState
    case "NäytäGraafi":
      newState.näytäGraafi = true
      return newState
    case "PiilotaGraafi":
      newState.näytäGraafi = false
      return newState
    case "MuutaKäyttäjäID":
      newState.käyttäjäID = action.payload
      return newState

    case "MuutaKäyttäjäRooli":
      newState.käyttäjäRooli = action.payload
      return newState
    case "LisääTestausTentti":
      newState.testausTentit = action.payload
      return newState
    case "KirjauduUlos":
      //Käyttäjällä pitäis olla omat tentit jotka haetaan kirjautuessa
      let tmpTentit = newState.tentit
      newState = initialState
      newState.tentit = tmpTentit
      return newState
    default:
      return newState


  }
}
const URL = 'ws://localhost:2356'

function App(props) {

  const [state, dispatch] = useReducer(reducer, initialState)

  const ws = useRef(null)

  useEffect(() => {

    ws.current = new WebSocket(URL)

    ws.current.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected")
    }

    ws.current.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      console.log("Got Message")
      console.log(evt.data)
      TriggerToast(evt.data)
  
    }

    ws.current.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      ws.current = new WebSocket(URL)
    }


    LoginWithToken(localStorage.getItem('jwtToken'))

  }, [])

  useEffect(() => {
    if (state.käyttäjäID === undefined) {
      return
    }

    luoTentit(localStorage.getItem('jwtToken')).then((response) => {
      if (response !== undefined) {

        //luoVastaukset(response)
        dispatch({ type: "LuoTentit", payload: response })

      }
    })
  }, [state.käyttäjäID])

  const LoginWithToken = async (token) => {


    if (token == "null" || token == null) {
      console.log("token is null")
      return false
    }

    try {
      let LoggedUser = await loginToken(token)

      console.log(LoggedUser)

      LoginSuccess(LoggedUser.data.User.käyttäjätunnus)

      dispatch({ type: "MuutaKäyttäjäID", payload: LoggedUser.data.User.id })
      dispatch({ type: "MuutaKäyttäjäRooli", payload: LoggedUser.data.User.rooli })
      return LoggedUser
    }
    catch (e) {

      if (e.response === undefined) {
        console.log("No response from the server")
        return false
      }


      if (e.response.status === 401) {
        localStorage.setItem('jwtToken', null);
        dispatch({ type: "KirjauduUlos" })
      }

      return false
    }
  }


  const TarkistaState = () => {
    console.log(state)
  }

  const Logout = () => {

    localStorage.setItem('jwtToken', null);
    dispatch({ type: "KirjauduUlos" })

  }

  const luoTentit = async (LoggedToken) => {


    console.log("LoggedToken")
    console.log(LoggedToken)

    let luodutTentit = await haeTentit().then((response) => {

      if (response.data !== undefined) {

        let tentit = response.data

        tentit.forEach(tentti => {

          tentti.kysymykset = []
        });

        return response.data
      }

    }).catch((exception) => {

    })

    if (luodutTentit === undefined) {
      luodutTentit = []
    }

    return luodutTentit
  }

  const vaihdaKäyttäjää = () => {
    //  let vastaukset = luoVastaukset(state.tentit, true)
    dispatch({ type: "VaihdaKäyttäjä", payload: !state.admin })
  }

  const tentit = () => {


  }

  const vaihdaKieli = () => {

    props.vaihdaKieli()
  }

  const isLoggedIn = () => {
    if (state.käyttäjäID === undefined) {
      return false
    }

    return true
  }

  return (

    <UserContext.Provider value={{ state, dispatch }}>
      <div>
        <div style={{ backgroundColor: '#3F51B5' }}>
          <div style={{ height: 64, width: '100%', display: 'flex', alignItems: 'center', paddingLeft: 24 }}>
            <div style={{ height: '100%', width: 200, display: 'flex' }}>

              <Button onClick={vaihdaKieli} style={{ color: 'white' }}>
                <FormattedMessage {...messages.btnVaihdaKieli} />
              </Button>
            </div>
            {isLoggedIn() ?
              <div style={{ height: '100%', width: '100%', display: 'flex' }}>

                <Button onClick={tentit} style={{ color: 'white' }}>
                  <FormattedMessage {...messages.btnTentti} />
                </Button>
                <Button onClick={TarkistaState} style={{ color: 'white' }}>
                  <FormattedMessage {...messages.btnTarkistaState} />
                </Button>
                <Button name={"VaihdaKäyttäjääButton"} onClick={vaihdaKäyttäjää} style={{ color: 'white' }}>

                  {state.admin ?
                    <FormattedMessage {...messages.btnVaihdaNormikäyttäjäksi} />
                    :
                    <FormattedMessage {...messages.btnVaihdaAdminiksi} />
                  }
                </Button>
                <Button name={"LogoutButton"} onClick={Logout} style={{ color: 'white' }}>
                  <FormattedMessage {...messages.btnKirjauduUlos} />
                </Button>
              </div>
              :

              []
            }


          </div>
        </div>

        <div style={mainContainerStyle}>
          {isLoggedIn() ?

            <div style={tableContainerStyle}>
              {state.admin ?
                <VastausListaAdmin />
                :
                <VastausLista />
              }

            </div>
            :
            <Login />
          }
        </div>


      </div>
    </UserContext.Provider>

  );
}

export { App, UserContext }


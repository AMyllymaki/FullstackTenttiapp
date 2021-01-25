
import { UserContext } from '../../App.js'
import { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { loginUsername } from '../HttpRequests/loginRequests.js'
import { registerUser } from '../HttpRequests/registerRequests.js'
import Swal from 'sweetalert2'
import { LoginSuccess } from '../SweetAlerts.js'
import messages from '../../messages';
import { FormattedMessage } from 'react-intl';
import StoryButton from '../StorybookComponents'



function Login() {


    const LoginWithUsername = async () => {

        let credentials =
        {
            käyttäjätunnus: username,
            salasana: password,
        }

        try {
            let LoggedUser = await loginUsername(credentials)

            localStorage.setItem('jwtToken', LoggedUser.data.token);

            LoginSuccess(credentials.käyttäjätunnus)

            dispatch({ type: "MuutaKäyttäjäID", payload: LoggedUser.data.user.id })
            dispatch({ type: "MuutaKäyttäjäRooli", payload: LoggedUser.data.user.rooli })

        }
        catch (e) {

            console.log(e)

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Kirjautuminen epäonnistui'
            })
        }
    }

    const RegisterUser = async () => {

        if (username === "") {
            Swal.fire('Tyhjä käyttäjätunnus', 'Valitse itsellesi käyttäjätunnus', 'error')
            return
        }

        if (password === "") {
            Swal.fire('Tyhjä salasana', 'Valitse itsellesi salasana', 'error')
            return
        }

        if (password !== passwordAgain) {
            Swal.fire('Salasanat eivät täsmää', 'Kirjoita molempiin salasanakenttiin sama salasana', 'error')
            return
        }



        let credentials =
        {
            käyttäjätunnus: username,
            salasana: password,
        }

        try {
            await registerUser(credentials)

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Rekisteröinti onnistui!'
            })

            setIsLogin(!isLogin)
        }
        catch
        {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Rekisteröinti ei onnistunut',
                showConfirmButton: false,
                timer: 2500
            })

            return
        }
    }



    const changeLoginType = () => {

        dispatch({ type: "MuutaPassword", payload: "" })
        dispatch({ type: "MuutaPasswordAgain", payload: "" })
        setIsLogin(!isLogin)

    }

    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")

    const { state, dispatch } = useContext(UserContext)


    return (<div style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>

        {isLogin ?
            <div style={{ display: "flex", flexDirection: 'column', width: '50%', justifyContent: 'space-between' }}>
                <h1>  <FormattedMessage {...messages.titleKirjautuminen} /></h1>

                <TextField

                    name="username_field"

                    style={{ height: 65 }}
                    text={username}
                    variant="outlined"
                    label={<FormattedMessage {...messages.PlaceholderKäyttäjätunnus} />}
                    onChange={(e) => setUsername(e.target.value)} />


                <TextField

                    name="password_field"
                    style={{ height: 65 }}
                    text={password}
                    variant="outlined"
                    type="password"
                    label={<FormattedMessage {...messages.PlaceholderSalasana} />}
                    onChange={(e) => setPassword(e.target.value)} />


            </div>
            :
            <div style={{ display: "flex", flexDirection: 'column', width: '50%' }}>
                <h1> <FormattedMessage {...messages.titleTilinluonti} /></h1>

                <TextField

                    style={{ height: 65 }}
                    label={<FormattedMessage {...messages.PlaceholderKäyttäjätunnus} />}
                    text={username}
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)} />



                <TextField

                    style={{ height: 65 }}
                    label={<FormattedMessage {...messages.PlaceholderSalasana} />}
                    text={password}
                    type="password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)} />

                <TextField

                    style={{ height: 65 }}
                    label={<FormattedMessage {...messages.PlaceholderSalasanaUudestaan} />}
                    text={passwordAgain}
                    type="password"
                    variant="outlined"
                    onChange={(e) => setPasswordAgain(e.target.value)} />


            </div>


        }
        <div style={{ display: "flex", flexDirection: "row", width: '50%', paddingTop: 30, justifyContent: 'flex-end' }}>
            <StoryButton style={{ marginRight: 5 }} color="primary" variant="contained" onClick={changeLoginType}>{isLogin ? <FormattedMessage {...messages.btnUusiTili} /> : <FormattedMessage {...messages.btnTakaisinKirjautumiseen} />}</StoryButton>
            {isLogin ?
                <StoryButton name="login_button" color="primary" variant="contained" onClick={LoginWithUsername}><FormattedMessage {...messages.btnKirjaudu} /></StoryButton>
                :
                <StoryButton color="primary" variant="contained" onClick={RegisterUser}><FormattedMessage {...messages.btnLuoTili} /></StoryButton>
            }
        </div>

    </div >)


}

export default Login
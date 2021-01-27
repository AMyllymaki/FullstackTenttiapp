
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import { haeKäyttäjät, poistaKäyttäjä, muutaRooli } from './components/httpRequests.js'
import TextField from '@material-ui/core/TextField';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



function App() {

  const [käyttäjät, setKäyttäjät] = useState([])
  const [secret, setSecret] = useState("")


  const noudaKäyttäjät = async () => {


    try {
      let käyttäjät = await haeKäyttäjät(secret)
      setKäyttäjät(käyttäjät.data)
    }
    catch
    {

    }

  }

  const poista = async (id) => {

    try
    {
      await poistaKäyttäjä(id, secret)
      let uudetKäyttäjät = käyttäjät.filter(käyttäjä => käyttäjä.id !== id)        
      setKäyttäjät(uudetKäyttäjät)
    }
    catch
    {

    }
    
  }

  const vaihdaRoolia = async (id, rooli) => {
    let uusiRooli

    if (rooli === 'admin') {
      uusiRooli = 'normal'
    }
    else {
      uusiRooli = 'admin'
    }

    try {
        await muutaRooli(id, uusiRooli, secret)

        let uudetKäyttäjät = [...käyttäjät]
        
        let käyttäjä = uudetKäyttäjät.find(käyttäjä => käyttäjä.id === id)
        käyttäjä.rooli = uusiRooli
        setKäyttäjät(uudetKäyttäjät)
    }
    catch
    {

    }

  }

  const tmpfunc = () => {

  }

  const classes = useStyles();

  return (
    <div className="App">

      <div style={{ display: 'flex', height: 100, flexDirection: 'row,', justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{ height: 50, marginRight: 20 }} onClick={noudaKäyttäjät} color={"primary"} variant="outlined" >
          Hae Käyttäjät
              </Button>

        <TextField
          text={secret}
          variant="outlined"
          type="password"
          label={"Secret"}
          onChange={(e) => setSecret(e.target.value)} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Käyttäjätunnus</TableCell>
                <TableCell>Rooli</TableCell>
                <TableCell align="center">Muuta Rooli</TableCell>
                <TableCell align="center">Poisto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {käyttäjät.map(käyttäjä =>
                <TableRow key={käyttäjä.id}>

                  <TableCell align="left" >{käyttäjä.id}</TableCell>
                  <TableCell align="left" >{käyttäjä.käyttäjätunnus}</TableCell>
                  <TableCell align="left" >{käyttäjä.rooli}</TableCell>
                  <TableCell align="center"><Button onClick={() => vaihdaRoolia(käyttäjä.id, käyttäjä.rooli)}>Muuta Rooli</Button> </TableCell>
                  <TableCell align="center"><Button onClick={() => poista(käyttäjä.id)}>Poista</Button> </TableCell>

                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div style={{ display: 'flex', marginTop: 100, height: 100, flexDirection: 'row,', justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{ height: 50, marginRight: 20 }} onClick={tmpfunc} color={"primary"} variant="outlined" >
          Create User
      </Button>

        <TextField
          style={{ marginRight: 20 }}
          text={secret}
          variant="outlined"
          label={"Username"}
          onChange={(e) => setSecret(e.target.value)} />

        <TextField
          text={secret}
          variant="outlined"
          type="password"
          label={"Password"}
          onChange={(e) => setSecret(e.target.value)} />
      </div>
    </div>


  );
}

export default App;

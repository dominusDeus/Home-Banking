const express = require('express');
const app = express();
const cors = require('cors');
const controllerSaldo = require('./controllers/saldoController');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.use("/", controllerSaldo);


app.listen(3000, 'localhost', ()=>{console.log("levantó back")})

<<<<<<< HEAD
// Hola soy un comment!!!
=======
//soy otro comment diferente
>>>>>>> main

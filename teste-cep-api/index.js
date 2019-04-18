const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require ('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next()
})
app.get('/endereco/:cep', function (req, res) {
	// res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	let url = `https://viacep.com.br/ws/${req.params.cep}/json/`

	axios.get(url)
	.then( response => {
		let resp = response.data
		res.json({
		rua: resp.logradouro,
		cep: resp.cep,
		uf: resp.uf,
		localidade: resp.localidade });
	}).catch( error => {
		res.status(401).json({error:error.Error})
	})
});

app.listen(3000, console.log('rodando...'));

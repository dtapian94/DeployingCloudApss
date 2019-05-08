//
// Paquterias de Node y Watson

var watson = require('watson-developer-cloud');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 1000;

//Parametros para parsear las respuestas a la carpeta publica

app.use(bodyParser.json());
app.use(express.static("./public"));

// Conexion a Mysql

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'sl-us-south-1-portal.45.dblayer.com',
  port     : '18644',
  user     : 'admin',
  password : 'CCQTFNCVVTDTUYYZ',
  database : 'pruebas'
});

//
//
// Conexion a Watson

// Credenciales para el servicio

var assistant = new watson.AssistantV1({
  iam_apikey: '',
  version: '2018-09-20',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

//Metodo para parsear las respuestas de Watosn (get) que convertimos a post

app.post('/respuestas/',(req,res)=>{

        var {text, context ={} } = req.body;
        var params = {
          input: {text},
          workspace_id: '',
          context
        }

        assistant.message(params,(err,response) => {
                  if(err){
                    res.status(500).json(err);
                  }
                  else {
                    res.json(response);
                    console.log(JSON.stringify(response, null, 2));
                  }
                  // Esta condicion dependa de que ecnontro el rfc en la BD

                  /* if(response.context.rfc){
                    var valorRFC = response.context.rfc;
                    connection.connect(function(err) {
                    if (err) throw err;
                    connection.query(`SELECT * FROM pruebas.Usuarios2 where RFC = '${valorRFC}'`, function (err, result, fields) {
                      if(result.length){

                      }
                      else {
                        console.log('no login');
                      }
                    });
                  });
                } */

                });
      });

// Puerto del Servidor

app.listen(port, () =>

console.log(`Abriendo el puerto: ${port}`));

//
//

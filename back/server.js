
const express = require('express');


const app = express();



let cors = require("cors");



const port = 8000;

app.use(express.json());


const mediciones = [{
    "id": 1,
    "valor_temp": 32.4,
    "valor_volt": 230,
    "valor_corriente": 143,
    "valor_luz": true
},
{
    "id": 2,

    "valor_temp": 22.1,
    "valor_volt": 219.2,
    "valor_corriente": 35,
    "valor_luz": false
},
{
    "id": 3,
    "valor_temp": 67.8,
    "valor_volt": 231.0,
    "valor_corriente": 8,
    "valor_luz": true
}
]


const lista_blanca = ["http://localhost:5500", "http://localhost:8000/", "http://127.0.0.1:5500"]
app.use(cors(
    {
        origin: lista_blanca
    }
));

app.get('/mediciones', (request, response) => {
    response.json(mediciones);
});



app.get('/temp', (req, res) => {
    let temp_alea = Math.random().toFixed(2) * 50;
    res.json({ "message": temp_alea })
});

app.get('/volt', (req, res) => {
    let volt_alea = Math.random().toFixed(2) * 230;

    res.json({ "message": volt_alea })
});

app.get('/corri', (req, res) => {
    let corri_alea = Math.random().toFixed(2) * 70;

    res.json({ "message": corri_alea })
});


app.post('/medicion', (request, response) => {
    const medicion = request.body;
    mediciones.push(medicion);
    response.json({ "registro cargado ": medicion.id });
    console.log(medicion);
});



app.put('/medicion/:id', (request, response) => {
    const id = request.params.id;
    const indice = mediciones.findIndex(dato => dato.id == id);
    if (indice) {
        const datos_body = request.body;
        mediciones[indice].valor_corriente = datos_body.valor_corriente
        mediciones[indice].valor_temp = datos_body.valor_temp
        mediciones[indice].valor_volt = datos_body.valor_volt
        mediciones[indice].valor_luz = datos_body.valor_luz
        response.json({ "mensaje": "la id que se modificó es " + id })
    }
    else {
        response.status(404).json({ error: "Id no encontrada" });
    }
});



app.delete('/delete/:id', (request, response) => {
    JavaScript
    const { id } = request.params;
    mediciones.pop(id)
    response.json({ "elemento eliminado": id })
    console.log("DELETE: ", id)
});


app.listen(port, () => {
    console.log('Servidor escuchando en el puerto :', port);
}); 

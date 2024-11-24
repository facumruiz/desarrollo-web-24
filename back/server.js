require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8000;

app.use(express.json());
const lista_blanca = ["http://localhost:5500", "http://localhost:8000/mediciones", "http://127.0.0.1:5500"];
app.use(cors({ origin: lista_blanca }));

// Conexión a MongoDB
const uri = process.env.MONGO_URI;
let collection;

// Leer el intervalo desde el archivo .env
const saveInterval = parseInt(process.env.SAVE_INTERVAL, 10) || 60000; // Valor por defecto de 60s


MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log("Conectado a MongoDB");
        const db = client.db("medicionesDB");
        collection = db.collection("mediciones");
    })
    .catch(err => console.error("Error conectando a MongoDB:", err));

// Endpoint para obtener la última medición de temperatura
app.get('/ultima-temperatura', async (req, res) => {
    try {
        const ultimaMedicion = await collection.find().sort({ _id: -1 }).limit(1).toArray();
        if (ultimaMedicion.length > 0) {
            res.json({ message: ultimaMedicion[0].valor_temp });
        } else {
            res.json({ error: "No hay datos disponibles" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al obtener la última temperatura" });
    }
});


// Endpoint para obtener la última medición de tensión
app.get('/ultima-tension', async (req, res) => {
    try {
        const ultimaMedicion = await collection.find().sort({ _id: -1 }).limit(1).toArray();
        if (ultimaMedicion.length > 0) {
            res.json({ message: ultimaMedicion[0].valor_volt });
        } else {
            res.json({ error: "No hay datos disponibles" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al obtener la última tensión" });
    }
});


// Endpoint para obtener la última medición de corriente
app.get('/ultima-corriente', async (req, res) => {
    try {
        const ultimaMedicion = await collection.find().sort({ _id: -1 }).limit(1).toArray();
        if (ultimaMedicion.length > 0) {
            res.json({ message: ultimaMedicion[0].valor_corriente });
        } else {
            res.json({ error: "No hay datos disponibles" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al obtener la última corriente" });
    }
});

// Insertar datos cada 15 segundos
setInterval(async () => {
    const nuevaMedicion = {
        valor_temp: (Math.random() * 50).toFixed(2),
        valor_volt: (Math.random() * 230).toFixed(2),
        valor_corriente: (Math.random() * 70).toFixed(2),
        valor_luz: Math.random() > 0.5,
        timestamp: new Date()
    };
    try {
        await collection.insertOne(nuevaMedicion);
        console.log("Medición guardada:", nuevaMedicion);
    } catch (err) {
        console.error("Error al guardar medición:", err);
    }
}, saveInterval);

// Otros endpoints de ejemplo
app.get('/mediciones', async (req, res) => {
    try {
        const datos = await collection.find().toArray();
        res.json(datos);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener las mediciones" });
    }
});

app.listen(port, () => {
    console.log('Servidor escuchando en el puerto:', port);
});

const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const RAPID_API_HOST = "g-translate1.p.rapidapi.com";
const RAPID_API_KEY = "5dc68bc883msh62cc6957fe2f276p12df4fjsnc3fea544def2";

app.get('/languages', async (req, res) => {
    const options = {
        url: "https://g-translate1.p.rapidapi.com/languages",
        params: {},
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': RAPID_API_HOST
        }
    };

    try {
        const response = await axios(options);
        const arrayOfData = Object.keys(response.data.data).map(key => response.data.data[key]);
        res.status(200).send({
            arrayOfData,
            statusCode: 200
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "C'è un errore nel server " + error,
            statusCode: 500
        });
    }
});

app.get('/translation', async (req, res) => {
    const {textToTranslate, outputLanguage, inputLanguage } = req.query
    const options = {
        url: "https://g-translate1.p.rapidapi.com/translate",
        params: {
            text: textToTranslate,
            tl: outputLanguage,
            sl: inputLanguage
          },
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': RAPID_API_HOST
        }
    };

    try {
        const response = await axios(options);
        res.status(200).send({
            response: response.data.data.translation,
            statusCode: 200
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "C'è un errore nel server " + error,
            statusCode: 500
        });
    }
});

app.listen(PORT, () => console.log("Server attivo sulla porta " + PORT));

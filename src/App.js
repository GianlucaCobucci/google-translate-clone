import React, { useState, useEffect } from "react";
import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";
import axios from "axios"

function App() {
  const [showModal, setShowModal] = useState(null)
  const [inputLanguage, setInputLanguage] = useState('English')
  //console.log("inputLanguage", inputLanguage)
  const [outputLanguage, setOutputLanguage] = useState('Polish')
  const [languages, setLanguages] = useState(null)
  const [textToTranslate, setTextToTranslate] = useState("")
  const [translatedText, setTranslatedText] = useState("")

  const getLanguages = async () => {
    const options = {
      method: 'GET',
      url: 'https://g-translate1.p.rapidapi.com/languages',
      headers: {
        'X-RapidAPI-Key': '5dc68bc883msh62cc6957fe2f276p12df4fjsnc3fea544def2',
        'X-RapidAPI-Host': 'g-translate1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data);
      const arrayOfData = Object.keys(response.data.data).map(key => response.data.data[key])
      setLanguages(arrayOfData)
    } catch (error) {
      console.error(error);
    }
  }

  const translate = async () => {
    const options = {
      method: 'GET',
      url: 'https://g-translate1.p.rapidapi.com/translate',
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage
      },
      headers: {
        'X-RapidAPI-Key': '5dc68bc883msh62cc6957fe2f276p12df4fjsnc3fea544def2',
        'X-RapidAPI-Host': 'g-translate1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data.data.translation);
      setTranslatedText(response.data.data.translation)
    } catch (error) {
      console.error(error);
    }
  }
  //console.log("translatedText", translatedText)

  //console.log("languages", languages)

  useEffect(() => {
    getLanguages()
  }, [])

  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
  }

  //console.log("showModal", showModal)
  return (
    <div className="app">
      {!showModal && <>
        <TextBox
          // eslint-disable-next-line react/style-prop-object
          style='input'
          selectedLanguage={inputLanguage}
          setShowModal={setShowModal}
          textToTranslate={textToTranslate}
          setTextToTranslate={setTextToTranslate}
          setTranslatedText={setTranslatedText}
        />

        <div className="arrow-container" onClick={handleClick}>
          <Arrows />
        </div>

        <TextBox
          // eslint-disable-next-line react/style-prop-object
          style='output'
          selectedLanguage={outputLanguage}
          setShowModal={setShowModal}
          translatedText={translatedText}
        />
        <div className="button-container" onClick={translate}>
          <Button />
        </div>
      </>}

      {showModal &&
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          // eslint-disable-next-line eqeqeq
          chosenLanguage={showModal == "input" ? inputLanguage : outputLanguage}
          // eslint-disable-next-line eqeqeq
          setChosenLanguage={showModal == "input" ? setInputLanguage : setOutputLanguage}
        />}
    </div>
  );
}

export default App;

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
  //console.log("outputLanguage", outputLanguage)

  const [languages, setLanguages] = useState(null)
  const [textToTranslate, setTextToTranslate] = useState("")
  const [translatedText, setTranslatedText] = useState("")

  const getLanguages = async () => {
    const response = await axios("http://localhost:8000/languages")
    //console.log(response.data.arrayOfData)
    setLanguages(response.data.arrayOfData)
  }

  const translate = async () => {
    const data = {
      textToTranslate,
      outputLanguage,
      inputLanguage
    };

    try {
      const response = await axios.get("http://localhost:8000/translation", {
        params: data,
      });
      //console.log(response.data.response)
      setTranslatedText(response.data.response);

    } catch (error) {
      console.error(error);
    }
  }

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

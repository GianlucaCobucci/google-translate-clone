import React, { useState } from 'react';

const Modal = ({ setShowModal, languages, chosenLanguage, setChosenLanguage }) => {
    const [searchedLanguage, setSearchedLanguage] = useState("");
    // Aggiungi questa verifica per assicurarti che "languages" sia un array valido
    const filteredLanguages = Array.isArray(languages)
        ? languages.filter((language) =>
            language?.toLowerCase().startsWith(searchedLanguage.toLowerCase())
        )
        : [];

    const handleChange = (event) => {
        setSearchedLanguage(event.target.value);
    };

    const handleClick = (event) => {
        const selectedLanguage = event.target.textContent;
        setChosenLanguage(selectedLanguage);
        setShowModal(null);
    };

    return (
        <div className='option-list'>
            <div className='search-bar'>
                <input value={searchedLanguage} onChange={handleChange} />
                <div className='close-button' onClick={() => setShowModal(null)}>
                    <svg
                        focusable="false"
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                    >
                        <path
                            d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
                        ></path>
                    </svg>
                </div>
            </div>
            <div className='option-container'>
                <ul>
                    {filteredLanguages.map((filteredLanguage) => (
                        <div className="list-item" key={filteredLanguage}>
                            <div className='icon'>
                                {chosenLanguage === filteredLanguage ? "✓" : ""}
                            </div>
                            <li
                                onClick={handleClick}
                                style={{ color: chosenLanguage === filteredLanguage ? "#8ab4f8" : null }}
                            >
                                {filteredLanguage}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Modal;

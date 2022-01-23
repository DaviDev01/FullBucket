import React, {useContext, useState} from "react"
import {Context} from "../Context"

export default function CustomSPPanel() {
    const [wordsSelected, setWordsSelcted] = useState([])
    const {showSPOptions, setShowSPOptions, selection, submitCustomSP} = useContext(Context)
    const spSentenceEls = selection.split(/(\s+)/).map( (word, i) => {
        return <span key={i} className={wordsSelected.includes(word) ? 'greenText' : null} onClick={() => handleWordClick(word)}>{word}</span>
    } )

    function cancel() {
        setWordsSelcted([])
        setShowSPOptions(false)
    }

    function handleWordClick(word) {
        if (!wordsSelected.includes(word)) { 
            setWordsSelcted(prev => [...prev, word])
        } else { 
            setWordsSelcted(prev => {
               return prev.filter( (item) => item !== word )
            }) 
        }
            
    }

    return (
        <div className={`CustomSPOptionPanel ${!showSPOptions && 'displayNone'}`}>
                <div className="CustomSPOptionPanel--card">
                    <h4 className="card--sentence" >Chose a word to practice</h4>
                    <p className="card--sentence" >{spSentenceEls}</p>
                    <div>
                        <button className="card--cancelBtn" onClick={cancel}>cancel</button>
                        <button className="card--confirmBtn" onClick={() => {
                            submitCustomSP(wordsSelected)
                            setShowSPOptions(false)
                        }}>Comfirm</button>
                    </div>
                </div>
            </div>
    )
}
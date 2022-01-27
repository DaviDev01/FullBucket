import React, {useContext, useState, useRef} from "react"
import {Context} from "../Context"

export default function CustomSPPanel() {
    const [wordsSelected, setWordsSelcted] = useState([])
    const {showSPOptions, setShowSPOptions, selection, submitCustomSP} = useContext(Context)
    const spSentenceEls = selection.split(/(\s+)/).map( (word, i) => {
        return <span key={i} className={wordsSelected.includes(word) ? 'greenText' : null} onClick={() => {
            word !== ' ' &&
            handleWordClick(word)
        }}>{word}</span>
    } )
    const outsideRef = useRef(null)

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

    function closePanel(e) {
        if (outsideRef.current === e.target) {
            setShowSPOptions(false)
        }
    }
    console.log(spSentenceEls)
    return (
        <div ref={outsideRef} className={`CustomSPOptionPanel ${!showSPOptions && 'displayNone'}`} onClick={closePanel}>
            <div className="CustomSPOptionPanel--card">
                <h4 className="card--sentence" >Chose a word to practice</h4>
                <p className="card--sentence" >{spSentenceEls}</p>
                <div>
                    <button className="card--cancelBtn" onClick={cancel}>cancel</button>
                    <button className="card--confirmBtn" onClick={() => {
                        if (wordsSelected.length > 0) {
                            submitCustomSP(wordsSelected)
                            setShowSPOptions(false)
                        }
                    }}>Comfirm</button>
                </div>
            </div>
        </div>
    )
}
import React, { useState, useEffect, useRef, useContext} from "react"
/* import words from "../words" */
import { Context } from "../Context"
import Dictionary from "./Dictionary"

export default function Spelling() {
    const {chosenSentences, isCustom, customSentences, switchDecks, deleteDeck, goToDefaultDeck} = useContext(Context)
    console.log('chosenSentences',chosenSentences)
    const fontSize = 1.5
    let synth = window.speechSynthesis
    const [wordIndex, setWordIndex] = useState(!isCustom ? JSON.parse(localStorage.getItem('wordIndex')) || 0 : JSON.parse(localStorage.getItem('CustomSentenceIndex')) || 0)
    const inputRef = useRef(null)
    const SpellingMainRef = useRef(null)
    const [sample, setSample] = useState('blank')
    const [userInputWriting, setUserInputWriting] = useState("")
    const [sampleState, setSampleState] = useState(sample.split('').map((item, i) => {
        return <span key={i}>{item}</span>
    }))
    const [sentenceStart, setSentenceStart] = useState('Type what is in the')
    const [sentenceEnd, setSentenceEnd] = useState('and press enter to continue')
    const sentenceRef = useRef(null)
    const [showDictionary, setShowDictionary] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [deckToBeDeleted, setDeckToBeDeleted] = useState({})

    useEffect( () => {
        inputRef.current.focus()
        document.addEventListener("keydown", focusOnInput)
        return () => document.removeEventListener("keydown", focusOnInput)
    }, [] )
    
    useEffect( () => {
        if (!isCustom) {
            localStorage.setItem('wordIndex', JSON.stringify(wordIndex > 0 ? wordIndex -1 : 0))
        } else {
            localStorage.setItem('CustomSentenceIndex', JSON.stringify(wordIndex > 0 ? wordIndex -1 : 0))
        }
    }, [wordIndex, isCustom] )

    function focusOnInput(zEvent) {
        if (!(inputRef.current === document.activeElement)  && !zEvent.ctrlKey &&  !zEvent.altKey) {
            
            inputRef.current.focus()
        }
    }

    useEffect( () => {
        setSampleState(prev => {
            return prev.map((item, i) => {
                const userItem = userInputWriting[i]
                if (userItem == null) {
                    return <span key={i} className="wordToSpell">{item.props.children}</span>
                } else if (userItem === item.props.children) {
                    return <span className="correctSpelling" key={i}>{item.props.children}</span>
                } else if (userItem !== item.props.children) {
                    return <span className="wrongSpelling" key={i}>{item.props.children}</span>
                }
            })
        })
    } , [userInputWriting])

    function handleChange(e) {
        const {value} = e.target
        setUserInputWriting(value)
    }
    
    function getSentence(wordObj) {

        const splitedSentence = wordObj.sentence.match(/\w+(?:'\w+)*|\s+|[^\s\w]+/g)

        let wordToSpell = splitedSentence.find( (word) => {
            return word.toLowerCase() === wordObj.word.toLowerCase() || word.toLowerCase() === wordObj.word.toLowerCase()  + "'s" || word.toLowerCase() === wordObj.word.toLowerCase()  + "ed" || word.toLowerCase() === wordObj.word.toLowerCase()  + "ing" || word.toLowerCase() === wordObj.word.toLowerCase()  + "'t" || word.toLowerCase() === wordObj.word.toLowerCase()  + "."
        })
        if (wordToSpell === undefined) {setWordIndex(prev => prev + 1)}
        const iOfWordFound = splitedSentence.indexOf(wordToSpell)
    
        const sentenceStart = splitedSentence.filter( (word, i) => i < iOfWordFound) 
    
        const sentenceEnd = splitedSentence.filter( (word, i) => i > iOfWordFound) 
    
        const wordWithSpans = wordToSpell.split('').map((item, i) => {
            return <span key={i} className="wordToSpell">{item}</span>
        })
        
        setSample(wordObj.word)
        setSentenceStart(sentenceStart.join(''))
        setSampleState(wordWithSpans)
        setSentenceEnd(sentenceEnd.join(''))
        setWordIndex(prev => prev + 1)
        return {
            sentenceStart: sentenceStart.join(''),
            sentenceEnd: sentenceEnd.join('')
        }
    } 

    function submit(e) {
        e.preventDefault()
        synth.cancel()
        if (chosenSentences.array.length > wordIndex) {
            getSentence(chosenSentences.array[wordIndex])
            speak(chosenSentences.array[wordIndex].sentence)
            setUserInputWriting('')
        } else {
            setWordIndex(0) 
            getSentence(chosenSentences.array[0])
            speak(chosenSentences.array[0].sentence)
            setUserInputWriting('')
        }
    }

    function speak(sentence){
        if (sentence !== '') {
            let utterThis = new SpeechSynthesisUtterance(sentence);
            const voice = synth.getVoices().find( (obj) => obj.name === "Microsoft Aria Online (Natural) - English (United States)") 
            utterThis.voice = voice ? voice : synth.getVoices().find( (obj) => obj.default === true || obj.lang === "en-US")
            
            synth.speak(utterThis);
        }
    }

    function toggleDictionary() {
        setShowDictionary(false)
    }

    function scrollIntoView() {
        SpellingMainRef.current.scrollIntoView()
    }

    function setDefaultSentence() {
        setSample('blank')
        setSentenceStart('Type what is in the')
        setSentenceEnd('and press enter to continue.')
        setUserInputWriting('')
    }

    function handleDeleteDeckClick(e, i) {
        setDeckToBeDeleted({e: e, i: i})
        setShowMessage(true)
    }

    function populateSPMenu() {
        const decks = customSentences.map( (subObj, i) => {
            const length = subObj.array.length
            return (
                <div key={i} className="deck" onClick={(e) => {
                    switchDecks(i)
                    setDefaultSentence()
                }}>
                    <h5 className="deck--title">Custom Deck</h5>
                    <small className="deck--carsCount"><span>{length}</span> {`flash card${length > 1 ? 's' : ''}`}</small>
                    
                    
                    <p className="deck--description">{subObj.array[0].sentence}</p>
                    <button className="deck--deleteBtn" onClick={(e) => handleDeleteDeckClick(e, i)}>Delete</button>
                </div>
            )
        })
        
        return decks
    }
    
    return (
        <main className="Spelling" onClick={() => toggleDictionary()} ref={SpellingMainRef}>
            <div className="deckContainer">
                <div className="deck" onClick={() => {
                    goToDefaultDeck()
                    setDefaultSentence()
                }}>
                    <h5 className="deck--title">Default Deck</h5>
                    <small className="deck--carsCount"><span>{500}</span> {`flash card${500 > 1 ? 's' : ''}`}</small>
                </div>
                {customSentences !== [] && populateSPMenu()}
            </div>

            <div className="sentenceToBePracticed">
                <div
                    className="spellingDisplay"
                >  
                <p ref={sentenceRef} className="fullSentence"><span>{sentenceStart}</span> <span className="wordToSpellEl">{sampleState}</span> <span>{sentenceEnd}</span></p> 
                </div>
                
                <form 
                    className="SpellingForm"
                    onSubmit={submit}
                >
                    
                    <input
                        ref={inputRef}
                        type="text"
                        autoComplete="off"
                        name="userInputWriting"
                        onChange={handleChange}
                        value={userInputWriting}
                        className="spellingInput"
                    /> 
                    <div className="spellingControls">
                        <i onClick={(e) => focusOnInput(e)} className="fas fa-keyboard spellingKeyboard"></i>

                        <i  onClick={() => speak(wordIndex > 0 ? chosenSentences.array[wordIndex - 1].sentence : `${sentenceStart} blank ${sentenceEnd}`)} className={`TTS-speakerIcon fas fa-volume-up ${sample === 'blank' && "displayNone"}`}></i>

                        <button id="nextBtn" type="submit" className="spellingBtn"><i className={`fas fa-check editIcon`}></i></button>
                    </div>
                </form>
            </div>
            <Dictionary
                sentenceRef={sentenceRef}
                currentParent={SpellingMainRef.current}
                scrollIntoView={scrollIntoView}
                fontSize={fontSize} 
                showDictionary={showDictionary}
                setShowDictionary={setShowDictionary}
            />
            <div className={`CustomSPOptionPanel ${!showMessage && 'displayNone'}`} /* onClick={closePanel} */>
                <div className="CustomSPOptionPanel--card card--modifier">
                    <h4 className="card--sentence" >Delete This Deck?</h4>
                    <p className="card--sentence" >You will not be able to undo this action</p>
                    <div className="btns-container">
                        <button className="card--confirmBtn" onClick={() => {
                            deleteDeck(deckToBeDeleted.e, deckToBeDeleted.i)
                            setShowMessage(false)
                            setDeckToBeDeleted({})
                        }}>Delete Deck</button>

                        <button className="card--cancelBtn" onClick={() => {
                            setShowMessage(false) 
                            setDeckToBeDeleted({})
                        }}>Cancel</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
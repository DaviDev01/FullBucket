import React, { useState, useEffect, useRef } from "react"
import words from "../words"
import Dictionary from "./Dictionary"

export default function Spelling() {
    const fontSize = 1.5
    let synth = window.speechSynthesis
    const [wordIndex, setWordIndex] = useState(JSON.parse(localStorage.getItem('wordIndex')) || 0)
    const wordsArray = words
    const inputRef = useRef(null)
    const SpellingMainRef = useRef(null)
    const [sample, setSample] = useState('blank')
    const [userInputWriting, setUserInputWriting] = useState("")
    const [sampleState, setSampleState] = useState(sample.split('').map((item, i) => {
        return <span key={i}>{item}</span>
    }))
    const [sentenceStart, setSentenceStart] = useState('Type what you think is in the')
    const [sentenceEnd, setSentenceEnd] = useState('and press enter to continue')
    const sentenceRef = useRef(null)
    const [showDictionary, setShowDictionary] = useState(false)


    useEffect( () => {
        inputRef.current.focus()
        document.addEventListener("keydown", focusOnInput)
        return () => document.removeEventListener("keydown", focusOnInput)
    }, [] )

    useEffect( () => {
        localStorage.setItem('wordIndex', JSON.stringify(wordIndex -1))
    }, [wordIndex] )

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
        getSentence(wordsArray[wordIndex])
        speak(wordsArray[wordIndex].sentence)
        setUserInputWriting('')
    }

    function speak(sentence){
        if (sentence !== '') {
            let utterThis = new SpeechSynthesisUtterance(sentence);
            synth.speak(utterThis);
        }
    }

    function toggleDictionary() {
        setShowDictionary(false)
    }

    function scrollIntoView() {
        SpellingMainRef.current.scrollIntoView()
    }
    
    return (
        <main className="Spelling" onClick={() => toggleDictionary()} ref={SpellingMainRef}>
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

                    <button type="submit" className="spellingBtn"><i className={`fas fa-check editIcon`}></i></button>

                    <i  onClick={() => speak(wordIndex > 0 ? wordsArray[wordIndex - 1].sentence : `${sentenceStart} blank ${sentenceEnd}`)} className={`TTS-speakerIcon fas fa-volume-up ${sample === 'blank' && "displayNone"}`}></i>
                </div>
            </form>
            <Dictionary
                sentenceRef={sentenceRef}
                currentParent={SpellingMainRef.current}
                scrollIntoView={scrollIntoView}
                fontSize={fontSize} 
                showDictionary={showDictionary}
                setShowDictionary={setShowDictionary}
            />
        </main>
    )
}
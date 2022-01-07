import React, { useState, useEffect, useRef } from "react"
import words from "../words"


export default function Spelling() {
    let synth = window.speechSynthesis
    const [wordIndex, setWordIndex] = useState(JSON.parse(localStorage.getItem('wordIndex')) || 0)
    const wordsArray = words
    const inputRef = useRef(null)
    const [sample, setSample] = useState('blank')
    const [userInputWriting, setUserInputWriting] = useState("")
    const [sampleState, setSampleState] = useState(sample.split('').map((item, i) => {
        return <span key={i}>{item}</span>
    }))
    const [sentenceStart, setSentenceStart] = useState('Type what you think is in the')
    const [sentenceEnd, setSentenceEnd] = useState('and press enter to continue')
    const sentenceRef = useRef(null)

    useEffect( () => {
        focusOnInput()
        document.addEventListener("keydown", focusOnInput)
        return () => document.removeEventListener("keydown", focusOnInput)
    }, [] )

    useEffect( () => {
        localStorage.setItem('wordIndex', JSON.stringify(wordIndex -1))
    }, [wordIndex] )

    function focusOnInput() {
        console.log('focused')
        if (!(inputRef.current === document.activeElement)) {
            console.log('focused')
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
        
        let wordToSpell = splitedSentence.find( (word) => word.toLowerCase() === wordObj.word.toLowerCase() || word.toLowerCase() === wordObj.word.toLowerCase()  + "'s" || word.toLowerCase() === wordObj.word.toLowerCase()  + "ed" || word.toLowerCase() === wordObj.word.toLowerCase()  + "ing" || word.toLowerCase() === wordObj.word.toLowerCase()  + "'t")
    
        const iOfWordFound = splitedSentence.indexOf(wordToSpell)
    
        const sentenceStart = splitedSentence.filter( (word, i) => i < iOfWordFound) 
    
        const sentenceEnd = splitedSentence.filter( (word, i) => i > iOfWordFound) 
    
        const wordWithSpans = wordToSpell.split('').map((item, i) => {
            return <span key={i} className="wordToSpell">{item}</span>
        })
        console.log(splitedSentence, wordObj.word)
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
    
    return (
        <main className="Spelling">
            <div
                className="spellingDisplay"
            >  
              <p ref={sentenceRef} className="fullSentence"><span>{sentenceStart}</span> <span className="wordToSpellEl">{sampleState}</span> <span>{sentenceEnd}</span></p> 
              <i  onClick={() => speak(wordIndex > 0 ? wordsArray[wordIndex - 1].sentence : `${sentenceStart} blank ${sentenceEnd}`)} className={`TTS-speakerIcon margin fas fa-volume-up ${sample === 'blank' && 'displayNone'}`}></i>
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
                /> 
                <button >Submit</button>
            </form>
        </main>
    )
}
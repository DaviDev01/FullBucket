import React, {useState, useEffect, useRef, useContext} from "react"
import Dictionary from "./Dictionary"
import { Context } from "../Context"
import Settings from "./Settings"
import CustomSPPanel from "./CustomSPPanel"

function Typing() {
    const {lang} = useContext(Context)
    const [sample, setSample] =  useState(lang.whiteboardInstructions)
    const [userInputWriting, setUserInputWriting] = useState("")
    const [showEditor, setShowEditor] = useState(false)
    const [fontSize, setFontSize] = useState(1.2)
    const [showDictionary, setShowDictionary] = useState(false)
    const TAfontSize = {fontSize: `${fontSize}rem`} 
    const [sampleState, setSampleState] = useState(settingTextDisplay(sample))
    const [hovered, setHovered] = useState(false)
    const inputFocus = useRef(null)
    const texareaFocus = useRef(null)
    const TextDisplayRef = useRef(null)
    const typingContRef = useRef(null)
    const sentenceRef = useRef(null)
    const mainRef = useRef(null)


    useEffect( () => {
        setSampleState(prev => checkSpell(prev))
    } , [userInputWriting])
    
    function checkSpell(prev) {
        const checkedText = prev.map( (textLetter, i) => {
            const userLetter = userInputWriting[i]
            if (userLetter == null) {
                return <span key={i}>{textLetter.props.children}</span>
            } else if (userLetter === textLetter.props.children) {
                return <span className="greenText" key={i}>{textLetter.props.children}</span>
            } else if (userLetter !== textLetter.props.children) {
                return <span className="red" key={i}>{textLetter.props.children}</span>
            }   
        })

        return checkedText
    }

    useEffect( () => {
        setSampleState(settingTextDisplay(sample))
    }, [sample] )

    useEffect( () => {
        setSample(lang.whiteboardInstructions)
        setUserInputWriting('')
    }, [lang] )

    useEffect( () => {
        setFocus()
        document.addEventListener("keydown", focusOnKeyDown)
        return () => document.removeEventListener("keydown", focusOnKeyDown)
    }, [] )

    function settingTextDisplay(sentence) {
        const Arraysentence = sentence.split('')

        return Arraysentence.map((item, i) => {
            return <span key={i}>{item}</span>
        })
    }

    function handleChange(e) {
        const {value} = e.target
        setUserInputWriting(value)
    }

    function handleFontChange(e) {
        const {value} = e.target
        setFontSize(value)
    }


    function focusOnKeyDown(zEvent) {
        if (!zEvent.ctrlKey &&  !zEvent.altKey && !TextDisplayRef.current.className.includes('stayUnfocused')) {
            setFocus()
        }
    }

    function handleSample(e) {
        setUserInputWriting('')
        const {value} = e.target
        setSample(value.replace(/(\r\n|\n|\r)/gm, " "))
        setSampleState(settingTextDisplay(value))
    }

    function setFocus() {
        if (!(inputFocus.current === document.activeElement)) {
            inputFocus.current.focus()
            setHovered(false)
        }
    }

    function toggleDictionary() {
        setShowDictionary(false)
    }

    function scrollIntoView() {
        mainRef.current.scrollIntoView()
    }

    return (
        <main className="typing" onClick={toggleDictionary} ref={mainRef}>
            <div    
                className="typing--sampleArea"
                ref={typingContRef}
            >
                <div 
                    ref={TextDisplayRef}
                    style={TAfontSize}
                    className={`typing--sampleDisplay ${showEditor && 'stayUnfocused'}`}
                    onClick={() => setHovered(false)}
                    onScroll={() => setShowDictionary(false)}
                >  
                    <p className="sentenceToType" ref={sentenceRef} >{sampleState}</p>
                </div>
                <div className="sampleAreaBottom">
                    <textarea 
                        ref={texareaFocus}
                        className={`typing--sampleInput ${!showEditor && 'displayNone'}`}
                        type="text"
                        name="sample"
                        onChange={handleSample}
                        onClick={() => setHovered(false)}
                        value={sample}
                    />
                    <Settings 
                        hovered={hovered} 
                        showEditor={showEditor}
                        setShowEditor={setShowEditor} 
                        setFocus={setFocus}
                        texareaFocus={texareaFocus}
                        setHovered={setHovered}
                        handleFontChange={handleFontChange}
                        fontSize={fontSize}
                    />
                </div>
            </div>
            
            <textarea 
                ref={inputFocus}
                className="typing--userInput"
                type="text"
                name="userInputWriting"
                onChange={handleChange}
                value={userInputWriting}
            />
            <Dictionary 
                sentenceRef={sentenceRef}
                currentParent={mainRef.current}
                scrollIntoView={scrollIntoView}
                fontSize={fontSize} 
                showDictionary={showDictionary}
                setShowDictionary={setShowDictionary}
            />
            <CustomSPPanel />
        </main>
    )
}

export default Typing
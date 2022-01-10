import React, {useState, useEffect, useRef, useContext} from "react"
import TextToSpeech from "./TextToSpeech"
import Dictionary from "./Dictionary"
import { Context } from "../Context"

function Typing() {
    const {lang} = useContext(Context)
    const [sample, setSample] =  useState(lang.whiteboardInstructions)
    const [userInputWriting, setUserInputWriting] = useState("")
    const [showEditor, setShowEditor] = useState(false)
    const inputFocus = useRef(null)
    const texareaFocus = useRef(null)
    const TextDisplayRef = useRef(null)
    const typingContRef = useRef(null)
    const mainRef = useRef(null)
    const [fontSize, setFontSize] = useState(1.2)
    const [showDictionary, setShowDictionary] = useState(false)
    const TAfontSize = {fontSize: `${fontSize}rem`} 
    const [sampleState, setSampleState] = useState(sample.split('').map((item, i) => {
        return <span key={i}>{item}</span>
    }))
    const [hovered, setHovered] = useState(false)
    const adjustFontEl =  !hovered ? 
    <i 
        className="fas fa-text-height"
        onClick={() => setHovered(true)}
    ></i> : 
    <input 
        className="rangeFont" 
        type="range" 
        min="0.5" 
        max="10" 
        value={fontSize} 
        step={.1} 
        onChange={handleFontChange}
    />
    const settings  = <div className="settings">
        <i 
            className={`${showEditor ? 'fas fa-check' : 'fas fa-pen'} editIcon`} 
            onClick={toggleEditor} 
        ></i>
        <TextToSpeech hovered={hovered}/>
        {adjustFontEl}    
    </div>

    function handleChange(e) {
        const {value} = e.target
        setUserInputWriting(value)
    }

    function handleFontChange(e) {
        const {value} = e.target
        setFontSize(value)
    }
    
    useEffect( () => {
        setSampleState(sample.split('').map((item, i) => {
            return <span key={i} >{item}</span>
        }))
    }, [sample] )

    useEffect( () => {
        setSampleState(lang.whiteboardInstructions.split('').map((item, i) => {
            return <span key={i}>{item}</span>
        }))
        setUserInputWriting('')
        setSample(lang.whiteboardInstructions)
    }, [lang] )

    useEffect( () => {
        setFocus()
        document.addEventListener("keydown", focusOnKeyDown)
        return () => document.removeEventListener("keydown", focusOnKeyDown)
    }, [] )

    function focusOnKeyDown(zEvent) {
        if (!zEvent.ctrlKey &&  !zEvent.altKey && !TextDisplayRef.current.className.includes('stayUnfocused')) {
            setFocus()
        } else if (!zEvent.ctrlKey &&  !zEvent.altKey) {
            setSIFocus()
        }
    }

    function handleSample(e) {
        setUserInputWriting('')
        const {value} = e.target
        setSample(value.replace(/(\r\n|\n|\r)/gm, " "))
        setSampleState(value.split('').map((item, i) => {
            return <span key={i}>{item}</span>
        }))
    }

    function setFocus() {
        if (!(inputFocus.current === document.activeElement)) {
            inputFocus.current.focus()
            setHovered(false)
        }
    }

    function toggleEditor() {
        setShowEditor(prev => !prev)
        
        if (showEditor) {
            setFocus() 
        } else if (!showEditor) {
            setTimeout(() => {
                setSIFocus()
                texareaFocus.current.selectionStart = texareaFocus.current.value.length
            }, 10); 
        }
    }

    function setSIFocus() {
        texareaFocus.current.focus()
    }

    useEffect( () => {
        setSampleState(prev => {
            return prev.map((item, i) => {
                const userItem = userInputWriting[i]
                if (userItem == null) {
                    return <span key={i}>{item.props.children}</span>
                } else if (userItem === item.props.children) {
                    return <span className="greenText" key={i}>{item.props.children}</span>
                } else if (userItem !== item.props.children) {
                    return <span className="red" key={i}>{item.props.children}</span>
                }
            })
        })
    } , [userInputWriting])

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
                    <p>{sampleState}</p>
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
                    {settings}
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
                currentParent={mainRef.current}
                scrollIntoView={scrollIntoView}
                fontSize={fontSize} 
                showDictionary={showDictionary}
                setShowDictionary={setShowDictionary}
            />
        </main>
    )
}

export default Typing
import React, {useState, useEffect, useRef} from "react"
import TextToSpeech from "./TextToSpeech"
import Dictionary from "./Dictionary"

function Typing() {
    const [sample, setSample] = useState('The quick brown fox jumps over the lazy dog')
    const [userInputWriting, setUserInputWriting] = useState("")
    const [showEditor, setShowEditor] = useState(false)
    const inputFocus = useRef(null)
    const texareaFocus = useRef(null)
    const TextDisplayRef = useRef(null)
    const typingContRef = useRef(null)
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
    const [TextDisplayCoords, setTextDisplayCoords] = useState( typingContRef.current === null ? {y: 0, x: 0} :  typingContRef.current.getBoundingClientRect() )
    const settings  = 
    <div className="settings" style={{bottom: `${TextDisplayCoords.y + 5}px`, right: `${TextDisplayCoords.x + 20}px`}}>
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
        setFocus()
        setPositionOnResize()
        document.addEventListener("keydown", focusOnKeyDown)
        return () => document.removeEventListener("keydown", focusOnKeyDown)
    }, [] )

    function setPositionOnResize() {
        setTextDisplayCoords(typingContRef.current.getBoundingClientRect())
    }

    window.onresize =  setPositionOnResize

    function focusOnKeyDown(zEvent) {
        if (!zEvent.ctrlKey  &&  !zEvent.altKey && !zEvent.shiftKey && !TextDisplayRef.current.className.includes('displayNone')) {
            setFocus()
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
    
    return (
        <main className="typing" onClick={toggleDictionary}>
            <div    
                className="typing--sampleArea"
                ref={typingContRef}
            >
                <div 
                    ref={TextDisplayRef}
                    style={TAfontSize}
                    className={
                        `typing--sampleDisplay ${showEditor && 'displayNone'}`
                    }
                    onClick={() => setHovered(false)}
                    onScroll={() => setShowDictionary(false)}
                >  
                    <p>{sampleState}</p>
                </div>
                <textarea 
                    style={TAfontSize}
                    ref={texareaFocus}
                    className={`typing--sampleInput ${showEditor ? 'displayBlock' : 'displayNone'}`}
                    type="text"
                    name="sample"
                    onChange={handleSample}
                    onClick={() => setHovered(false)}
                    value={sample}
                />
                {settings}
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
                fontSize={fontSize} 
                showDictionary={showDictionary} 
                showEditor={showEditor}
                TextDisplayRef={TextDisplayRef}
                setShowDictionary={setShowDictionary}
            />
        </main>
    )
}

export default Typing
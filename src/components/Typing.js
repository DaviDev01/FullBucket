import React, {useState, useEffect, useRef} from "react"
import {runTTs} from "../textToSpeech"

function Typing() {
    const [sample, setSample] = useState('The quick brown fox jumps over the lazy dog')
    const [userInputWriting, setUserInputWriting] = useState("")
    const [focusSampleDisplay, setFocusSampleDisplay] = useState(false)
    const [showEditor, setShowEditor] = useState(false)
    const inputFocus = useRef(null)
    const texareaFocus = useRef(null)
    const [fontSize, setFontSize] = useState(1.2)
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
        onMouseLeave={() => {
            setHovered(false)
            setFocus()
            setSIFocus()
        }}
    />

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
            return <span>{item}</span>
        }))
    }, [sample] )

    useEffect( () => {
        setFocus()
        document.body.addEventListener('keyup', runTTs)
        return () => document.body.RemoveEventListener('keyup', runTTs)
    }, [] )

    function handleSample(e) {
        setUserInputWriting('')
        const {value} = e.target
        setSample(value.replace(/(\r\n|\n|\r)/gm, " "))
        setSampleState(value.split('').map((item, i) => {
            return <span>{item}</span>
        }))
    }

    function setFocus() {
        inputFocus.current.focus()
        setHovered(false)
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

    
    
    return (
        <main className="typing">
            <div className="typing--sampleArea">
                <div 
                    style={TAfontSize}
                    onClick={setFocus}
                    className={
                        `typing--sampleDisplay ${showEditor ?
                        'displayNone' :  focusSampleDisplay ? 
                        'focusedBorder' :  'unFocusedBorder' }`
                    }
                >  
                    {sampleState}
                </div>
                <textarea 
                    style={TAfontSize}
                    ref={texareaFocus}
                    id="typing--sampleInput"
                    className={`typing--sampleInput ${showEditor ? 'displayBlock' : 'displayNone'}`}
                    type="text"
                    name="sample"
                    onChange={handleSample}
                    onClick={() => setHovered(false)}
                    value={sample}
                />
                <button
                    className={`typing--btn ${showEditor && 'typing--btn__check'}`}
                    onClick={toggleEditor}    
                >
                    <i className={`${showEditor ? 'far fa-check-square' : 'far fa-edit'} editIcon`}></i>
                </button>
                {adjustFontEl}    
            </div>
            <textarea 
                ref={inputFocus}
                className="typing--userInput"
                type="text"
                name="userInputWriting"
                onChange={handleChange}
                value={userInputWriting}
                onFocus={() => setFocusSampleDisplay(true)}
                onBlur={() => setFocusSampleDisplay(false)}
            />
        </main>
    )
}

export default Typing
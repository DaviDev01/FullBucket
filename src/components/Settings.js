import React, {useContext, useState} from "react" 
import TextToSpeech from './TextToSpeech'
import { Context } from "../Context"

function Settings(props) {
    const {callSPPanel} = useContext(Context)

    function toggleEditor() {
        props.setShowEditor(prev => !prev)
        
        if (props.showEditor) {
            props.setFocus() 
        } else if (!props.showEditor) {
            setTimeout(() => {
                setSIFocus()
            }, 10); 
        }
    }

    function setSIFocus() {
        props.texareaFocus.current.focus()
        props.texareaFocus.current.selectionStart = props.texareaFocus.current.value.length
    }

    function handleExportClick() {
        const selectedText = window.getSelection().toString()
        const textSansSpaces = selectedText.replace(/\s/g, '')
        
        textSansSpaces !== '' && textSansSpaces !== ' ' && callSPPanel(window.getSelection().toString())
    }

    return (
        <section className="settings">
            <i 
                className={`${props.showEditor ? 'fas fa-check' : 'fas fa-pen'} editIcon`} 
                onClick={toggleEditor} 
            ></i>
            <button className="exportIcon-btn" onClick={handleExportClick} /* onClick={() => makingFlashCard(window.getSelection().toString())} */>
                <i className="fas fa-file-export exportIcon"></i>
            </button>
            <i onClick={() => props.setFocus()} className="fas fa-keyboard keyboardIcon"></i>
            <TextToSpeech hovered={props.hovered}/>
            <i 
            className={`fas fa-text-height ${props.hovered && 'hidden'}`}
            onClick={() => props.setHovered(true)}
            ></i>  
            <input 
                className={`rangeFont  ${!props.hovered && 'hidden'}`} 
                type="range" 
                min="0.5" 
                max="10" 
                value={props.fontSize} 
                step={.1} 
                onChange={props.handleFontChange}
            />    
        </section>
    )
}

export default Settings
import React from "react" 
import TextToSpeech from './TextToSpeech'

function Settings(props) {
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

    return (
        <div className="settings">
            <i 
                className={`${props.showEditor ? 'fas fa-check' : 'fas fa-pen'} editIcon`} 
                onClick={toggleEditor} 
            ></i>
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
        </div>
    )
}

export default Settings
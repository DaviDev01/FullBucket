import React, {useEffect, useState} from 'react'

export default function TextToSpeech(props) {
    let synth = window.speechSynthesis;
    const [voices, setVoices] = useState(null)
    const [voicesEl, setVoicesEl] = useState()
    const [option, setOption] = useState("Google US English");
    let [inputTxt, setInputTxt] = useState('')
    const [clicked, setClicked] = useState(false)
    let audioControlsStyle = props.hovered && !clicked ? {marginRight: '55.5px'} : props.hovered && clicked ? {marginRight: '34.5px'} : null

    function handleChange(e) {
        const {value} = e.target
        setOption(value) 
    }

    useEffect( () => {
        populateVoiceList()
        document.body.addEventListener('keydown', runTTs)
        getSelectedText()
        return () => document.body.addEventListener('keydown', runTTs)
    }, [])
    
    function getSelectedText() {
        if (window.getSelection) {
            setInputTxt(window.getSelection())
        } else return;
    }

    function populateVoiceList() {
        setVoices(
            synth.getVoices().sort(function (a, b) {
            const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
            if ( aname < bname ) return -1;
            else if ( aname === bname ) return 0;
            else return +1;
            })
        )
    }
    
    useEffect( () => {
        if (voices !== null) {
                let optionsEls = [];

                voices.forEach( (item, i) => {
                    optionsEls.push(
                    <option 
                        key={item.name}
                        value={item.name}
                        className="TTs-option"
                    >
                        {`${item.name.replace(item.name.includes('Google') ? 'Google' : 'Microsoft','')}`}
                    </option>)
                })

                optionsEls.splice(0, 0, <optgroup label="Google:" className='aptgroup'>)
                optionsEls.splice(19, 0, </optgroup>)
                optionsEls.splice(20, 0, <optgroup label="Microsoft:" className='aptgroup'>)
                optionsEls.splice(voices.length, 0, </optgroup>)
                setVoicesEl(optionsEls)
        }
        
    }, [voices] )

    function speak(){
        if (inputTxt !== '') {
            let utterThis = new SpeechSynthesisUtterance(inputTxt);
            
            utterThis.voice = voices.find( (obj) => obj.name === option)
            synth.speak(utterThis);
        }
    }

    function runTTs(e) {
        if (e.key === 'a' && e.altKey) {
            document.querySelector('#play').click()
        }
    }

    return (
        <div 
            className={`controls  ${!clicked &&'maring-top'}` }
            style={audioControlsStyle}
        >
            <select
                onBlur={() => setClicked(false)}
                value={option}
                onChange={handleChange}
                name='option'
                className={`TTS-select ${!clicked && 'displayNone'}`}
            >
                {voicesEl}
            </select> 
            <i className={`fas fa-cog TTS-settingsIcon`} onClick={() => setClicked(prev => !prev)}></i>
            <button 
                id="play" 
                type="submit" 
                onClick={() => speak()}
                className='TTS-speakerIcon'
            >
                <i className="fas fa-volume-up"></i>
            </button>
        </div>
    )
}   
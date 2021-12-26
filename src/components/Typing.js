import React, {useState, useEffect, useRef} from "react"

function Writing() {
    const [sample, setSample] = useState('The quick brown fox jumps over the lazy dog')
    const [userInputWriting, setUserInputWriting] = useState("")
    const [focusSampleDisplay, setFocusSampleDisplay] = useState(false)
    const [showEditor, setShowEditor] = useState(false)
    const inputFocus = useRef(null)
    const texareaFocus = useRef(null)
    const sampleDisplayStyle = showEditor ? {display: 'none'} :  focusSampleDisplay ? {border: "solid black 1px"} :  {border: "solid gray 1px", color: 'gray'} 
    const [sampleState, setSampleState] = useState(sample.split('').map((item, i) => {
        return <span>{item}</span>
    }))
    const TAreaStyles = showEditor ? {display: 'block'} : {display: 'none'} 

    function handleChange(e) {
        const {value} = e.target
        setUserInputWriting(value)
    }

    useEffect( () => {
        setSampleState(sample.split('').map((item, i) => {
            return <span>{item}</span>
        }))
    }, [sample] )

    useEffect( () => setFocus(), [] )

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
    }

    function toggleEditor() {
            
        setShowEditor(prev => !prev)
        if (showEditor) {
            console.log('focusDisplayer')
            setFocus() 
        } else if (!showEditor) {
            console.log('focusEditor')
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
            const slicedArr = prev.slice(0, userInputWriting.length).map((item, i) => {
                const userItem = userInputWriting[i]
                return userItem === item.props.children ? <span className="greenText">{item.props.children}</span> :
                <span className="red">{item.props.children}</span>
            })
            const prevCopy = prev

            prevCopy.splice(0, slicedArr.length, ...slicedArr)
            
            
            return prevCopy
            
        })
    } , [userInputWriting])
    
    console.log(sampleState)
    return (
        <main className="typing">
            <div className="typing--sampleArea">
                <div 
                    style={sampleDisplayStyle}
                    onClick={setFocus}
                    className="typing--sampleDisplay"
                >  
                    {sampleState}
                </div>
                <textarea 
                    ref={texareaFocus}
                    style={TAreaStyles}
                    id="typing--sampleInput"
                    className="typing--sampleInput"
                    type="text"
                    name="sample"
                    onChange={handleSample}
                    value={sample}
                />
                <button
                    className={`typing--btn ${showEditor && 'typing--btn__check'}`}
                    onClick={toggleEditor}    
                >
                    <i class={`${showEditor ? 'far fa-check-square' : 'far fa-edit'}`}></i>
                </button>
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

export default Writing
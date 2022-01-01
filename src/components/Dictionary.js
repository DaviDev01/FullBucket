import React, {useEffect, useState, useRef} from 'react'

export default function Dictionary(props) {
    const [dictionaryData, setDictionaryData] = useState(null)
    const [coords, setCoords] = useState({x: null, y: null})
    const [toggleDisplay, setToggleDisplay] = useState(false)
    const listConRef = useRef(null)

    useEffect( () => {
        document.body.addEventListener('dblclick', isMyKey)
    })

    function isMyKey(e) {
        const selection = window.getSelection()
        console.log(selection.toString().length)

        if (selection.toString().length > 1) {
            getDictionaryData(selection)
            setCoords({x: e.clientX + "px", y: e.clientY + (props.fontSize * 30) + "px"})
            listConRef.current.focus()
        }

    }
    function getDictionaryData(word) {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(resp => resp.json())
            .then(data => {
                setDictionaryData(data)
                setToggleDisplay(true)
            })
    }
    const meanings = dictionaryData !== null ? dictionaryData[0].meanings.map( (meaningObj) => {
        return meaningObj
    } ) : null 
    
    const definitionsObjs = []

    const sortingData = meanings !== null ? meanings.forEach( meaning => {
        const definitionsArray = []
        meaning.definitions.forEach( (definitionObj, i) => i < 2 ? definitionsArray.push(definitionObj) : null )
        definitionsObjs.push(...definitionsArray)
    } ) : null 

    const definitionsEls = definitionsObjs !== null ? definitionsObjs.map( (obj) => {
        return <li className="definition">{obj.definition} <br/> {obj.synonyms.map( (item, i) => i <= 2 && <div className='synonsym'>{item}</div> )}</li>
    } ) : "no definition"

    return (
        <button className={`list-container ${!toggleDisplay && 'displayNone'}`} style={{top: coords.y, left: coords.x}} ref={listConRef} onBlur={() => setToggleDisplay(false)}>
            <ol>
                {definitionsEls}
            </ol>
        </button>
    )
}
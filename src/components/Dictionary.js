import React, {useEffect, useRef, useState} from 'react'

export default function Dictionary(props) {
    const [dictionaryData, setDictionaryData] = useState(null)
    const [coords, setCoords] = useState({x: null, y: null})
    const [noMeaning, setNoMeaning] = useState(false)
    const componentWidth = 30 
    const height = useRef(null)

    useEffect( () => {
        (dictionaryData !== null && height.current.clientHeight > 0) &&
        getTextPosition()
    }, [dictionaryData] ) 

    useEffect( () => {
        document.addEventListener("keydown", isMyKey)
        return () => {
            document.removeEventListener("keydown", isMyKey)
        }
    })

    function isMyKey(zEvent) {
        const selection = window.getSelection()
        const textSelectedArray = selection.toString().trim().split(' ')
        const isNotInAInput = window.getSelection().anchorNode.parentElement.localName === 'span'

        if (selection && textSelectedArray.length === 1 && isNotInAInput && textSelectedArray[0] !== '' && (zEvent.ctrlKey  &&  zEvent.altKey) ) {
            getDictionaryData(selection.toString())  
        }

    }

    function getTextPosition() {
        const selection = window.getSelection()
        const definitionCardWidth = ((window.innerWidth * componentWidth) / 100 )
        const definitionCardHeight = height.current.clientHeight
        const coords = selection.getRangeAt(0).cloneRange().getClientRects()[0]
        const rightCoords = selection.getRangeAt(0).cloneRange().getBoundingClientRect().right
        const topCoords = selection.getRangeAt(0).cloneRange().getBoundingClientRect().top

        setCoords(
            {
                x: window.innerWidth - coords.x - 10 < definitionCardWidth ? rightCoords - definitionCardWidth + "px": coords.x  + "px", 
                y: window.innerHeight - coords.y < definitionCardHeight && coords.y > definitionCardHeight ? topCoords - definitionCardHeight + "px" : coords.y + ((props.fontSize * 16) * 1.2 ) + "px"
            }
        )
    }

    function getDictionaryData(word) {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(resp => resp.json())
            .then(data => {
                if (data.title !== 'No Definitions Found') {
                    setNoMeaning(false)
                    setDictionaryData(data) 
                } else {
                    setNoMeaning(true)
                    getTextPosition()
                }
                props.setShowDictionary(true)
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
        <div 
            className={`list-container ${!props.showDictionary && 'hidden'}`} 
            style={
                {
                top: coords.y, 
                left: coords.x, 
                width: `${componentWidth}%`/* , 
                height: `${componentHeight}%`, */
                }
            }
            onClick={(e) => e.stopPropagation()}
            ref={height}
        >   
            {noMeaning ?
            <p className='NoDefinitions'>No Definitions Found</p> :
            <ol className='list'>
                {definitionsEls}
            </ol>}
        </div>
    )
}
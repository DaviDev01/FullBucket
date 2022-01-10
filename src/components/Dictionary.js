import React, {useEffect, useRef, useState} from 'react'

export default function Dictionary(props) {
    const [dictionaryData, setDictionaryData] = useState(null)
    const [coords, setCoords] = useState({x: null, y: null})
    const [noMeaning, setNoMeaning] = useState(false)
    const componentWidth = 30 
    const height = useRef(null)
    const selection = window.getSelection()
    /* const [cardTooBig, setCardTooBig] = useState(false) */

    useEffect( () => {
        (dictionaryData !== null && height.current.clientHeight > 0) &&
        getTextPosition()
    }, [dictionaryData] )

    useEffect( () => {
        document.addEventListener("keydown", isMyKey)
        
        document.addEventListener('touchend', clickDefinition)
        return () => {
            document.removeEventListener("keydown", isMyKey)
            document.removeEventListener('touchend', () => clickDefinition)
        }
    })

    function clickDefinition() {
        if (selection.toString() !== '') {
            props.scrollIntoView()
            getDictionaryData(selection.toString())
        }
    }

    function isMyKey(zEvent) {
        const textSelectedArray = selection.toString().trim().split(' ')
        const isNotInAInput = window.getSelection().anchorNode.parentElement.localName === 'span'
        
        if (selection && textSelectedArray.length === 1 && isNotInAInput && textSelectedArray[0] !== '' && (zEvent.ctrlKey  &&  zEvent.altKey) ) {
            props.scrollIntoView()
            getDictionaryData(selection.toString())  
            console.log('heyy')
        }

    }

    function getTextPosition() {
        const selection = window.getSelection()
        const definitionCardWidth = ((window.innerWidth * componentWidth) / 100 )
        const definitionCardHeight = height.current.clientHeight
        const coords = selection.getRangeAt(0).cloneRange().getClientRects()[0]
        const rightCoords = selection.getRangeAt(0).cloneRange().getBoundingClientRect().right
        const topCoords = selection.getRangeAt(0).cloneRange().getBoundingClientRect().top
        const bottomCoords = selection.getRangeAt(0).cloneRange().getBoundingClientRect().bottom
        if (definitionCardHeight > (window.innerHeight / 4)) { height.current.style.overflowY = 'scroll' }
        

        
        setCoords(
            {
                x: window.innerWidth - coords.x - 10 < definitionCardWidth ? rightCoords - definitionCardWidth + "px": coords.x  + "px", 
                y: (window.innerHeight - coords.y < definitionCardHeight) && (coords.y > definitionCardHeight) ? topCoords - definitionCardHeight + "px" : bottomCoords + ((props.fontSize * 16) *(props.currentParent.className === 'Spelling' ? 4.8 : 0 )) + "px"
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
            ref={height}
            className={`list-container ${!props.showDictionary && 'hidden'}`} 
            style={
                {
                top: coords.y, 
                left: coords.x, 
                width: `${componentWidth}%`,
                maxHeight: `${window.innerHeight / 2}px`
                }
            }
            onClick={(e) => e.stopPropagation()}
        >   
            {noMeaning ?
            <p className='NoDefinitions'>No Definitions Found</p> :
            <ol className='list'>
                {definitionsEls}
            </ol>}
        </div>
    )
}
import React, {useContext, useRef} from 'react'
import { Context } from "../Context"


export default function ConfirmDeletionModal(props) {
    const {deleteDeck} = useContext(Context)
    const ConfirmDeletionRef = useRef(null)

    function closePanel(e) {
        if (ConfirmDeletionRef.current === e.target) {
            props.setShowMessage(false)
        }
    }

    return (
        <div className={`CustomSPOptionPanel ${!props.showMessage && 'displayNone'}`} ref={ConfirmDeletionRef} onClick={closePanel}>
            <div className="CustomSPOptionPanel--card card--modifier">
                <h4 className="card--sentence" >Delete This Deck?</h4>
                <p className="card--sentence" >You will not be able to undo this action</p>
                <div className="btns-container">
                    <button className="card--confirmBtn" onClick={() => {
                        deleteDeck(props.deckToBeDeleted.e, props.deckToBeDeleted.i)
                        props.setShowMessage(false)
                        props.setDeckToBeDeleted({})
                    }}>Delete Deck</button>

                    <button className="card--cancelBtn" onClick={() => {
                        props.setShowMessage(false) 
                        props.setDeckToBeDeleted({})
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
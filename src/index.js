import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import './index.css'
import {ContextProvider} from "./Context"
import {HashRouter as Router} from "react-router-dom"

ReactDOM.render(
    <ContextProvider>
        <Router>    
            <App />
        </Router>
    </ContextProvider>
, document.getElementById("root"))
import React from "react"
import Typing from "./components/Typing"
import Spelling from "./components/Spelling"
import About from "./About"
import Header from './components/Header'
import Footer from './components/Footer'
import {Routes, Route} from "react-router-dom"


export default function App() {
    return (
        <div className="outerMostContainer">
            <Header />
            <Routes>
                <Route path="/" element={<Typing />}/>
                <Route path="spelling" element={<Spelling />}/>
                <Route path="/about" element={<About />}/>
            </Routes>
            <Footer />
        </div>
    )
}
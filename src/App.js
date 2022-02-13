import React from "react"
import Typing from "./pages/Whiteboard"
import Spelling from "./pages/Spelling"
import About from "./pages/About"
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
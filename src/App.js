import React from "react"
import Typing from "./components/Typing"
import Spelling from "./components/Spelling"
import Header from './Header'
import {Routes, Route} from "react-router-dom"


export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Typing />}/>
                <Route path="spelling" element={<Spelling />}/>
            </Routes>
        </>
    )
}
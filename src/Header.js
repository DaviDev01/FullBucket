import React from "react"
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <header className="header">
            <Link to="/">
                <h1 className="header--title"><span className="header--title__span">Full</span>Bucket</h1>
            </Link>
            <nav className="header--nav">
                <ul className="header--ul">
                    <Link to="/">
                        <li className="header--li">Typing</li>
                    </Link>
                    <Link to="/spelling">
                        <li className="header--li">Spelling Practice</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}
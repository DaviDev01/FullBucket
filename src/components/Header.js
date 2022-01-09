import React from "react"
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/">
                    <h1 className="header--title"><span className="header--title__span">Full</span>Bucket<i className="fas fa-fill-drip bucketIcon"></i></h1>
                    
                    <p className="subTitle">Study Environment</p>
                    <hr className="hr"/>
                </Link>
                <nav className="header--nav">
                    <ul className="header--ul">
                        <Link to="/">
                            <li className="header--li">White board</li>
                        </Link>
                        <Link to="/spelling">
                            <li className="header--li">Spelling Practice</li>
                        </Link>
                        <Link to="/about">
                            <li className="header--li">About</li>
                        </Link>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
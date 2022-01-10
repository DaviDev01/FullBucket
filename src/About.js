import React, {useContext} from "react"
import stepone from "./imgs/stepone.png"
import steptwo from "./imgs/steptwo.png"
import definition from "./imgs/definition.png"
import spelling from "./imgs/spelling.png"
import { Context } from "./Context"

export default function About() {
    const {lang} = useContext(Context)
    return (
        <main className="About--main">
            <article className="About--article">
                <h2 className="About--article_title">{lang.title1}</h2>
                <p className="About--article_body">{lang.part1}</p> 
                <p className="About--article_body">{lang.part2}</p>
                <h2 className="About--article_title">{lang.title2}</h2>
                <p className="About--article_body">{lang.part3}</p>
                <h3 className="About--article_title">{lang.title3}</h3>
                <p className="About--article_body">{lang.part4}<i className='fas fa-pen About--editIcon'></i>{lang.part5}<i className='fas fa-check About--editIcon'></i>{lang.part6}</p>
                <img src={stepone} className="About--article_img" alt=""/>
                <img src={steptwo} className="About--article_img" alt=""/>
                <h3 className="About--article_title">{lang.title4}</h3>
                <p className="About--article_body">{lang.part7}<span className="selectedText">{lang.part8}</span>{lang.part9}<i className='fas fa-volume-up About--editIcon'></i>{lang.part10}<i className='fas fa-cog About--editIcon'></i>{lang.part11}<a style={{textDecoration: 'underline'}} href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API#speech_synthesis" target="_blank" rel="noreferrer">{lang.part12}</a>.</p>
                <h3 className="About--article_title">{lang.title5}</h3>
                <p className="About--article_body">{lang.part13}</p>
                <img src={definition} className="About--article_img" alt=""/>
                <p className="About--article_body">{lang.part14}<a style={{textDecoration: 'underline'}} href="https://dictionaryapi.dev/" target="_blank" rel="noreferrer">{lang.part15}</a>.</p>
                <h3 className="About--article_title">{lang.title6}</h3>
                <p className="About--article_body">{lang.part16}<i className='fas fa-volume-up About--editIcon'></i>.</p>
                <img src={spelling} className="About--article_img" alt=""/>
                <p className="About--article_body">{lang.part17}</p>
            </article>
        </main>
    )
}
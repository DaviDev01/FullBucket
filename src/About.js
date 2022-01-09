import React from "react"
import stepone from "./imgs/stepone.png"
import steptwo from "./imgs/steptwo.png"
import definition from "./imgs/definition.png"
import spelling from "./imgs/spelling.png"

export default function About() {
    return (
        <main className="About--main">
            <article className="About--article">
                <h2 className="About--article_title">What Is FullBucket?</h2>
                <p className="About--article_body">When you are learning a new language, there are a lot of tools that can help you, like a dictionary to look up words, a text to speech technology to help you improve your ability to understand and pronounce certain words, and a place where you can practice both your reading and writing skills.</p> 
                <p className="About--article_body">The problem is that those tools are scattered all around the internet. That's why I created FullBucket, to give you all the tools you need and let you focus on learning.</p>
                <h2 className="About--article_title">How Do I Use It?</h2>
                <p className="About--article_body">Here are some features of the site and how to use them:</p>
                <h3 className="About--article_title">Type whatever you want</h3>
                <p className="About--article_body">If you have any text that you would like not only to read but also to write, The white board page will alow you to do so. Just click on the pen icon <i className='fas fa-pen About--editIcon'></i> and pass your text to the input area. After that just click on the check icon <i className='fas fa-check About--editIcon'></i> and start typing...</p>
                <img src={stepone} className="About--article_img" alt=""/>
                <img src={steptwo} className="About--article_img" alt=""/>
                <h3 className="About--article_title">Hear pronounciation</h3>
                <p className="About--article_body">By selecting any text (<span className="selectedText">like this</span>) and clicking on the speaker icon <i className='fas fa-volume-up About--editIcon'></i> you can hear the pronounciation of any sentence or word. You can also change the text to speech voice and language by clicking on cog icon <i className='fas fa-cog About--editIcon'> </i> and choosing an option from the drop-down menu. The voice options could be limited depending on the browser being used. You can learn more about the API used in this project <a style={{textDecoration: 'underline'}} href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API#speech_synthesis" target="_blank" rel="noreferrer">here</a>.</p>
                <h3 className="About--article_title">See word definition</h3>
                <p className="About--article_body">If you select (like shown above) a single word you can also see its definition by pressing Ctrl + Alt keys. When you do so, a card will apear with the word meaning and synonyms if available.</p>
                <img src={definition} className="About--article_img" alt=""/>
                <p className="About--article_body">The API that provides the word's definition and synonyms is <a style={{textDecoration: 'underline'}} href="https://dictionaryapi.dev/" target="_blank" rel="noreferrer">The Free Dictionary API</a>.</p>
                <h3 className="About--article_title">Spelling Practice</h3>
                <p className="About--article_body">Spelling Practice helps you with your listeing and writing ablilitys  in English. There are around 1000 sentences containing the most used words in the English language. The way it works is simple, after reading the instructions on the Spelling Practice page press enter. You will hear the sentence being read out loud by your defalt TTS voice. After that just type the word that is missing in the sentence in front of you. You can hear the sentence again by pressing the speaker Icon <i className='fas fa-volume-up About--editIcon'></i>.</p>
                <img src={spelling} className="About--article_img" alt=""/>
                <p className="About--article_body">You still can still use the see word definition command in the Spelling Practice page.</p>
            </article>
        </main>
    )
}
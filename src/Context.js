import React, {useState, useEffect} from "react"

const Context = React.createContext()
function ContextProvider(props) {
    const [languagesArray] = useState([{
        about: "About",
        whiteboardInstructions: "Try to type what is written here. Select text with your mouse and click the speaker icon to hear it or press ctrl + alt to see the word's definition.",
        title1: "What Is FullBucket?",
        part1: "When you are learning a new language, there are a lot of tools that can help you, like a dictionary to look up words, a text to speech technology to help you improve your ability to understand and pronounce certain words, and a place where you can practice both your reading and writing skills.",
        part2: "The problem is that those tools are scattered all around the internet. That's why I created FullBucket, to give you all the tools you need and let you focus on learning.",
        title2: "How Do I Use It?",
        part3: "Here are some features of the site and how to use them:",
        title3: "Type whatever you want",
        part4: "If you have any text that you would like not only to read but also to write, The whiteboard page will allow you to do so. Just click on the pen icon ",
        part5: " and paste your text to the input area. After that just click on the check icon ",
        part6: " and start typing...",
        title4: "Hear pronunciation",
        part7: "By selecting any text (",
        part8: "like this",
        part9: ") and clicking on the speaker icon ",
        part10: ", You'll be able to hear the word or sentence being read out loud. You can also change the text to speech voice and language by clicking on the cog icon ",
        part11: " and choosing an option from the drop-down menu. Voice options could be limited depending on the browser being used. You can learn more about the API used in this project ",
        part12: "here",
        title5: "See word definition",
        part13: "If you select (like shown above) a single word you can also see its definition by pressing Ctrl + Alt keys. When you do so, a card will appear with the word meaning and synonyms if available.",
        part14: "The API that provides the word's definition and synonyms is ",
        part15: "The Free Dictionary API",
        title6: "Spelling Practice",
        part16: "Spelling Practice helps you with your listening and writing abilities in English. There are around 1000 sentences available containing the most used words in the English language. The way it works is simple, after reading the instructions on the Spelling Practice page press enter. You will hear the sentence being read out loud by your default TTS voice. After that just type the word that is missing in the sentence in front of you. You can hear the sentence again by pressing the speaker Icon ",
        part17: "You can still use the see word definition command on the Spelling Practice page."
    }, {
        about: "Sobre",
        whiteboardInstructions: "Tente digitar o que está escrito aqui. Selecione o texto com o mouse e clique no ícone do alto-falante para ouvi-lo ou pressione ctrl + alt para ver a definição da palavra.",
        title1: "O que é FullBucket?",
        part1: "Quando você está aprendendo um novo idioma, existem várias ferramentas que podem ajudá-lo, como um dicionário para procurar palavras, uma tecnologia de conversão de texto para fala para ajudá-lo a melhorar sua capacidade de entender e pronunciar certas palavras e um lugar onde você possa praticar suas habilidades de leitura e escrita.",
        part2: "O problema é que essas ferramentas estão espalhadas por varios cantos da internet. É por isso que criei o FullBucket, para dar a você todas as ferramentas que você precisa e permitir que você se concentre no aprendizado.",
        title2: "Como usar?",
        part3: "Aqui estão alguns recursos do site e como usá-los:",
        title3: "Digite o que quiser",
        part4: "Se você tiver algum texto que gostaria não apenas de ler, mas também de escrever, a página 'whiteboard' permitirá que você faça isso. Basta clicar no ícone da caneta ",
        part5: "e colar o texto na área de entrada. Depois disso, simplismente clique no ícone de confirmação ",
        part6: " e começe a digitar ...",
        title4: "Ouvir a pronúncia",
        part7: "Selecionando qualquer texto (",
        part8: "dessa forma",
        part9: ") e clicando no ícone do alto-falante ",
        part10: ", você poderá ouvir a palavra ou frase sendo lida em voz alta. Você também pode alterar a voz falada e o idioma clicando no ícone de engrenagem ",
        part11: " e escolhendo uma opção do menu. As opções de voz podem ser limitadas dependendo do navegador usado. Para mais informações sobre o API usado neste projeto clique ",
        part12: "aqui",
        title5: "Veja a definição de palavras",
        part13: "Se você selecionar (como mostrado acima) uma única palavra, você também pode ver sua definição pressionando as teclas Ctrl + Alt. Ao fazer isso, o significado da palavra e sinônimos, se disponíveis, aparecerão.",
        part14: "O API que fornece a definição e os sinônimos das palavras é o ",
        part15: "Free Dictionary API",
        title6: "Prática de Ortografia",
        part16: "A prática ortográfica te ajuda com suas habilidades de escuta e escrita em inglês. São cerca de 1000 frases disponíveis contendo as palavras mais utilizadas na língua inglesa. O funcionamento é simples, após ler as instruções na página 'Spelling Practice', pressione Enter. Você ouvirá a frase sendo lida em voz alta pela voz padrão do seu dispositivo. Depois disso, basta digitar a palavra que está faltando na frase em sua frente. É possível ouvir a frase novamente pressionando o ícone do alto-falante",
        part17: "Você ainda pode usar o comando Ctrl + Alt para ver definição de palavras na página Prática de Ortografia."
    }])
    const [chosenLang, setChosenLang] = useState(JSON.parse(localStorage.getItem('lang')) || 0)

    useEffect( () => {
        localStorage.setItem('lang', JSON.stringify(chosenLang))
    }, [chosenLang])

    return (
        <Context.Provider value={{lang: languagesArray[chosenLang], setChosenLang: setChosenLang, chosenLang: chosenLang, languagesArray}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context} 


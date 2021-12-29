let synth = window.speechSynthesis
let inputTxt = ''

export function runTTs(e) {
  let char = e.keyCode
  switch(char) {
      case 16:
      getSelectedText()
      console.log('16 was pressed')
      break;
      default: 
      break;
  }
}

function getSelectedText() {
  let selectedText = '';
      
  if (window.getSelection) {
      selectedText = window.getSelection();
      speak()
  } else return;
  inputTxt = selectedText;
  console.log(inputTxt)
}

function speak(){
  if (inputTxt !== '') {
      let utterThis = new SpeechSynthesisUtterance(inputTxt)
      utterThis.voice = synth.getVoices().filter( (obj) => obj.name === "Google US English" && obj.voiceURI === "Google US English")[0]
      synth.speak(utterThis)
      console.log(synth.getVoices().filter( (obj) => obj.name === "Google US English" && obj.voiceURI === "Google US English")[0])
  }
}  
//Init SpeechSynth API
const synth = window.speechSynthesis;



//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const speed = document.querySelector('#speed');
const pitch = document.querySelector('#pitch');
const speedValue = document.querySelector('#speed-value');
const pitchValue = document.querySelector('#pitch-value');



//Init voices array
let voices = [];

const getVoices = () =>{
    voices = synth.getVoices();

    // Create options for select list
    voices.forEach(voice => {
        // Create option element
        const option = document.createElement('option');
        // Fill option with voice and language
        option.textContent = `${voice.name}(${voice.lang})`;


        //set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        voiceSelect.appendChild(option);
    });
};

getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}



//Speak
const Speak = () => {
    //check if speaking
    if(synth.speaking){
        console.error('Already Speaking');
    }
    if(textInput.value !== ''){
        // Get Speak text
        const speakText  = new SpeechSynthesisUtterance(textInput.value);
        
        // Speak end
        speakText.onend = e => {
            console.log('done Speaking');
        };

        // Speak error
        speakText.onerror = e =>{
            console.error('Something went wrong!')
        }
    }
};
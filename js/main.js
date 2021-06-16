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
const body = document.querySelector('body');



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
const speak = () => {

    //check if speaking
    if(synth.speaking){
        console.error('Already Speaking');
    }
    if(textInput.value !== ''){
        //Add background animation
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        // Get Speak text
        const speakText  = new SpeechSynthesisUtterance(textInput.value);
        
        // Speak end
        speakText.onend = e => {
           body.style.background = '#141414';
        };

        // Speak error
        speakText.onerror = e =>{
            console.error('Something went wrong!')
        };

        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices 
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        //Set pitch and speed
        speakText.rate = speed.value;
        speakText.pitch = pitch.value;

        //Speak
        synth.speak(speakText);

    }
};


//Event Listners

//Text form submit
textForm.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value Change
speed.addEventListener('change', e => speedValue.textContent = speed.value);

// Pitch value Change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);


// Voice Select Change
voiceSelect.addEventListener('change', e => speak());

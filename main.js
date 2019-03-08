// init SpeachSynth API
const synth = window.speechSynthesis;

const textFom = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector('#rate');
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector('body');

// Init voices array

let voices = [];
const getVoices = () => {
    voices = synth.getVoices();
    voices.forEach(voice => {
        //create options tag for the voices
        const option = document.createElement('option');
        option.textContent = voice.name + `(${voice.lang})`;
        //make some attributes to the option tag
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        //append the option tag to the select tag
        voiceSelect.appendChild(option);
    })
}

getVoices();
function myFunction() { 
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
   {
       // if the array voices is empty do this or if you using chrome use the below code
          if(synth.onvoiceschanged != undefined) {   
            synth.onvoiceschanged = getVoices;
         }
   }
   else if(navigator.userAgent.indexOf("Chrome") != -1 )
   {
       if(synth,onvoiceschanged != undefined) {
           synth.onvoiceschanged = getVoices;
       }
   }
   else if(navigator.userAgent.indexOf("Safari") != -1)
   {
        if(synth,onvoiceschanged != undefined) {
            synth.onvoiceschanged = getVoices;
        }
   }
   else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
   {
        //alert('Firefox');
        
   }
   else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
   {
        if(synth,onvoiceschanged != undefined) {
            synth.onvoiceschanged = getVoices;
        }
   }  
   else 
   {
      alert('unknown your browser mybe this functioanlity not work for you!!!');
   }
   }
   myFunction();


const speak = () => {

    //check if speaking
    if(synth.speaking) {
        console.error('already speaking.....');
        return;
    }
    // check the the user input value to speak it whatever the user type it
    if(textInput.value !== '') {
        // make the animation of the gif when text is speaking
        body.style.background = 'url(wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';    
        //make the api speak it with the user input
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //when the speaking ends
        speakText.onend = e => {
            console.log('Done Speaking....')
            //set the background its color only
            body.style.background = '#141414'
        }
        //when occurs error in the speaking
        speakText.onerror = e => {
            console.error('Something Went Wrong.....')
        }

        // init which voice the user uses to speak ..... selected voice
        let selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')
        //loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice
            }
        })
        // set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        synth.speak(speakText)
    }
}
//set up eventlistner
textFom.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textFom.blur();
})

//rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

//pitch value change
pitch.addEventListener('change', e=> (pitchValue.textContent = pitch.value));

//voice select change
voiceSelect.addEventListener('change', e => speak())
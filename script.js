const textarea = document.querySelector("textarea");
const button = document.querySelector("button");
let isSpeaking = true;
let maleVoice;

const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    maleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes("male") || 
        voice.lang === "en-US" // Change to your preferred language/locale
    ) || voices[0]; // Default to the first voice if no male voice is found
};

// Load voices initially and also on the voiceschanged event (for some browsers)
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

const textToSpeech = () => {
    const synth = window.speechSynthesis;
    const text = textarea.value;

    if (!synth.speaking && text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = maleVoice; // Set the voice to male
        synth.speak(utterance);
        button.innerText = "Speaking";

        utterance.onend = () => {
            isSpeaking = true;
            button.innerText = "Convert to Speech";
        };
    }

    if (synth.speaking) {
        if (isSpeaking) {
            synth.pause();
            button.innerText = "Resume";
        } else {
            synth.resume();
            button.innerText = "Pause";
        }
        isSpeaking = !isSpeaking;
    }
};

button.addEventListener("click", textToSpeech);

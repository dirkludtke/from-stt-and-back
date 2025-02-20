/**
 * prepare speech synthesis.
 * @param textSource the text source (e.g. a textarea).
 * @param languageSource the language source (e.g. an input field).
 * @returns button to trigger speech synthesis.
 */
function prepareSynthesis(textSource, languageSource) {
    let synthesis = window.speechSynthesis;
    // activate/deactivate button based on the text input
    textSource.onchange = () => {
        ttsButton.disabled = !textSource.value;
    };
    // synthesize the text when the button is clicked
    let ttsButton = document.createElement('button');
    ttsButton.innerText = '▶️ SYNTHESIZE';
    ttsButton.onclick = () => {
        ttsButton.disabled = true;
        synthesize(synthesis, textSource.value, languageSource.value)
            .finally(() => {
            ttsButton.disabled = false;
        });
    };
    return ttsButton;
}
/**
 * synthesize a text.
 * @param synthesis speech synthesis object.
 * @param text text to synthesize.
 * @param language language code (e.g. 'en-US').
 */
async function synthesize(synthesis, text, language) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    // Without the following, voice remains in OS language on iOS
    let voices = synthesis.getVoices().filter((voice) => voice.lang === language);
    console.log(`${voices.length} voice${voices.length == 1 ? '' : 's'} available for ${language}`);
    if (voices) {
        utterance.voice = voices[0];
    }
    synthesis.speak(utterance);
}
export { prepareSynthesis };

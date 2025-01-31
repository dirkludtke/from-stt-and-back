/**
 * prepare speech recognition.
 * @param textDestination destination of the recognized text (e.g. a textarea).
 * @param languageSource source of the language (e.g. an input field).
 * @returns button to trigger speech recognition.
 */
function prepareRecognition(textDestination, languageSource) {
    let sttButton = document.createElement('button');
    let recognition = createRecognition(textDestination);
    if (recognition === undefined) {
        console.log('Speech recognition not available');
        sttButton.innerText = '😭 NO RECOGNIZE';
        sttButton.disabled = true;
        return sttButton;
    }
    recognition.lang = languageSource.value;
    let isRecognizing = false;
    // set language when it changes
    let oldOnchange = languageSource.onchange;
    languageSource.onchange = (event) => {
        console.log('Language changed', languageSource.value);
        oldOnchange?.(event);
        recognition.lang = languageSource.value;
    };
    sttButton.innerText = '⏺️ RECOGNIZE';
    sttButton.onclick = () => {
        if (isRecognizing) {
            sttButton.classList.remove('recording');
            sttButton.innerText = '⏺️ RECOGNIZE';
            recognition.stop();
            isRecognizing = false;
        }
        else {
            sttButton.classList.add('recording');
            sttButton.innerText = '⏹️ STOP REC';
            recognition.start();
            isRecognizing = true;
        }
    };
    return sttButton;
}
/**
 * create a SpeechRecognition object if supported by the browser.
 * @param textDestination destination of the recognized text.
 * @returns the created SpeechRecognition object or undefined if speech recognition is not supported.
 */
function createRecognition(textDestination) {
    let Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (Recognition === undefined)
        return;
    let recognition = new Recognition();
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
        let resultList = [];
        for (let result of event.results) {
            resultList.push(result[0].transcript); // only use the first alternative
        }
        textDestination.value = resultList.join('');
    };
    return recognition;
}
export { prepareRecognition };

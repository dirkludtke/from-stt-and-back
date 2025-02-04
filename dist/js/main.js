import { prepareRecognition } from "./recognition.js";
import { prepareSynthesis } from "./synthesis.js";
/**
 * main function (which adds it content to the section provided).
 * @param section parent HTML element to put the content in.
 */
function main(section) {
    let controls = document.createElement('section');
    controls.classList.add('controls');
    let [langSelect, langField] = createLanguageSelect();
    let textArea = document.createElement('textarea');
    textArea.placeholder = 'Type here or use RECOGNIZE button...';
    textArea.rows = 4;
    let sttButton = prepareRecognition(textArea, langField);
    let ttsButton = prepareSynthesis(textArea, langField);
    controls.replaceChildren(sttButton, langSelect, langField, ttsButton);
    section.replaceChildren(controls, textArea);
}
/**
 * create the logic for selecting the language (allows to select by language code or by flag).
 * it creates two HTML elements, a select element and an input element). the input field contains
 * the language selected. the select element has a question mark option for the case that the
 * selected language is not known.
 * @returns two HTML elements created (a select element and an input element).
 */
function createLanguageSelect() {
    let langSelect = document.createElement('select');
    let notFoundOption = document.createElement('option');
    notFoundOption.value = '?';
    notFoundOption.innerText = '❓';
    notFoundOption.disabled = true;
    langSelect.appendChild(notFoundOption);
    for (let [value, text] of Object.entries(languages)) {
        let option = document.createElement("option");
        option.setAttribute("value", value);
        if (value == 'en-US') {
            option.setAttribute("selected", "");
        }
        option.innerText = text;
        langSelect.appendChild(option);
    }
    let langField = document.createElement('input');
    langField.size = 5;
    langField.maxLength = 6;
    langField.value = 'en-US';
    langSelect.onchange = () => {
        langField.value = langSelect.value;
        langField.dispatchEvent(new Event('change'));
    };
    langField.onchange = () => {
        for (let option of langSelect.options) {
            if (option.value == langField.value) {
                option.selected = true;
                return;
            }
        }
        notFoundOption.selected = true;
    };
    return [langSelect, langField];
}
// pair language codes (as needed by the Web Speech API) with strings to display (e.g. the flag)
let languages = {
    'ca-ES': 'cat',
    'de-DE': '🇩🇪',
    'en-GB': '🇬🇧',
    'en-US': '🇺🇸',
    'es-ES': '🇪🇦',
    'fr-FR': '🇫🇷',
    'ja-JP': '🇯🇵',
    'ru-RU': '🇷🇺',
    'zh-CN': '🇨🇳',
};
let section = document.getElementById('content');
if (section) {
    main(section);
}
else {
    console.log("Could not find section with id 'main'");
}

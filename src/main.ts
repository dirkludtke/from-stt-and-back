let languages: Record<string, string> = {
  'ca-ES': 'cat',
  'de-DE': '🇩🇪',
  'en-UK': '🇬🇧',
  'en-US': '🇺🇸',
  'es-ES': '🇪🇦',
  'fr-FR': '🇫🇷',
  'ja-JP': '🇯🇵',
  'ru-RU': '🇷🇺',
  'zh-CN': '🇨🇳',
}

let section = document.getElementById('content');
if (section) {
  main(section);
}
else {
  console.log("Could not find section with id 'main'");
}


function main(section: HTMLElement) {
  let controls = document.createElement('section');
  controls.classList.add('controls');
  let sttButton = document.createElement('button');
  sttButton.innerText = '⏺️ RECOGNIZE';
  let [langSelect, langField] = createLanguageSelect();
  let ttsButton = document.createElement('button');
  ttsButton.innerText = '▶️ SYNTHESIZE';
  controls.replaceChildren(sttButton, langSelect, langField, ttsButton);

  let textArea = document.createElement('textarea');
  textArea.rows = 5;
  textArea.cols = 40;

  section.replaceChildren(controls, textArea);
}

function createLanguageSelect() {
  let langSelect = document.createElement('select');
  let notFoundOption = document.createElement('option');
  notFoundOption.value = '?';
  notFoundOption.innerText = '❓';
  notFoundOption.disabled = true;
  langSelect.appendChild(notFoundOption);
  for (let [ value, text ] of Object.entries(languages)) {
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
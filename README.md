# From Speech to Text and Back: Exploring the Web Speech API

This is a demonstration of the Web Speech Api (cf. https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). The API is implemented by web browsers and, in theory, supports both, speech recognition (speech to text) and speech synthesis (text to speech).

- The typescript source code is inside the src folder.
- The built javascript demo is inside the dist folder which is deployed to https://dirkludtke.github.io/from-stt-and-back/.
- For building yourself, you need to:
  - install npm (cf. https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
  - execute "npm install" from the project directory for installing the dependencies (typescript).
  - execute "npm run build" from the project directory for building the sources into the dist/js folder.
- For local deployment, we use the command line Python http server. If you want to use it for your own tests, you need to:
  - install Python (cf. https://www.python.org/downloads/).
  - execute "npm run serve" from the project directory.
  - open your web browser with address http://0.0.0.0:8000/ (which some browsers consider unsave) or http://localhost:8000/ or http://127.0.0.1:8000/.
 
Unfortunately, support of this api is not consistent. There are large differences between different browsers and different operating systems. In beginning of 2025:
- Firefox and Opera do not support speech recognition.
- Chrome needs connectivity (uses APIs of Google Cloud).
- Supported language vary, e.g., Chrome on Linux supports recognition of Catalan but synthesizes it with default language.
- Speech recognition is often without punctuation.
- Speech recognition parameter "continuous" is interpreted differently, e.g. Chrome on Linux provides separate chunks (A, B, C) but Chrome on Android provides complete results where the last one contains all information (A, AB, ABC).
- Sometimes, synthesis quality is poor (Firefox on Linux, Safari on IOS for some languages).
- Some systems have partially supported languages. Example: Japanese in Firefox on Linux supports Hiragana and Katakana but not Kanji. Kanji are synthesized as the English phrase "Chinese letter". Example: "今日はいい天気です" (Kyou wa ii tenki desu) is synthesized as "Chinese letter chinese letter haii chinese letter chinese letter desu".

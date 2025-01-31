# From Speech to Text and Back: Exploring the Web Speech API

This is a demonstration of the Web Speech Api (cf. https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). The API is implemented by web browsers and, in theory, supports both, speech recognition (speech to text) and speech synthesis (text to speech).

- The typescript source code is inside the src folder. Most of the code is for maintaining buttons and test fields. The API calls only consume a few lines.
- The built demo is inside the dist folder which is deployed to https://dirkludtke.github.io/from-stt-and-back/.
- For building yourself, you need to:
  - install npm (cf. https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
  - execute "npm install" from the project directory for installing the dependencies (typescript).
  - execute "npm run build" from the project directory for building the sources into the dist/js folder.
- For local deployment, we use the command line Python http server. If you want to use it for your own tests, you need to:
  - install Python (cf. https://www.python.org/downloads/).
  - execute "npm run serve" from the project directory.
  - open your web browser with address http://0.0.0.0:8000/ (which some browsers consider unsave) or http://127.0.0.1:8000/.
 
Unfortunately, support of this api is not consistent. In beginning of 2025:
- Chrome supports both, speech recognition and speech synthesis, only when connected.
  - Catalan is supported by speech recognition but not by speech synthesis. 
- Firefox only supports speech synthesis. The voice quality is not very good but it also works offline.
  - For synthesizing Japanese, only Hiragana and Katakana are supported. Kanji are synthesized as the English phrase "Chinese letter". Example: "今日はいい天気です" (Kyou wa ii tenki desu) is synthesized as "Chinese letter chinese letter haii chinese letter chinese letter desu".

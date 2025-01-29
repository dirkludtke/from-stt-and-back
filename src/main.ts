let section = document.getElementById('content');

if (section) {
    let message = document.createElement('div');
    message.innerHTML = 'Hello, World!';
    section.replaceChildren(message);
}
else {
  console.log("Could not find section with id 'main'");
}

var buttons
window.onload = _ => {
  buttons = Array.from(document.querySelectorAll("button"))
  buttons.map(b => b.disabled = true)
  document.querySelector("#connect").disabled = false
}

function sendFromButton() {
  if (!myMonocle) { console.error('no monocle found'); return; }
  parsedcode = this.parentElement.children[1].value
  console.log('parsedcode:', parsedcode)
  myMonocle.repl(parsedcode)
    .then(r => showOutput(r))
}

function showOutput(r) {
  console.log('raw return:', r)
  document.querySelector("#output").innerText
    += r.replace('OK', '').slice(0, -3)
}
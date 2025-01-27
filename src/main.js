var buttons
window.onload = _ => {
  buttons = Array.from(document.querySelectorAll("button"))
  buttons.map(b => b.disabled = true)
  document.querySelector("#connect").disabled = false
}

var code = "";
var xhr = new XMLHttpRequest();
xhr.open("GET", "code", true);
xhr.onload = function () {
    code = xhr.responseText;
}
xhr.send();

function sendFromButton() {
  if (!myMonocle) { console.error('no monocle found'); return; }
  parsedcode = this.parentElement.children[1].value
  console.log('parsedcode:', parsedcode)
  myMonocle.repl(parsedcode)
    .then(r => showOutput(r))
}

function send() {
  if (!myMonocle) { console.error('no monocle found'); return; }
  var max = document.getElementById("max").value;
  var min = document.getElementById("min").value;
  var int = document.getElementById("int").value;
  var num = document.getElementById("num").value;
  if (Number(min) >= Number(max)) { console.error('min >= max'); showOutput("plz min < max\n   "); return; }
  console.log(code);
  sendcode = code;
  sendcode = sendcode.replaceAll("{max}", max);
  sendcode = sendcode.replaceAll("{min}", min);
  sendcode = sendcode.replaceAll("{int}", int);
  sendcode = sendcode.replaceAll("{num}", num);
  console.log(sendcode);
  myMonocle.repl(sendcode)
    .then(r => showOutput(r))
}
function sendreset() {
  if (!myMonocle) { console.error('no monocle found'); return; }
  sendcode = "import device\n"
  sendcode += "device.reset()\n"
  myMonocle.repl(sendcode)
    .then(r => showOutput(r))
}

function showOutput(r) {
  console.log('raw return:', r)
  document.querySelector("#output").innerText
    += r.replace('OK', '').slice(0, -3) // -3 to remove the \r\n
}
function easy() {
  document.getElementById("max").value = 10;
  document.getElementById("min").value = 1;
  document.getElementById("int").value = 1;
  document.getElementById("num").value = 5;
}

function normal() {
  document.getElementById("max").value = 10;
  document.getElementById("min").value = 1;
  document.getElementById("int").value = 0.5;
  document.getElementById("num").value = 5;
}

function hard() {
  document.getElementById("max").value = 100;
  document.getElementById("min").value = 1;
  document.getElementById("int").value = 0.3;
  document.getElementById("num").value = 5;
}

function hell() {
  document.getElementById("max").value = 100;
  document.getElementById("min").value = 1;
  document.getElementById("int").value = 0.1;
  document.getElementById("num").value = 10;
}

function save() {
  localStorage.setItem("max", document.getElementById("max").value);
  localStorage.setItem("min", document.getElementById("min").value);
  localStorage.setItem("int", document.getElementById("int").value);
  localStorage.setItem("num", document.getElementById("num").value);
}

function load() {
  document.getElementById("max").value = localStorage.getItem("max");
  document.getElementById("min").value = localStorage.getItem("min");
  document.getElementById("int").value = localStorage.getItem("int");
  document.getElementById("num").value = localStorage.getItem("num");
}
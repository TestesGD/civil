const texto = ["qualidade", "segurança", "confiança"];

let i = 0,
  j = 0,
  apagando = false;
const el = document.getElementById("texto");

function digitar() {
  if (!apagando && j < texto[i].length) {
    el.textContent += texto[i].charAt(j++);
    setTimeout(digitar, 120);
  } else if (apagando && j > 0) {
    el.textContent = texto[i].substring(0, --j);
    setTimeout(digitar, 100);
  } else if (!apagando && j == texto[i].length) {
    apagando = true;
    setTimeout(digitar, 1500);
  } else {
    apagando = false;
    i = (i + 1) % texto.length;
    setTimeout(digitar, 300);
  }
}
digitar();

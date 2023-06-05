var settings = false;
var services = false;
var page = 0;
var pageIndex = 0;

function hideAll(){
  document.getElementById('tabellaPrincipale').setAttribute("hidden", "hidden");
  document.getElementById('tabellaImpostazioni').setAttribute("hidden", "hidden");
  document.getElementById('tabellaServices').setAttribute("hidden", "hidden");
}

function changeTitle(nomeProdotto) {
  document.getElementById("intestazioneMonitor").innerHTML = nomeProdotto.textContent;
}

function showPage(tag){
  hideAll();
  document.getElementById(tableimg.get(tag.id)).removeAttribute("hidden");
  if(tag.id == "imgBS"){
    tag.src = "Resources/indietro.png";
  }



}

const tableimg = new Map([
  ["imgBS", "tabellaImpostazioni"], //associo all'immagine delle impostazioni, la pagina delle impostazioni
  ["imgSRVC", "tabellaServices"],
  ["lblSRVC", "tabellaServices"],
])

const indextable = new Map([
  [1, "tabellaImpostazioni"]
  [2, "tabellaService"]
  [3, "tabellaPrincipale"]
])



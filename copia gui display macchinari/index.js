var settings = false;
var services = false;
var pageIndex = 0;

var i = 0;
var pageName = "tabellaService";

function hideAll(){
  document.getElementById('tabellaPrincipale').setAttribute("hidden", "hidden");
  document.getElementById('tabellaImpostazioni').setAttribute("hidden", "hidden");
  document.getElementById('tabellaServices0').setAttribute("hidden", "hidden");
}

function changeTitle(nomeProdotto) {
  document.getElementById("intestazioneMonitor").innerHTML = nomeProdotto.textContent;
}

function showPage(tag){
  hideAll();
  document.getElementById(tableimg.get(tag.id)).removeAttribute("hidden"); //rendo visibile la pagina 
  pageIndex = indextable.get(tableimg.get(tag.id));
  
  if(pageIndex == 0){
    tag.src = "Resources/impostazioni_NB.png";
  }  
  else if(pageIndex == 1){
    tag.src = "Resources/indietro.png";
  }
  else if(pageIndex == 2){

  }
}

const tableimg = new Map([
  ["imgBS", "tabellaImpostazioni"], //associo all'immagine delle impostazioni, la pagina delle impostazioni
  ["imgSRVC", "tabellaServices0"],
  ["lblSRVC", "tabellaServices0"],
])

const indextable = new Map([
  ["tabellaPrincipale", 0],
  ["tabellaImpostazioni", 1],
  ["tabellaServices0", 2],
])



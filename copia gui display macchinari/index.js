var settings = false;
var services = false;
var pageIndex = 0;

var i = 0;
var charAt = 0;

var nextPage = 1; 
var previousPage;

function hideAll(){
  document.getElementById('tabellaPrincipale').setAttribute("hidden", "hidden");
  document.getElementById('tabellaImpostazioni').setAttribute("hidden", "hidden");
  document.getElementById('tabellaServices1').setAttribute("hidden", "hidden");
  document.getElementById('prev').setAttribute("hidden", "hidden");
  document.getElementById('next').setAttribute("hidden", "hidden");
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
    document.getElementById('prev').removeAttribute("hidden")
    document.getElementById('next').removeAttribute("hidden")
  }
}

function showPageByNumber(ts, component){
  var pagina;

  if(component.id == "next"){ //pag succ
    nextPage++;
    pagina = ts + nextPage; //concat della stringa tabellaServices e 1 = tabellaServices1
  }

  if(component.id == "prev"){ //pag precedente
    if(nextPage == 0 ){
      document.getElementById("tabellaServices1").removeAttribute("hidden");
    }
    else{
      nextPage--;
      pagina = ts + nextPage;
      previousPage = ts + nextPage--;
      hideAll();
    }
  }


  // document.getElementById(previousPage).setAttribute("hidden", "hidden");
  hideAll();
  document.getElementById('prev').removeAttribute("hidden");
  document.getElementById('next').removeAttribute("hidden");
  document.getElementById(pagina).removeAttribute("hidden");
}

const tableimg = new Map([
  ["imgBS", "tabellaImpostazioni"], //associo all'immagine delle impostazioni, la pagina delle impostazioni
  ["imgSRVC", "tabellaServices1"],
  ["lblSRVC", "tabellaServices1"],
])

const indextable = new Map([
  ["tabellaPrincipale", 1],
  ["tabellaImpostazioni", 1],
  ["tabellaServices1", 2],
  
])

const tabellaServicesN = new Map([
  ["tabellaServices2", 2],
  ["tabellaServices3", 3],
  ["tabellaServices4", 4],
  ["tabellaServices5", 5],
  ["tabellaServices6", 6],
  ["tabellaServices7", 7],
  ["tabellaServices8", 8],
  ["tabellaServices9", 9],
  ["tabellaServices10", 10],
  ["tabellaServices11", 11],
])



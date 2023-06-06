var pageIndex = 0;

var i = 0;

var nextPage = 1; 
var previousPage;

var s = "tabellaServices";

function hideAll(){
  document.getElementById('tabellaPrincipale').setAttribute("hidden", "hidden");
  document.getElementById('tabellaImpostazioni').setAttribute("hidden", "hidden");
  document.getElementById('tabellaServices1').setAttribute("hidden", "hidden");
  document.getElementById('prev').setAttribute("hidden", "hidden");
  document.getElementById('next').setAttribute("hidden", "hidden");
  for (let i = 1; i < 12; i++) { //nascondo tutti i table services
    document.getElementById(s + "" + i).setAttribute("hidden", "hidden");
  }
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
    document.getElementById('prev').removeAttribute("hidden");
    document.getElementById('next').removeAttribute("hidden");
    document.getElementById('contPage').removeAttribute("hidden");
  }
}

function showPageByNumber(ts, component){
  var pagina;
  var cont = 0;

  if(component.id == "next"){ //pag succ
    if(nextPage >= 11){ //dopo l'ultima pagina
      nextPage = 1;
      hideAll();
      pagina = ts + nextPage; //concat della stringa tabellaServices e 1 = tabellaServices1
    }
    else{
      hideAll();
      nextPage++;
      pagina = ts + nextPage; //concat della stringa tabellaServices e 1 = tabellaServices1
    }
  }

  if(component.id == "prev"){ //pag precedente
    if(nextPage == 0 ){
      document.getElementById("tabellaServices1").removeAttribute("hidden");
    }else if(nextPage>0){
      hideAll();
      nextPage--;
      pagina = ts + nextPage;
      // previousPage = ts + nextPage--;
    }else if(nextPage<0){
      nextPage=11;
      pagina = ts + nextPage;
    }
  }

  document.getElementById('prev').removeAttribute("hidden");
  document.getElementById('next').removeAttribute("hidden");
  document.getElementById(pagina).removeAttribute("hidden");
  document.getElementById('contPage').innerHTML = nextPage + "/11";
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



var pageIndex = 0;
var nextPage = 1; 
var previousPage;

var s = "tabellaServices";
var w = "tabellaWarnings";
var tabella;

const imgtable =new Map([ //mappa che "collega" l'immagine alla tabella da visualizzare
  ["imgBS", "tabellaImpostazioni"], //associo all'immagine della ruota dentata, la pagina delle impostazioni
  ["imgSRVC", "tabellaServices1"],
  ["lblSRVC", "tabellaServices1"], //associo a immagine e lbl di service la prima pagina dei service
  ["imgBack", "tabellaPrincipale"],
  ["imgWrn", "tabellaWarnings1"],
])

const indextable = new Map([
  ["tabellaPrincipale", 0],
  ["tabellaImpostazioni", 1],
  ["tabellaServices1", 2],
  ["tabellaWarnings1", 3],
])

function hideAll(){
  document.getElementById('tabellaPrincipale').setAttribute("hidden", "hidden");
  document.getElementById('tabellaImpostazioni').setAttribute("hidden", "hidden");
  document.getElementById('tabellaServices1').setAttribute("hidden", "hidden");
  document.getElementById('tabellaWarnings1').setAttribute("hidden", "hidden");
  document.getElementById('prev').setAttribute("hidden", "hidden");
  document.getElementById('next').setAttribute("hidden", "hidden");
  for (let i = 1; i < 12; i++) { //nascondo tutti i tableServices
    document.getElementById(s + "" + i).setAttribute("hidden", "hidden");
  }

  for (let i = 1; i < 6; i++) { //nascondo tutti i table services
    document.getElementById(w + "" + i).setAttribute("hidden", "hidden");
  }
}

function changeTitle(nomeProdotto) {
  document.getElementById("intestazioneMonitor").innerHTML = nomeProdotto;
}

function powerButton(){
  let srcId = document.getElementById('pwrDiv').style;
    uibuilder.send({
    'payload': '0'
  })
  if(srcId.backgroundColor == "#E84C59"){ //se rosso
    srcId.backgroundColor = "#FF934A"; //arancio
  }
  else if(srcId.backgroundColor == "#FF934A"){ //se arancio
    srcId.backgroundColor = "#ADD8E6"; //azzurrino
  }
  else{
    srcId.backgroundColor = "#E84C59"; //rosso
  }
}

function showPage(tag){
  hideAll(); //nascondo tutti gli elementi
  document.getElementById(imgtable.get(tag.id)).removeAttribute("hidden"); //rendo visibile la pagina 
  pageIndex = indextable.get(imgtable.get(tag.id));
  
  if(pageIndex == 0){ //tabellaPrincipale
    tag.src = "Resources/impostazioni_NB.png";
    document.getElementById('imgBack').id = "imgBS";
    document.getElementById('contPage').setAttribute("hidden", "hidden");
  }  
  else if(pageIndex == 1){ //tabellaImpostazioni
    tag.src = "Resources/indietro.png";
    document.getElementById('contPage').setAttribute("hidden", "hidden");
    document.getElementById('imgBS').id = "imgBack";
  }
  else if(pageIndex == 2){ //tabellaService1
    tabella = "tabellaServices"
    document.getElementById('imgBack').id = "imgBS";
    document.getElementById('prev').removeAttribute("hidden"); //mostro le freccette e contatore pagina
    document.getElementById('next').removeAttribute("hidden");
    document.getElementById('contPage').innerHTML = "1/11";
    document.getElementById('contPage').removeAttribute("hidden");
  }

  else if(pageIndex == 3){ //tabellaWarnings
    tabella = "tabellaWarnings"
    document.getElementById('prev').removeAttribute("hidden"); //mostro le freccette e contatore pagina
    document.getElementById('next').removeAttribute("hidden");
    document.getElementById('contPage').innerHTML = "1/5";
    document.getElementById('contPage').removeAttribute("hidden");
    document.getElementById('imgBS').src = "Resources/indietro.png"; 
    document.getElementById('imgBS').id = "imgBack";
  }
}

function showPagesServices(component){
  var pagina;

  switch (tabella) {
    case "tabellaServices":
      if(component.id == "next"){ //pag succ
        if(nextPage >= 11){ //dopo l'ultima pagina
          nextPage = 1;
          hideAll();
          pagina = tabella + nextPage; //concat della stringa tabellaServices e N = tabellaServicesN
        }
        else{
          hideAll();
          nextPage++;
          pagina = tabella + nextPage; //concat della stringa tabellaServices e N = tabellaServicesN
        }
      }
    
      if(component.id == "prev"){ //pag precedente
        if(nextPage == 0 ){
          document.getElementById("" + tabella + "1").removeAttribute("hidden");
        }else if(nextPage>0){
          hideAll();
          nextPage--;
          pagina = tabella + nextPage;
        }
        if(nextPage<=0){
          nextPage=11;
          pagina = tabella + nextPage;
        }
      }
      
      document.getElementById('prev').removeAttribute("hidden");
      document.getElementById('next').removeAttribute("hidden");
      document.getElementById(pagina).removeAttribute("hidden");
      document.getElementById('contPage').innerHTML = nextPage + "/11";
    break;  
    

    case "tabellaWarnings":
      if(component.id == "next"){ //pag succ
        if(nextPage >= 5){ //dopo l'ultima pagina
          nextPage = 1;
          hideAll();
          pagina = tabella + nextPage; //concat della stringa tabellaServices e N = tabellaServicesN
        }
        else{
          hideAll();
          nextPage++;
          pagina = tabella + nextPage; //concat della stringa tabellaServices e N = tabellaServicesN
        }
      }
    
      if(component.id == "prev"){ //pag precedente
        if(nextPage == 0 ){
          document.getElementById("" + tabella + "1").removeAttribute("hidden");
        }else if(nextPage>0){
          hideAll();
          nextPage--;
          pagina = tabella + nextPage;
        }
        if(nextPage<=0){
          nextPage=5;
          pagina = tabella + nextPage;
        }
      }
      
      document.getElementById('prev').removeAttribute("hidden");
      document.getElementById('next').removeAttribute("hidden");
      document.getElementById(pagina).removeAttribute("hidden");
      document.getElementById('contPage').innerHTML = nextPage + "/5";
    break;
  }
}

uibuilder.onChange('msg', (msg) =>{
  switch (msg.topic) {
    case "parameters":
      iArray_id.forEach(function (val, key){
        switch (key) {
          case 2:
          case 4:
          case 5:
          case 6:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 19:
            document.getElementById(val).value = msg.payload[key]/10;  
          break;
              
          case 7:
          case 8:
            document.getElementById(val).value = msg.payload[key]/100;  
          break;  

          default:
            document.getElementById(val).value = msg.payload[key];
          break;
        }
        
        if(val == "abilitazioneiAQM"){
          if(msg.payload[key] == "1"){
            document.getElementById(val).checked = true
          }
          else{
            document.getElementById(val).checked = false
          }
        }
        else if(val == "abilitazioneiMFM"){
          if(msg.payload[key] == "1"){
            document.getElementById(val).checked = true;
          }
          else{
            document.getElementById(val).checked = false;
          }
        } 
      });
    break;
  
    case "status":
      if(msg.payload == 0){
        document.getElementById('Stop').innerHTML = "Stop";
        document.getElementById('pwrDiv').style.backgroundColor = "#ADD8E6"; 
      }else if(msg.payload == 1){
        document.getElementById('Stop').innerHTML = "Produzione";
        document.getElementById('pwrDiv').style.backgroundColor = "#E84C59"; 

      }else if(msg.payload == 2){
        document.getElementById('Stop').innerHTML = "Standby";
        document.getElementById('pwrDiv').style.backgroundColor = "#E84C59"; 

      }else if(msg.payload == 3){
        document.getElementById('Stop').innerHTML = "Fault";
        document.getElementById('pwrDiv').style.backgroundColor = "#E84C59"; 
      }else if(msg.payload == 4){
        document.getElementById('Stop').innerHTML = "Attendere";
        document.getElementById('pwrDiv').style.backgroundColor = "#FF934A"; 
      }
    break;

    case "PNVparameters":
      iArray_idPNV.forEach(function (val, key){
        document.getElementById(val).value = msg.payload[key];
      });
    break;

    case "mainParameters":
      iArray_idMainPar.forEach(function (val, key){
        document.getElementById(val).innerHTML = msg.payload[key]/10.0 + " bar";
      });
    break;
  }
})

const iArray_id = new Map([
  [0, "tempoAdsorption"],
  [1, "tempoDesorption"],
  [2, "tempoEqualizzazione"],
  [3, "tempoCutoff"],
  [4, "pressioneMaxStandby"],
  [5, "pressioneMinStandby"],
  [6, "pressioneMinAzoto"],
  [7, "primaSogliaAllarmeO2"],
  [8, "secondaSogliaAllarmeO2"],
  [9, "tempoMaxO2elevato"],
  [10, "pressioneMinAria"],
  [11, "primaSogliaMaxUmidità"],
  [12, "secondaSogliaMaxUmidità"],
  [13, "primaSogliaTemperaturaAria"],
  [14, "secondaSogliaTemperaturaAria"],
  [15, "pressioneMaxAriaCompressa"],
  [16, "minRangePortataN2"],
  [17, "maxRangePortataN2"],
  [18, "minRangeUmidità"],
  [19, "maxRangeUmidità"],
  [20, "serial"],
  [21, "portC4Y"],
  [32, "abilitazioneiAQM"],
  [33, "abilitazioneiMFM"],
])

const iArray_idPNV = new Map([
  [0, "pnv01"],
  [2, "pnv02"],
  [4, "pnv03"],
  [6, "pnv04"],
  [8, "pnv05"],
  [10, "pnv06"],
  [12, "pnv07"],
  [14, "pnv08"],
  [16, "pnv09"],
  [18, "pnv10"],
  [20, "pnv11"],
])

const iArray_idMainPar = new Map([
  [0, "airPressure"], 
  [1, "CMS1pressure"], 
  [2, "CMS2pressure"], 
  [3, "nitrogenPressure"], 
])
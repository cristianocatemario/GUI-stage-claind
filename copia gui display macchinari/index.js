var pageIndex = 0;
var nextPage = 1; 
var previousPage;

var s = "tabellaServices";
var w = "tabellaWarnings";
var tabella;

const imgtable =new Map([ //mappa che "collega" l'immagine all'id della pagina da visualizzare
  ["imgBS", "tabellaImpostazioni"], //associo all'immagine della ruota dentata, la pagina delle impostazioni
  ["imgSRVC", "tabellaServices1"],
  ["lblSRVC", "tabellaServices1"], //associo a immagine e lbl di service la prima pagina dei service
  ["imgBack", "tabellaPrincipale"],
  ["imgWrn", "tabellaWarnings1"],
  ["lblWidget1", "tabellaWidgets"],
  ["lblWidget2", "tabellaWidgets"],
  ["lblWidget3", "tabellaWidgets"],
  ["lblWidget4", "tabellaWidgets"],
])

const indextable = new Map([
  ["tabellaPrincipale", 0],
  ["tabellaImpostazioni", 1],
  ["tabellaServices1", 2],
  ["tabellaWarnings1", 3],
  ["tabellaWidgets", 4],
])

function hideAll(){
  document.getElementById('tabellaPrincipale').setAttribute("hidden", "hidden");
  document.getElementById('tabellaImpostazioni').setAttribute("hidden", "hidden");
  document.getElementById('tabellaServices1').setAttribute("hidden", "hidden");
  document.getElementById('tabellaWarnings1').setAttribute("hidden", "hidden");
  document.getElementById('tabellaWidgets').setAttribute("hidden", "hidden");
  document.getElementById('prev').setAttribute("hidden", "hidden");
  document.getElementById('next').setAttribute("hidden", "hidden");
  for (let i = 1; i < 12; i++) { //nascondo tutti i tableServices
    document.getElementById(s + "" + i).setAttribute("hidden", "hidden");
  }

  for (let i = 1; i < 6; i++) { //nascondo tutti i tableWarnings
    document.getElementById(w + "" + i).setAttribute("hidden", "hidden");
  }
}

function changeTitle(nomeProdotto) {
  document.getElementById("intestazioneMonitor").innerHTML = nomeProdotto;
}

function powerButton(tag){
  var source = document.getElementById(tag.id);
  
  if(source.name == "buttonPowerProduction"){ //se rosso
    source.name = "buttonPowerWait"; //arancio
    uibuilder.send({
      'topic': "power",
      'payload': '0' //production
    })
  }
  else if(source.name == "buttonPowerWait"){ //se arancio
    source.name = "buttonPowerStop"; //azzurrino
  }
  else{ //se azzurro
    source.name = "buttonPowerProduction"; //rosso
    uibuilder.send({
      'topic': "power",
      'payload': '1' //stop
    })
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
  else if(pageIndex == 4){ //tabellaWidgets
    document.getElementById('imgBS').src = "Resources/indietro.png"; 
    document.getElementById('imgBS').id = "imgBack";
    
    for (let i = 0; i < 12; i++){ //scorro le celle
      var nameElement = document.getElementById("cellaWidget" + i);
      if(nameElement.abbr == "active"){
        document.getElementById("cellaWidget" + i).style.color = "#00FF00"
      }
    }
  }
}

function setWidgetState(i){
  var widgetScelto = document.getElementById("cellaWidget" + i);
  var widgetAttivo = document.getElementById("lblWidget1"); //adattare anche per lblWidget2,3 e 4

  if(widgetScelto.abbr == "deactive"){ //se al click del widget questo è deactive allora diventerà active e verrà cambiato il colore in verde
    widgetScelto.style.color = "#00FF00"; 
    widgetScelto.abbr = "active";
    
    for (let j = 0; j < 12; j++) { //scorro testo celle
      if(document.getElementById("cellaWidget" + j).innerHTML.includes(widgetScelto.innerHTML)){
        widgetAttivo.innerHTML = widgetScelto.innerHTML;
      }
    }
  }
}


function changePage(component){
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
        else if(val == "minRangeUmidità"){
          if(msg.payload[key] >= 600){ 
            //var minRangeUmidità = msg.payload[key] - 65536; 
            document.getElementById("minRangeUmidità").value = ((65536 - msg.payload[key])/10)*(-1);
          }
          else{
            document.getElementById("minRangeUmidità").value = msg.payload[key]/10;            
          }
        } 
      });
    break;
  
    case "status":
      if(msg.payload == 0){
        document.getElementById('Stop').innerHTML = "Stop";
        document.getElementById('pwrDiv').style.backgroundColor = "#ADD8E6"; //azzurro
        document.getElementById('imgWrn').src = "warning-NB.png";
        document.getElementById('wrnDiv').style.backgroundColor = "#ADD8E6";
      }else if(msg.payload == 1){
        document.getElementById('Stop').innerHTML = "Produzione";
        document.getElementById('pwrDiv').style.backgroundColor = "#E84C59"; //rosso
        document.getElementById('imgWrn').src = "resources_display/wngmt.jpg";
        document.getElementById('wrnDiv').style.backgroundColor = "#FFC406"
      }else if(msg.payload == 2){
        document.getElementById('Stop').innerHTML = "Standby";
        document.getElementById('pwrDiv').style.backgroundColor = "#E84C59"; 
        document.getElementById('imgWrn').src = "resources_display/wngmt.jpg";
        document.getElementById('wrnDiv').style.backgroundColor = "#FFC406"
        
      }else if(msg.payload == 3){
        document.getElementById('Stop').innerHTML = "Fault";
        document.getElementById('pwrDiv').style.backgroundColor = "#E84C59"; 
        document.getElementById('imgWrn').src = "resources_display/wngmt.jpg";
        document.getElementById('wrnDiv').style.backgroundColor = "#FFC406"
      }else if(msg.payload == 4){
        document.getElementById('Stop').innerHTML = "Attendere";
        document.getElementById('pwrDiv').style.backgroundColor = "#FF934A"; //arancione
        document.getElementById('imgWrn').src = "resources_display/wngmt.jpg";
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

    case "alarms":
      //converto il numero da dec a bin
      var bin = msg.payload[0].toString(2).padStart(8, '0');
      
      for (let i = 0; i < alarm_id.size; i++) {
        if((bin >> i)&1){
          document.getElementById(alarm_id.get(i)).checked = true;
        }
        else{
          document.getElementById(alarm_id.get(i)).checked = false;
        }
      }
    break;

    case "warnings":
      //converto il numero da dec a bin
      var bin = msg.payload[0].toString(2).padStart(16, '0');
      
      for (let i = 0; i < warning_id.size; i++) {
        
        if((bin >> i)&1){
          document.getElementById(warning_id.get(i)).checked = true;
        }else{
          document.getElementById(warning_id.get(i)).checked = false;
        }
      }
      break;

    case "maintenance":
      //converto il numero da dec a bin
      var bin = msg.payload[0].toString(2).padStart(8, '0');
      
      for (let i = 0; i < maintenance_id.size; i++) {
        if((bin >> i)&1){
          document.getElementById(maintenance_id.get(i)).checked = true;
        }else{
          document.getElementById(maintenance_id.get(i)).checked = false;
        }
      }
    break;
  }
})

function sendParameters(element){
  var topic; //address modbus
  var valueElement = element.value;

  iArray_id.forEach(function(val, key){
    if(val == element.id){
      topic = key;
    }  
  })
  
  switch (topic) {
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
      valueElement*=10;
    break;
    
    
    case 7:
    case 8:
      valueElement*=100;
    break;  

    case 18: //minRangeUmidità
      if(element.value < 0){ //valore negativo
        var minRangeUmidità = 65536 + (valueElement*10); 
        valueElement = minRangeUmidità;
      }
      else{ //valore positivo
        valueElement*=10;
      }
    break;
  }
  
  uibuilder.send({
    'topic': topic + 50,
    'payload': valueElement,
  })
}



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


const alarm_id = new Map([
  [0, "oxgElevato"],
  [1, "maxPressAriaCompressa"],
  [2, "umiditàElevataAriaCompressa"]
])

const warning_id = new Map([
  [0, "ossigenoElevato2ndSoglia"],
  [1, "ossigenoElevato1stSoglia"],
  [2, "minimaPressioneAzoto"],
  [3, "maxTemperatura"],
  [4, "minimaPressioneAria"],
  [5, "comunicazioneC4Y"],
  [6, "dispNonC4Y"],
  [7, "errConnWiFi"],
  [8, "spegnimentoNonCorretto"],
])

const maintenance_id = new Map([
  [0, "autonomiaSilenziatore"],
  [1, "autonomiaAnalizzatore"],
  [2, "autonomiaSensoreUmidità"],
])
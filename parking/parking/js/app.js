function ConcatenarFechaHora(fecha, hora){
  return fecha+" "+ hora;

}

function calcularTiempoDosFechas(date1, date2){
  entrada = new Date(date1);
  salida = new Date(date2);

  var tiempo = salida - entrada;

  var diffSegundos = tiempo/1000;
  var HH = Math.floor(diffSegundos/3600);
  var MM = Math.floor(diffSegundos%3600)/60;
  var hm=[HH,MM,entrada.getHours(),salida.getHours()];  
  return(hm);
}
function calcularCosto(tipoParqueo,hora,min,entrar,salir){
    var precio=0;
        switch (tipoParqueo) {
          case "cortoPlazo":
              if((hora==4)&&(min>0))
                return("El parqueo solo es para 4 hrs. maximo");     
              else if((hora>4)&&(min>=0))         
                return ("Elija un parqueo de mas horas")
              /*else if(){

              }*/
              else{
                cpm=0.1;
                precio=(hora*60+min)*cpm;
                return precio.toFixed(2);
              break;
              }   
            case "economico":  
                cpm=2;        
                if((hora<4)||(hora>12)  )
                  return ("Elija otro tipo de parqueo"); 
                else if((hora==12)&&(min>0))     
                  return("El parqueo solo permite 12 horas maximo");  
                else if((hora>=4)&&(hora<=12)) {
                  if(min<=30)                          
                      precio=hora*cpm;
                  else
                      precio=(hora*cpm)+cpm; 
                }                
                return precio.toFixed(2);                   
            break;  
            case "estandar":  
                cpm=3;        
                if((hora<4)||(hora>12)  )
                  return ("Elija otro tipo de parqueo"); 
                else if((hora==12)&&(min>0))     
                  return("El parqueo solo permite 12 horas maximo");  
                else if((hora>=4)&&(hora<=12)) {
                  if(min<=30)                          
                      precio=hora*cpm;
                  else
                      precio=(hora*cpm)+cpm; 
                }                
                return precio.toFixed(2);                   
            break;  
            case "largoPlazo":  
                cpm=6;        
                if(hora<12)  
                  return ("Elija otro tipo de parqueo menor a 12 horas"); 
                else if((hora>=12)&&(min>=0)){
                  tiemp=(hora/12).toFixed(0);
                  if((hora%12)==0)                           
                    precio=tiemp*cpm; 
                  else
                    precio=(tiemp*cpm)+cpm;
                                                  
                return precio.toFixed(2);   
              }                
            break;  
            case "nocturno":  
                cpm=5;   
                entrada     
                if((entrar<20)||(salir>8))
                  return ("Elija otro tipo de parqueo durante el dia"); 
                else if((entrar>=20)&&(salir<=8)){                  
                    precio=cpm;
                                                  
                return precio.toFixed(2);   
              }                
            break;    
                                    
          default: 
              return("Elija una opcion de Parqueo");
           }         
    
}

document.getElementById('submit').addEventListener("click", function(){
  var fechaE=document.getElementById('fechaE').value,
      horaE=document.getElementById('horaE').value,
      fechaS=document.getElementById('fechaS').value,
      horaS=document.getElementById('horaS').value;
      tipoP=document.getElementsByTagName('select')[0].value;      
      d1= ConcatenarFechaHora(fechaE,horaE);
      d2= ConcatenarFechaHora(fechaS,horaS);     
      tiempo=calcularTiempoDosFechas(d1,d2);      
      costo=calcularCosto(tipoP,tiempo[0],tiempo[1],tiempo[2],tiempo[3]);
      if((horaE || fechaE)>=(horaS|| fechaS))
      {
        alert("Los datos de entrada deben ser menor a los datos de salida")
        costo=0;
      }
        if(isNaN(costo))
      {
        alert(costo);   
        document.getElementById("costo").value=0;   
      }
            
      else
        document.getElementById("costo").value=costo+" "+"Bs.";   


//************ INICIO TC35MFix asignado a Edgar Gregori *******************
// si descomentar this.fechaAcutal(); y this.horaActual(); no tiene sentido las 3 sgtes lineas, y la ultima que es la llave de cierre if.
	if (tipoP ==="estandar") {
	  fechaActual();
	  horaActual();
	  console.log("fechaE", fechaE);
	  if (!validarFechaEtrada(fechaE)) {
        console.log("la fecha/hora de ingreso debe ser la actual");
        document.getElementById("costo").value=0;
        alert("la fecha/hora de ingreso debe ser la actual");
	  }
	  console.log("horaE", horaE);
	  if (!validarHoraEtrada(horaE)) {
        console.log("la hora de ingreso debe ser igual o mayor a la actual ");
        document.getElementById("costo").value=0;
        alert("la hora de ingreso debe ser igual o mayor a la actual ");
	  }
	}

//************* FIN TC35MFix asignado a Edgar Gregori ***********

})

//***************** INICIO TC35MFix asignado a Edgar Gregori *****************
//document.getElementById('submit').addEventListener("click", function(){
function seleccionTipoParqueo() {
  console.log("evt-onchange");
  tipoP=document.getElementsByTagName('select')[0].value;
  if (tipoP ==="estandar") {
	console.log("estandar");
	this.fechaActual();
	this.horaActual();
  }
}
function fechaActual(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if(dd<10){ dd='0'+dd;}
  if(mm<10){mm='0'+mm;}
    var today =  yyyy +'-' +  mm + '-' + dd;
  document.getElementById("fechaE").value = today;
  return today;
}
//this.fechaActual(); //descomentar si quieren fecha actual para todos parqueos

function horaActual(){
  var today = new Date();
  var hh = today.getHours();
  var min = today.getMinutes();
  if(hh<10){ hh='0'+hh;}
  if(min<10){min='0'+min;}
  var today =  hh +':' +  min ;
  document.getElementById("horaE").value = today;
  console.log(today)
  return today;
}
//this.horaActual();//descomentar si quieren hora actual para todos parqueos

function validarFechaEtrada(fechaEntrada){
  var fechaActual = this.fechaActual();
  console.log("fechaActual", fechaActual)
  if (fechaEntrada < fechaActual) {
	console.log('false');
	return false;
  }
  return true;
}

function validarHoraEtrada(horaEntrada){
  var horaActual = this.horaActual();
  console.log("horaActual", horaActual)
  //if(horaActual<10){ hh='0'+hh;}
  if (horaEntrada < horaActual) {
	console.log('hora-entrada-false');
	return false;
  }
  return true;
}
//****************** FIN TC35MFix asignado a Edgar Gregori ********************

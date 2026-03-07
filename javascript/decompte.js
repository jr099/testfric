function decompte(){
	incrementeSecondes();
	if(sec < 10)
		var sec2 = '0'+sec;
	else
		var sec2 = ''+sec;
	if(min < 10)
		var min2 = '0'+min;
	else
		var min2 = ''+min;
	if(heure < 10)
		var h2 = '0'+heure;
	else
		var h2 = ''+heure;
	document.getElementById('decH').innerHTML = h2;	
	document.getElementById('decM').innerHTML = min2;
	document.getElementById('decS').innerHTML = sec2;
	window.setTimeout("decompte()", 1000);
}

function decomptea(){
	incrementeSecondes();
	if(sec < 10)
		var sec2 = '0'+sec;
	else
		var sec2 = ''+sec;
	if(min < 10)
		var min2 = '0'+min;
	else
		var min2 = ''+min;
	if(heure < 10)
		var h2 = '0'+heure;
	else
		var h2 = ''+heure;
	document.getElementById('decH').innerHTML = h2;	
	document.getElementById('decM').innerHTML = min2;
	document.getElementById('decS').innerHTML = sec2;
	window.setTimeout("decomptea()", 1000);
}

function incrementeSecondes(){
	if(sec == 59){
		sec = 0;
		incrementeMinutes();
	}
	else
		sec++;
}

function incrementeMinutes(){
	if(min == 59){
		min = 0;
		incrementeHeures();
	}
	else
		min++;
}

function incrementeHeures(){
	heure++;
}
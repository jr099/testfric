function decmpte(){
	incrementeSecondesa();
	if(seca < 10)
		var sec2a = '0'+seca;
	else
		var sec2a = ''+seca;
	if(mina < 10)
		var min2a = '0'+mina;
	else
		var min2a = ''+mina;
	if(heurea < 10)
		var h2a = '0'+heurea;
	else
		var h2a = ''+heurea;
	document.getElementById('decHH').innerHTML = h2a;	
	document.getElementById('decMM').innerHTML = min2a;
	document.getElementById('decSS').innerHTML = sec2a;
	window.setTimeout("decmpte()", 1000);
}

function incrementeSecondesa(){
	if(seca == 59){
		seca = 0;
		incrementeMinutesa();
	}
	else
		seca++;
}

function incrementeMinutesa(){
	if(mina == 59){
		mina = 0;
		incrementeHeuresa();
	}
	else
		mina++;
}

function incrementeHeuresa(){
	heurea++;
}
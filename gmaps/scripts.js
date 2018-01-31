function doFunction(){

	// set url and core parameters
	url = "https://maps.googleapis.com/maps/api/staticmap?"
	parameters = [
		"key=AIzaSyA0GvevmQAO0t_08HtYFikKdUS5kzGRkKg",
		"size=400x400",
	]

	// note the colors for the markers
	colors = ["red", "blue", "green"]

	// loop over the text in the boxes and push to parameters
	for(i=0; i<colors.length; i++){
		var markers = "markers=color:"+colors[i]+"|label:"+colors[i][0].toUpperCase()+"|"
		var locs = document.getElementById(colors[i]).value.split("\n").join("|").replace(/\s+/g, '')
		//check that locations are ok
		if(locs.length > 0){

			markers += locs
			console.log(markers)
			parameters.push(markers)

		}
	}

	// join parameters and output to picture
	myapiurl = url + parameters.join("&")
	document.getElementById("mappicture").src = myapiurl
}

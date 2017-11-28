function doFunction(){

	//console.log(data)

	iterations = 0
	iterations_max = 10
	while(getParameters()[0].toString().indexOf("?") > -1 && iterations < iterations_max){
		
		// increase iterations and log
		iterations ++
		console.log("Run #" + iterations)

		// get layout and used numbers
		data = getParameters()[0]
		used = getParameters()[1]

		// get the available numbers for calculations
		left = ["1","2","3","4","5","6","7","8","9"]
		for(i=0;i<used.length;i++){
			left.splice(left.indexOf(used[i]), 1)
		}

		// get the equations
		eqs = makeEquations()

			// resets what is possible in each box
			possible = {
				"A": [[],[]],
				"B": [[],[]],
				"C": [[],[]],
				"D": [[],[]],
				"E": [[],[]],
				"F": [[],[]],
				"G": [[],[]],
				"H": [[],[]],
				"I": [[],[]]
			}

		// loop over all equations
		for(k=0;k<eqs.length;k++){



			// set equation to string
			myEq = eqs[k].toString()
			//console.log("Testing equation: " + myEq)

			if(myEq.match(/.*\?.*\?.*\?.*/)){

				//console.log("Triple ?")
				results = attemptTriple(eqs[k], left)
				pushResults(k, results)

			
			} else if(myEq.match(/.*\?.*\?.*/)){

				//console.log("Double ?")
				results = attemptDouble(eqs[k], left)
				pushResults(k, results)

			} else if (myEq.match(/.*\?.*/)){

				//console.log("Single ?")
				results = attemptSingle(eqs[k], left)
				pushResults(k, results)

			} else {

				//console.log("No ?")
				// pass

			}
		}

		// use possible to fill in values to HTML if only one possible
		for (var index in possible){
			t_poss = intersection_destructive(possible[index][0].unique().sort(), possible[index][1].unique().sort())
			t_poss = t_poss.unique()

			if(t_poss.length == 1 && t_poss[0]){
				//debugger
				// must be value
				reinsert(index, t_poss[0])

			}
		}

		if(getParameters()[0].toString().indexOf("?") > -1){
			//console.log("Failed...")
			document.getElementsByName("output-text")[0].innerHTML = "Solved!"
		} else if (iterations == iterations_max - 1){
			document.getElementsByName("output-text")[0].innerHTML = "Failed..."
		}
	}
}




function reinsert(letter, insertion){

	box = {
		"A": "11",
		"B": "13",
		"C": "15",
		"D": "31",
		"E": "33",
		"F": "35",
		"G": "51",
		"H": "53",
		"I": "55"
	}
	document.getElementsByName(box[letter])[0].value = insertion
}

// finds three-number combinations which fit
function attemptTriple(equ, avail){

	solutions = []
	for(i=0;i<avail.length;i++){
		for(j=0;j<avail.length;j++){
			for(n=0;n<avail.length;n++){

				t_equ = equ.join(",").replace("?",avail[i]).replace("?",avail[j]).replace("?",avail[n]).split(",")
				t_equ = evaluateCombination(t_equ)
				if(t_equ == true && i!=j && i!=n && j!=n){
					solutions.push([avail[i], avail[j], avail[n]])
				}
			}
		}
	} 
	return solutions
}

// finds two-number combinations which fit
function attemptDouble(equ, avail){

	solutions = []
	for(i=0;i<avail.length;i++){
		for(j=0;j<avail.length;j++){

			t_output = ["#", "#", "#"]
			t_pos = equ.indexOf("?")

			t_equ = equ.join(",").replace("?",avail[i]).replace("?",avail[j]).split(",")
			t_equ = evaluateCombination(t_equ)


			if(t_equ == true && i != j){

				t_output[equ.indexOf("?")/2] = avail[i]
				t_output[equ.join(",").replace("?","#").split(",").indexOf("?")/2] = avail[j]
				solutions.push(t_output)
			}
		}
	}
	return solutions
}

// returns the last number needed in an equation
function attemptSingle(equ, avail){

	for(i=0;i<avail.length;i++){

		t_equ = equ.join(",").replace("?", avail[i]).split(",")
		t_output = ["#", "#", "#"]
		if(evaluateCombination(t_equ) == true){
			t_output[equ.join("").indexOf("?")/2] = avail[i]
			return [t_output]
		}
	} 
}

// define the six equations
function makeEquations(){
	equations = []
	//get across ones
	for(i=0; i<6; i+=2){
		equations.push(data[i])
	}

	//get down ones
	for(i=0; i<6; i+=2){
		temp = []
		for(j=0; j<6; j++){
			temp.push(data[j][i])
		}
		equations.push(temp)
	}
	return equations
}

// gets numbers from the html
// takes from the html, don't edit
function getParameters(){
	//create array of numbers used already
	used = []
	//create an array of arrays and loop over all lines
	numbers = []
	for(i=1;i<7;i++){
		//get one-line array and loop over all columns
		line = []
		for(j=1;j<7;j++){

			try{
				//try to get value from box and put into array
				grab = document.getElementsByName(i.toString()+j.toString())[0].value
				if(grab == ""){
					grab = "?"
				}

				line.push(grab)
				if(grab.match(/[0-9]{1}/) && i<6 && j<6){
					used.push(grab)
				}
			} catch(err){
				line.push("#")
			}
		}
		numbers.push(line)
	}
	return [numbers, used]
}

// checks to see if the numbers work
// accepts an array of length 6
function evaluateCombination (input){
	real = "((" + input[0] + input[1] + input[2] + ")" + input[3] + input[4] + ")-" + input[5]
	real = eval(real.replace("--", "+"))
	if(real == 0){
		return true
	} else {
		return false
	}
}

// returns the alphabetic index of the number
function getPosition(equ, index){

	array = {

		"11": "A",
		"12": "B",
		"13": "C",
		"21": "D",
		"22": "E",
		"23": "F",
		"31": "G",
		"32": "H",
		"33": "I",
		"41": "A",
		"42": "D",
		"43": "G",
		"51": "B",
		"52": "E",
		"53": "H",
		"61": "C",
		"62": "F",
		"63": "I"
	}

	return array[equ.toString() + index.toString()]
}

// pushes results into possible array
function pushResults(equ, results){
	for(p=0; p<results.length; p++){
		for(q=0;q<3;q++){
			if(results[p][q] != "#"){
				//console.log("p: " + p.toString() + " q: " + q.toString() + " equ: " + equ.toString())
				if(equ<3){
					possible[getPosition(equ+1, q+1)][0].push(results[p][q])
				} else {
					possible[getPosition(equ+1, q+1)][1].push(results[p][q])
				}
			}
		}
	}
}

// creates function to get unique values from array
Array.prototype.unique = function(){
	var n = []; 
	for(var i = 0; i < this.length; i++) 
	{
		if (n.indexOf(this[i]) == -1) n.push(this[i]);
	}
	return n;
}


// gets intersection of two arrays
function intersection_destructive(a, b){
  var result = [];
  while( a.length > 0 && b.length > 0 )
  {  
     if      (a[0] < b[0] ){ a.shift(); }
     else if (a[0] > b[0] ){ b.shift(); }
     else /* they're equal */
     {
       result.push(a.shift());
       b.shift();
     }
  }

  return result;
}
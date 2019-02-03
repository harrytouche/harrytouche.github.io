
function init(){
    var halt = 0
    playerNames = []
    playerScores = []


    // get names until no more
    while (!halt){

        var newName = prompt("Who's playing? Add a new name or leave blank if that's all!")

        if(newName){
            playerNames.push(newName)
            playerScores.push([])
        } else {
            halt = 1
        }
    }


    // hide start button
    $("#start-button").hide()


    // show total board
    $("#total-board").show()


    // add names to cards and total board
    for(var i=0; i<playerNames.length; i++){

        // total scores
        $("#total-scores > tbody").append("<tr><td class='mdl-data-table__cell--non-numeric'>"+playerNames[i]+"</td><td class='player-totals player-"+i+"-total'>0</td><td><input data-player="+i+" type=number onkeyup='inputEnter(event, this)'></input></td></tr")


        // individual scorecards
        $("#scoreboard").append(
          '<div class="mdl-cell mdl-card mdl-cell--4-col mdl-shadow--2dp">\
            <div class="mdl-card__title">\
              <h2 class="mdl-card__title-text">'+playerNames[i]+'</h2>\
            </div>\
            <div class="mdl-card__supporting-text">\
              <p id="player-'+i+'-split"></p>\
            </div>\
          </div>'
        )
    }


}


function inputEnter(e, element) {
    if (e.keyCode === 13) {
        addNumber(Number(element.dataset.player),Number(element.value))
        element.value=""

        if(element.dataset.player == playerNames.length - 1){
            $("input[data-player=0]").focus()
        } else {
            $("input[data-player="+(Number(element.dataset.player)+1)+"]").focus()
        }
    }
}










function addNumber(personID, number){

    // add to card at bottom
    playerScores[personID].push(number)
    $("#player-"+personID+"-split").html(playerScores[personID].join(", "))


    // calculate new total
    var thisPlayerTotal =  playerScores[personID].reduce(add, 0)

    // put new total in
    $(".player-"+personID+"-total").html(thisPlayerTotal)


    // sort table at top
    sortTable()


}



// for use in reduce function on array
function add(a, b) {
    return a + b;
}




function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("total-scores");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[1];
      y = rows[i + 1].getElementsByTagName("td")[1];
      // Check if the two rows should switch place:
      if (Number(x.innerHTML) < Number(y.innerHTML)){
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
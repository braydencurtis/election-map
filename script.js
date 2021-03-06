var makePolitician = function(name, color){
    var politician = {};
    politician.name = name;
    politician.electionResults = null;
    politician.totalVotes = 0;
    politician.stateColor = color;

    // politician.announcePolitician = function() {
    //     console.log(this.name + " got " + this.totalVotes + " votes!.");
    // }

    // politician.announcePolitician();

    // Add up total votes for politician object
    politician.tallyUpResults = function() {
    this.totalVotes = 0;

    for(var i = 0; i < this.electionResults.length; i++) {
        this.totalVotes = this.totalVotes + this.electionResults[i];
    }
}

    return politician;
};
// Create Bernie Sanders object
var bernie = makePolitician("Bernie Sanders", [102, 217, 255]);
// Create Joe Biden Object
var joe = makePolitician("Joe Biden", [0, 0, 255]);

// Add vote totals to both candidates
bernie.electionResults = [5,1,7,2,33,6,4,2,1,14,8,3,1,11,11,0,5,3,3,3,7,4,8,9,3,7,2,2,4,2,8,3,15,15,2,12,0,4,13,1,3,2,8,21,3,2,11,1,3,7,2];
joe.electionResults = [4,2,4,4,22,3,3,1,2,15,8,1,3,9,0,6,1,5,5,1,3,7,8,1,3,3,1,3,2,2,6,2,14,0,1,6,7,3,7,3,6,1,3,17,3,1,2,11,2,3,1];

//Update Florida counts
bernie.electionResults[9] = 1;
joe.electionResults[9] = 28;

//Update California counts
bernie.electionResults[4] = 17;
joe.electionResults[4] = 38;

//Update Texas counts
bernie.electionResults[43] = 11;
joe.electionResults[43] = 27;

// Determine winner of individual state
var setStateResults = function(state) {
    theStates[state].winner = null;
    if (bernie.electionResults[state] > joe.electionResults[state]) {
        theStates[state].winner = bernie;
    } else if (joe.electionResults[state] > bernie.electionResults[state]) {
        theStates[state].winner = joe;
    }

    var stateWinner = theStates[state].winner;

    // Assign state color to winner
    if (stateWinner !== null) {
        theStates[state].rgbColor = stateWinner.stateColor;
    } else {
        theStates[state].rgbColor = [11,32,57];
    }

    //Connect stateInfoTable table to Javascript
    var stateInfoTable = document.getElementById("stateResults");
    var header = stateInfoTable.children[0];
    var body = stateInfoTable.children[1];
    var stateName = header.children[0].children[0];
    var stateAbbv = header.children[0].children[1];
    var cand1Name = body.children[0].children[0];
    var cand1Results = body.children[0].children[1];
    var cand2Name = body.children[1].children[0];
    var cand2Results = body.children[1].children[1];
    var winnersName = body.children[2].children[1];

    //Replace text in stateResults table
    stateName.innerText = theStates[state].nameFull;
    stateAbbv.innerText = theStates[state].nameAbbrev;
    cand1Name.innerText = bernie.name;
    cand1Results.innerText = bernie.electionResults[state];
    cand2Name.innerText = joe.name;
    cand2Results.innerText = joe.electionResults[state];
    winnersName.innerText = stateWinner.name;
    



}


//Tally up results for both candidates
bernie.tallyUpResults();
joe.tallyUpResults();

// Determine winner
var winner = "";
if (bernie.totalVotes > joe.totalVotes) {
    winner = bernie.name;
} else if (bernie.totalVotes < joe.totalVotes) {
    winner = joe.name;
} else {
    winner = "Draw";
};

// Announce winner, unless it's a tie
if (winner == "Draw") {
    console.log("It's a tie! Time for a recount!");
} else {
    console.log("And the winner is... " + winner + "!");
}

//Connect countryResults table to JavaScript
var countryResults = document.getElementById("countryResults");

//Replace table values with election results
countryResults.children[0].children[0].children[0].innerText = bernie.name;
countryResults.children[0].children[0].children[1].innerText = bernie.totalVotes;
countryResults.children[0].children[0].children[2].innerText = joe.name;
countryResults.children[0].children[0].children[3].innerText = joe.totalVotes;
countryResults.children[0].children[0].children[5].innerText = winner;


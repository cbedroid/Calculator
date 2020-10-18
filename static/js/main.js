var old_color;
// capture button previous css state 
// changes button's bgcolor onhover 

// capture mouseenter and mouseleave
// changes button to its default css state on mouse leave


function results(num){
  // display results
  return $('#results').html(num).html();
}

function history(num){
  // display history
  return $('#history').html(num).html();
}

function updateResults(num){
  $('#results').append(num);
}

function updateHistory(num){
  $('#history').append(num);
}


function operatorList(){
  //return the operator values into a list(Array)
 return $('.operator').map(function(){
      return $(this).val();
  }).get();
}


function removeLast(chars){
  // removes the last character from results
  var screen =  results();
  results(screen.substr(0,screen.length-1));
}

function clear(mode,prevclick){
  //map the C and CE buttons 
  var screen =  results();
  var hist =  history();
  var prev = screen.substr(-1);

  // remove all characters from results
  if (mode === 'c'){
    $('#results').html('');
    $('#history').html('');
    return true;
  } 

  // remove the last character from results
  // if last click was an operator
  else if (mode === 'ce'){
    if (prevclick !== '='){
      results(screen.substr(0,screen.length-1));
      history(hist.substr(0,hist.length-1));
    }
    return true;
  }
  return false;
}


var lastclick;
var error;
function checkClick(){
  // check click for operator or numbers
  
  //check operators
  $('button').click(function(){
    var lastchar = history().substr(-1);
    var clicked = this.value

    try{
      if (clicked === "") return;
      else if (error){
        // reset display on errors
        results('');
        history('');
        error = false;
      }
      // if starting character is an operator 
      //  and it is called before a number
      if ((operatorList().indexOf(clicked) != -1) &&
          (lastchar===false)){
          return false;
      } 
      //"check for CE or C" to clear screen
      else if (clear(clicked,lastclick)){
        return true;
      }
      
      //check for equal sign
      else if (this.value == '='){
        lastclick=clicked; 
       return results(eval(results()));
      }
      
      //Check for operator changes
      // operator "IS" the last character and another operator is called
      // then replace the operator with current one
      else if ((operatorList().indexOf(lastchar) != -1) && 
          (operatorList().indexOf(clicked) != -1)){
          if (results() !==""){
          removeLast();
          
        };
      }

        // Show the history and results to user
        updateResults(clicked);
        updateHistory($(this).html());
        lastclick = clicked;
    }
    catch{
      // display error msg to user
      results('ERROR');
      error = true;  
    }
  })//button click
}


// Run main functions
checkClick();


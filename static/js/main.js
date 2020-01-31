var old_color;
// capture button previous css state 
// changes button's bgcolor onhover 
function getDefaultState(){
   $('button').mouseenter(function(){
      old_color = $(this).css('background');
       $(this).css({'background':'red'}) ;
});
}

// capture mouseenter and mouseleave
// changes button to its default css state on mouse leave
function mouse_movement(){
  getDefaultState();
  $('button').mouseleave(function(){
       $(this).css({'background':old_color}) ;
  });
}


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
  //return the operator values into a list
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
  if (mode == 'c'){
    // remove all characters from results
    $('#results').html('');
    $('#history').html('');
    return true;
  } 
  else if (mode == 'ce'){
    if (prevclick != '='){
    // remove the last character from results
      // if last click was an operator
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
    // if starting character is an operator and it 
    //  is called before a number
    try{
      if (clicked == "") return;
      else if (error == true){
        results('');
        history('');
        error = false;
      }
      if ((operatorList().indexOf(clicked) != -1) &&
          (lastchar==false)){
          return false;
      } 
      //"CE or C" clear screen
      else if (clear(clicked,lastclick)){
        return true;
      }
      
      //check for equal sign
      else if (this.value == '='){
        lastclick=clicked; 
       return results(eval(results()));
      }
      
      //Check for operator changes
      else if ((operatorList().indexOf(lastchar) != -1) && 
          (operatorList().indexOf(clicked) != -1)){
        // operator "IS" the last character
          // replace the operator with another one
        if (results() !=""){
          removeLast();
          
        };
      }
         
        updateResults(clicked);
        updateHistory($(this).html());

        lastclick = clicked;
    }
    catch{
      results('ERROR');
      error = true;  
    }

  })//button click
}



// change home.html gamers border to green if player is online
mouse_movement();
checkClick();


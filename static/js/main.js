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
  //return the operator class into a list
 return $('.operator').map(function(){
      return $(this).val();
  }).get();
}


function removeLast(chars){
  var screen =  results();
  results(screen.substr(0,screen.length-1));
}

function clear(mode,lastchar){
  var screen =  results();
  var hist =  history();
  if (mode == 'c'){
    // remove all charcters from results
    $('#results').html('');
    $('#history').html('');
    return true;
  } 
  else if (mode =='ce'){
    // remove the last character from results
    results(screen.substr(0,screen.length-1));
    alert(lastchar);
    if (lastchar == "="){
      $('#history').html('');
    }
    else{
      history(screen.substr(0,hist.length-1));
    }
    return true;
  }
  return false;
}

function checkClick(){
  // check click for operator or numbers
  
  //check operators
  $('button').click(function(){
    var lastchar = results().substr(-1);
    var clicked = this.value
     
    // if starting character is an operator and it 
    //  is called before a number
    if ((operatorList().indexOf(clicked) != -1) &&
        (lastchar==false)){
        return false;
    } 
    //"CE or C" clear screen
    else if (clear(clicked,lastchar)){
      return true;
    }
    
    //check for equal sign
    else if (this.value == '='){
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
      updateHistory(clicked);

  })//button click
}




var old_color;
//mouse enter or hover 
function button_enter(){
   $('button').mouseenter(function(){
      old_color = $(this).css('background');
       $(this).css({'background':'red'}) ;
});

}
//
// mouse leave button
function button_leave(){
  button_enter();
  $('button').mouseleave(function(){
       $(this).css({'background':old_color}) ;
  });
}

// change home.html gamers border to green if player is online
button_leave();
checkClick();
//linkButton();


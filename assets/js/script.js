//set pointers to used the html tags and classes
var divtag = document.querySelector('.middleside');
var newh1 = document.createElement('h1');
var newp1 = document.createElement('p');
var newp2 = document.createElement('p');
var newp3 = document.createElement('p');
var startbuttom= document.createElement('button');

//set pointer to timer location on html with some initial variable to start the code
var timeEl = document.querySelector("span");
var secondsLeft = 60 ;

var count=0;
var score=0;
var index=1;
var storedata;

//set some button with attribute and each one has diffirent thing to do on the webpage
var result = document.createElement("h3");
result.setAttribute("name","result");
var clearbn= document.createElement("button");
clearbn.setAttribute("name","clearbn");
var goback= document.createElement("button");
goback.setAttribute("name","goback");
var divtag2 = document.querySelector('.middleside');

var hscore = document.querySelector("#highscore");

var textinit = document.createElement("input");



// set an array for question, multiple choice and answer
var question = ['Commonly used data types DO Not include:',
                'The condition in an if / else statment is enclosed with __________.',
                'Array in JavaScript can be used to store',
                'String values must be enclosed within _____ when being assigned to variables.',
                'A very useful tool used during development and debugging for printing content to the debugging is:'];


var multichoicques=['1.string','2.booleans','3.alerts','4.numbers',
                    '1.quotes','2.curly brackets','3.parenthesis','4.square brackets',
                    '1.numbers and strings','2.other arrays','3.booleans','4.all of the above',
                    '1.commas','2.curly brackets','3.quotes','4.parenthesis',
                    '1.JavaScript','2.terminal/bash','3.for loops','4.console.log'];

var rightanswer = ['3.alerts','2.curly brackets','4.all of the above','3.quotes','4.console.log'];


//starting setup first starting page with start-button to start the quiz 
newh1.textContent= "Coding Quiz Challenge";
newp1.textContent= "Try to answer the following code-related question within the time limit.";
newp2.textContent= "Keep in mind that incorrect answers will penalize your score/time";
newp3.textContent= "by ten seconds!"; 
startbuttom.textContent= "Start Quiz";
startbuttom.setAttribute("name","start");


divtag.appendChild(newh1);
divtag.appendChild(newp1);
divtag.appendChild(newp2);
divtag.appendChild(newp3);
divtag.appendChild(startbuttom);

var submitb = document.createElement("button");
submitb.setAttribute("name","end");


//start quiz button and it work to start the time then remove the last page and create the first question  
startbuttom.addEventListener("click", function() {
    setTime();
    removeoldquestion();
    createques();
});


//set time function for starting time for quiz
function setTime() {
    //Sets interval in variable
    var timerInterval = setInterval(function() {
     secondsLeft--;
     timeEl.textContent = secondsLeft;
 
     if(secondsLeft == 0) {
      finalscore();
      clearInterval(timerInterval);
        
     }
 
   }, 1000);
 }


//answer the muliple choice question
 divtag.addEventListener("click", function(event){
    var element = event.target;


    if(element.matches("button")===true && element.getAttribute('name') != "start" && element.getAttribute('name') != "end")
    {
        if(element.getAttribute("name") == rightanswer[count])
        {
            result.textContent="Correct!";
        }
        else
        {

            secondsLeft = secondsLeft-10;
            result.textContent="Wrong!";
        }
       
          result.style="font-size: 20px; font-style: italic";
          divtag.appendChild(result);
        
        if(count < question.length-1)
        {
            setTime2();
        }
        else
        {
          finalscore();
        }

    }

  });


//remove old page and build new one
function removeoldquestion()
{
    while (divtag.firstChild) 
    {
      divtag.removeChild(divtag.lastChild);
    }
}


//auto create question 
function createques()
{
   
    document.querySelector(".middleside").style = "text-align: left;";
    newh1.textContent = question[count];
    newh1.style = "font-size: 30px; font-weight: bold;";
    divtag.appendChild(newh1);
 
    for( var i=count*4;i<(count*4)+4;i++)
    {
       var jbutton = document.createElement('button');
       jbutton.textContent=multichoicques[i];
       jbutton.setAttribute("name",multichoicques[i])
       jbutton.style="text-align: left;";
       divtag.appendChild(jbutton);

       var br=document.createElement("br")
       divtag.appendChild(br);
    }

    var line= document.createElement("hr");
    line.style ="border-bottom: 1px solid black; margin-top: 20px;";
    divtag.appendChild(line);

  
}


//show final score for each try 
function finalscore()
{
  removeoldquestion();
  var alldone= document.createElement("h1");
  var finalresult= document.createElement("p");
  var initial = document.createElement("label");
  var line= document.createElement("hr");
  alldone.textContent = "All done!";


   if(secondsLeft != 0)
   {
      score=secondsLeft;
      finalresult.textContent = "Your final score is " + score;
      secondsLeft=1;
   }
   else
   {
      finalresult.textContent = "Your final score is " + score; 
   }

  initial.textContent="Enter initials:";
  submitb.textContent="Submit";

  initial.style = "font-size: 20px;";
  textinit.style = "font-size: 20px; margin-right: 30px";
  submitb.style = "width: 100px; height: 40px; padding: 0;";
  line.style ="border-bottom: 1px solid black; margin-top: 20px";

  initial.setAttribute("for","initial");
  textinit.setAttribute("id","initial");
  divtag.appendChild(alldone);
  divtag.appendChild(finalresult);
  divtag.appendChild(initial);
  divtag.appendChild(textinit);
  divtag.appendChild(submitb);
  divtag.appendChild(line);
}


//submit the score and save it in localstorage
submitb.addEventListener("click", function(){
  highscorepage();
});


//this is for high score page 
function highscorepage()
{

  while(JSON.parse(localStorage.getItem("index"+index))!== null)
  {
     index++;
  }


  if(textinit.value.length == 2 && textinit.value != "")
  {
    storedata = index +". "+ textinit.value + " - " + score;
    localStorage.setItem("index"+ index,JSON.stringify(storedata));
    textinit.value="";
  }
  else if(textinit.value.length > 1 && textinit.value != "")
  {
    alert("please insert two characters for initial name");
    textinit.value = "";
    return;
    
    
  }
  

    removeoldquestion();

   var highscoretext = document.createElement("h1");
   
   highscoretext.textContent = "High Scores";
   highscoretext.style="font-size: 30px;";
   divtag2.appendChild(highscoretext);

   for(var i=1;i<=index;i++)
   {
       var para= document.createElement("p");
       para.textContent = JSON.parse(localStorage.getItem("index"+ i)) ;
       para.style ="background-color: rgb(212, 180, 117); font-size: 25px; margin-bottom: 5px;";
       divtag2.appendChild(para);
   }
   
   goback.textContent="Go Back";
   goback.style = "width: 150px; height: 60px; padding: 0; margin-right: 20px;";
   divtag2.appendChild(goback);

   clearbn.textContent="Clear High Scores";
   clearbn.style = "width: 200px; height: 60px; padding: 0;";
   divtag2.appendChild(clearbn); 
   
}


//second time to wait half second to show if the answer corect or not 
function setTime2() {
  //Sets interval in variable
  var timerResult = setInterval(function() {
    removeoldquestion();
    count++;
    createques();
    clearInterval(timerResult);

 }, 500);
}


//the view high score link at the corner on the page 
hscore.addEventListener("click",function(){
  document.querySelector(".middleside").style = "text-align: left;";
  highscorepage();

  var line= document.createElement("hr");
  line.style = "margin-top: 20px;"
  divtag2.appendChild(line); 
  var msg= document.createElement("h3");
  msg.textContent="No High score Record";
  msg.style="font-size: 20px; font-style: italic";
  divtag2.appendChild(msg);
  
});


//button for goback to start new try and other one to reset high score
divtag2.addEventListener("click", function(event){
  var element = event.target;

  if(element.matches("button")===true && element.getAttribute('name') === "goback")
  {
    window.location.reload();

    if(JSON.parse(localStorage.getItem("index"+ 1)) === null)
    {
      var line= document.createElement("hr");
      divtag2.appendChild(line);
      result.textContent="No High score Data";
      result.style="font-size: 20px; font-style: italic";
      divtag2.appendChild(result);
    } 
  }
  else if(element.matches("button")===true && element.getAttribute('name') === "clearbn")
  {
    window.localStorage.clear();
    index=1;
    if(JSON.parse(localStorage.getItem("index"+ 1)) === null )
    {
       highscorepage();
       var line= document.createElement("hr");
       line.style = "margin-top: 20px;"
       divtag2.appendChild(line); 
       var msg= document.createElement("h3");
       msg.textContent="No High score Record";
       msg.style="font-size: 20px; font-style: italic";
       divtag2.appendChild(msg);
    }
  }
});

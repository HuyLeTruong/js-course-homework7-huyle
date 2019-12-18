// Import stylesheets
import './style.css';




var questionController = (function(){
  // 1. Data structure

  var questionType = function(questID,questText,answerSet,correctAnswerID) {
    
    this.question =  {
      id : questID,
      text : questText
    };
    this.answerSet = {
      answers : answerSet,
      correctAnswerId : correctAnswerID,
    }
  }

  // 2. Static data
  var questionList = [];
  questionList.push(new questionType(0,'What is the biggest country in the world?',['China','Russia','United States','England'],1));
  questionList.push(new questionType(1,'What is the populated country in the world?',['China','Russia','United States','England','India'],0));
  questionList.push(new questionType(2,'What is the highest GDP country in the world?',['Japan','China','Russia','United States','England','Sinapore'],3));  
  questionList.push(new questionType(3,'What is the richest country in the world?',['Brunei','Japan','China','Russia','United States','Qatar','Sinapore'],5));  
  questionList.push(new questionType(4,'Which Country Has the Most Islands?',['Malaysia','Sweden','Japan','Philippines','Indonesia','Finland '],1));  
  
  var displayQuestionById = function(questID)
    {      
      var displayText = ' Question '+ (questID+1) + ': '+ questionList[questID].question.text + '\n';
      for(var i = 1; i <= questionList[questID].answerSet.answers.length;i++)
      {
        displayText+= i+'. '+ questionList[questID].answerSet.answers[i-1]+'\n';
      }
      console.log(displayText);
      return {
        answerLength:questionList[questID].answerSet.answers.length,
        questionId: questID,
        
         }
    },
    var getQuestionById = function(questID)
    {
      return {
        
          quest: questionList[questID].question,
          answers: questionList[questID].answerSet.answers
        
      }
    }

  return {
    // Add a question
    addNewQuestion : function()
    {
        var newId = questionList.length;
        var questText = prompt('Input the question','');
        var answerText = prompt('Input the answers','Answers are separated by comma');
        var answerArr = answerText.split(',');
        var correctAnswerID = prompt('Input the correct answer ID',0);

        var a = new questionType(newId,questText,answerArr,correctAnswerID);
        console.log(a);

        questionList.push(new questionType(newId,questText,answerArr,correctAnswerID))


    },
    // Check answer
    checkAnswer : function(questID,answerID)
    {      
      if((answerID-1) === questionList[questID].answerSet.correctAnswerId)
      {
        console.log('Your answer is ' + questionList[questID].answerSet.answers[answerID-1]+ ' - Correct!!!');
        return true;
      }
      else{
        console.log('Your answer is ' + questionList[questID].answerSet.answers[answerID-1]+ ' - Not correct !!!')
        return false;
      }
    },

    // Display Random question   
    getRandomQuestion: function()
    {
        var questID = Math.floor(Math.random() * questionList.length);       displayQuestionById(questID) 
        var a = getQuestionById(questID);
        
        return getQuestionById(questID);
    },

    // Display all question in Database
    getAllQuestion: function()
    {
      for(var i = 0; i < questionList.length;i++)
          displayQuestionById(i);
    },

    // Return the number of questions in Database
    getQuestionLength: function(){
      return questionList.length;
    },
    
  }
})();

var actionController = (function(){  
  var domInput = {
    selectAnswer:"btn-answer",
    questionText:"question-title",
    questionContainer:"question-container",
    correctAnswer:'col-5 btn btn-success btn-answer',  
    incorrectAnswer:'col-5 btn btn-danger btn-answer',
    buttonNext: 'btn-next'
  }
  var displayQuestionUI = function(questObj)
  {    
    var htmlQuest= "<div class='question-containter' id='question-%questID%'> <div class='question-title'>  <h5 ><span class='badge badge-info'>%questText%</span></h5></div><div class='answersSet'> %htmlAnswer%</div>"
    var htmlAnswer = "<button class='col-5 btn btn-light btn-answer' style='text-align:left' type='button' id='answer-%questID%-%answerID%' >%answerText%</buttons> "

    var tempAnswerHtml ='';

    if(questObj !== undefined && questObj !== {})
    {
      for(var i = 0;i<questObj.answers.length;i++)
      {
       var tempHTML = htmlAnswer+'';
       tempHTML=tempHTML.replace('%questID%',questObj.quest.id).replace('%answerID%',i+1).replace('%answerText%',(i+1)+'. '+questObj.answers[i]);
       tempAnswerHtml +=tempHTML;
      }

      htmlQuest=htmlQuest.replace('%questID%',questObj.quest.id).replace('%questText%',questObj.quest.id+1 + '. '+questObj.quest.text).replace('%htmlAnswer%',tempAnswerHtml);
      
      
    }
    // document.getElementById(domInput.questionContainer).insertAdjacentHTML('beforeend', htmlQuest);
    document.getElementById(domInput.questionContainer).innerHTML=(htmlQuest);
  }



  // 1. Select answer
  return{
    selectAnswer: function(answerLength){
      var input = 1;
      do{
        input = prompt('Please select your answer for this question',0);
      }while(input <= 0 || input > answerLength);
      
      return input;
    },
    displayQuestionUI : function(questObj)
    {
      return displayQuestionUI(questObj);
    },
    domInput
  }
})();

var controller = (function(questCtr,actCtr){

  var checkAnswer = function(answerObject)
  {
    var answerID = answerObject.id;
    var id = answerID.replace("answer-",'')
    id = id.split('-');    
    
    if(questCtr.checkAnswer(id[0],id[1]) === true)
    {
     document.getElementById(answerID).className = actCtr.domInput.correctAnswer;
     document.getElementById(answerID).disabled = true;
     
    }else{
      document.getElementById(answerID).className = actCtr.domInput.incorrectAnswer;
      document.getElementById(answerID).disabled = true;
    };    
  }

  var setupEventListeners =  function(){
    document.getElementById('btn-next').addEventListener('click',function(){
      var q = questCtr.getRandomQuestion();
    
    actCtr.displayQuestionUI(q);
    setupEventListeners();
    })   
      var DOM = document.getElementsByClassName("btn-answer");
      Array.prototype.forEach.call(DOM, function(dom) {
        dom.addEventListener('click',function(){
            checkAnswer(dom)
            
        })
      });

    }

    
return{
  init:function(){    
    console.log('Application has started - We have '+questCtr.getQuestionLength()+' questions in Database');
    console.log('Geting a random question..................');
    
    var q = questCtr.getRandomQuestion();
    
    actCtr.displayQuestionUI(q);
    setupEventListeners();
    //var a = actCtr.selectAnswer();
    
    //setTimeout(questionController.checkAnswer(q.questionId,a), 1000000);
    //questionController.checkAnswer(q.questionId,actCtr.selectAnswer())
    //console.log(actCtr.selectAnswer());
    //questCtr.addNewQuestion();
    //questCtr.getAllQuestion();
  }
}
})(questionController,actionController);

controller.init();
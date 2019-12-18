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
        questionId: questID}
    },

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
      }
      else{
        console.log('Your answer is ' + questionList[questID].answerSet.answers[answerID-1]+ ' - Not correct !!!')
      }
    },

    // Display Random question   
    getRandomQuestion: function()
    {
        var questID = Math.floor(Math.random() * questionList.length);        
        return displayQuestionById(questID);
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
  // 1. Select answer
  return{
    selectAnswer: function(answerLength){
      var input = 1;
      do{
        input = prompt('Please select your answer for this question',0);
      }while(input <= 0 || input > answerLength);
      
      return input;
    },
  }
})();

var controller = (function(questCtr,actCtr){

  var checkAnswer = function(answerObject)
  {
    var answerID = answerObject.id;
    answerID = answerID.replace("answer-",'')
    answerID = answerID.split('-');    
    questCtr.checkAnswer(answerID[0],answerID[1]);    
  }

  var setupEventListeners =  function(){   
      var DOM = document.getElementsByClassName("btn-answer");
      Array.prototype.forEach.call(DOM, function(dom) {
        dom.addEventListener('click',function(){
          console.log(checkAnswer(dom))
        })
      });

    }

    
return{
  init:function(){    
    console.log('Application has started - We have '+questCtr.getQuestionLength()+' questions in Database');
    console.log('Geting a random question..................');
    setupEventListeners();
    var q = questCtr.getRandomQuestion();
    
    
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
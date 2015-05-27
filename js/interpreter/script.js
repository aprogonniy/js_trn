/**
 * Interpreter pattern implementation.
 * @author oprohonnyi@gmail.com
 * @license Apache-2.0
 */

/*
 * Constants.
 */
var HELLO_RUS = "Привет",
	HELLO_ENG = "Hi",
	HELLO_ESP = "Hola",
	ANSWER_RUS = "Чем я могу Вам помочь?",
	ANSWER_ENG = "How can I help you?",
	ANSWER_ESP = "Cómo puedo ayudarle?";

/*
 * Context structure.
 */
var Context = function(input) {
    this._input = input;
    this._output = null;

    this.getInput = function() {
    	return this._input;
    };
    
    this.setInput = function(input) {
    	this._input = input;
    };
    
    this.getOutput = function() {
    	return this._output;
    };
    
    this.setOutput = function(output) {
    	this._output = output;
    };
};

/*
 * Expression abstract class.
 */
var Expression = function() {
    this.interpret = function(context) {
    	var input = context.getInput(),
    		firstWord = input.substr(0, input.indexOf(' '));
    	
    	this.answerToUser(firstWord, context);
    };
    
    this.answerToUser = function(appeal) {
    	
    };
};

/*
 * Concrete expression classes.
 */
var RussianExpression = function() {
    this.answerToUser = function(appeal, context) {
    	if(appeal === HELLO_RUS) {
    		context.setOutput(ANSWER_RUS);
    	}
    };
};

RussianExpression.prototype = new Expression();

var EnglishExpression = function() {
    this.answerToUser = function(appeal, context) {
    	if(appeal === HELLO_ENG) {
    		context.setOutput(ANSWER_ENG);
    	}
    };
};

EnglishExpression.prototype = new Expression();

var SpanishExpression = function() {
    this.answerToUser = function(appeal, context) {
    	if(appeal === HELLO_ESP) {
    		context.setOutput(ANSWER_ESP);
    	}
    };
};

SpanishExpression.prototype = new Expression();



/*
 * Using
 */
var context = new Context("Привет Siri!");
console.log("< " + context.getInput());

var expressionsList = [];
expressionsList.push(new RussianExpression());
expressionsList.push(new EnglishExpression());
expressionsList.push(new SpanishExpression());

for(var i = 0; i < expressionsList.length; i++) {
	expressionsList[i].interpret(context);
}

console.log("> " + context.getOutput());
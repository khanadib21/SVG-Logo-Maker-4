const filesystem = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require("inquirer");
const {MyCircle, MySquare, MyTriangle} = require("./package/allshapes");
class Svg{
	constructor(){
		this.shapeElement = ''
			this.textElement = ''
	}
	render(){
		return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
	}
	setSvgTextElement(text,color){
		this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
	}
	setSvgShapeElement(shape){
		this.shapeElement = shape.render()
	}
}

const questions = [
    {
        type: "input",
        message: "TEXT:max 3 Characters:",
        name: "text",
    },
    {
        type: "input",
        message: "ENTER TEXT COLOR keyword OR a hexadecimal number:",
        name: "text-color",
    },
    {
        type: "input",
        message: "ENTER SHAPE COLOR keyword OR a hexadecimal number:",
        name: "shape",
    },
    {
        type: "list",
        message: "Choose which type of shape you would like?",
        name: "pixel-image",
        choices: ["Square", "Circle", "Triangle"],
    },
];

function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congratulations, you have Generated a logo.svg!");
    });
}

async function initialize() {
	var svgString = "";
	var svg_file = "createdLogo.svg";

	const inputAnswers = await inquirer.prompt(questions);

	var user_text = "";
	if (inputAnswers.text.length > 0 && inputAnswers.text.length < 4) {
		user_text = inputAnswers.text;
	} else {
		alert("less then 4 characters")
		return;
	}

	font_color = inputAnswers["text-color"];
	shape_color = inputAnswers.shape;
	shape_type = inputAnswers["pixel-image"];

	let user_shape;
	if (shape_type === "Square" || shape_type === "square") {
		user_shape = new MySquare();
		console.log("selected Square shape");
	}
	else if (shape_type === "Circle" || shape_type === "circle") {
		user_shape = new MyCircle();
		console.log("selected Circle shape");
	}
	else if (shape_type === "Triangle" || shape_type === "triangle") {
		user_shape = new MyTriangle();
		console.log("selected Triangle shape");
	}
	else {
		console.log("Invalid shape!");
	}
	user_shape.setColor(shape_color);

	var svg = new Svg();
	svg.setSvgTextElement(user_text, font_color);
	svg.setSvgShapeElement(user_shape);
	svgString = svg.render();
	
	writeToFile(svg_file, svgString); 
}
initialize()
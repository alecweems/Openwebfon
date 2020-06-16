const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];

const EmployeeQuestions = [


    {
        type: "input",
        name: "employeeName",
        message: "What is your name?"

    },

    {
        type: "input",
        name: "employeeId",
        message: "What is your ID?"

    },

    {
        type: "input",
        name: "employeeEmail",
        message: "What is your email?"

    }];

const ManagerQuestions = [{
    type: "input",
    name: "managerName",
    message: "What is your name?"

},

{
    type: "input",
    name: "managerId",
    message: "What is your ID?"

},

{
    type: "input",
    name: "managerEmail",
    message: "What is your email?"

},
{
    type: "input",
    name: "managerOfficeNumber",
    message: "What is your office number?"

}];
const teamMembers = [
    {
        type: "list",
        name: "teamMembers",
        choices: ["Engineer", "Intern", "Done"]
    }
];
const EngineerQuestions = [
    {
        type: "input",
        name: "engineerName",
        message: "What is your name?"

    },

    {
        type: "input",
        name: "engineerId",
        message: "What is your ID?"

    },

    {
        type: "input",
        name: "engineerEmail",
        message: "What is your email?"

    },
    {
        type: "input",
        name: "engineerGitHub",
        message: "What is your github?"

    }];

const InternQuestions = [
    {
        type: "input",
        name: "internName",
        message: "What is your name?"

    }, {
        type: "input",
        name: "internId",
        message: "What is your ID?"

    }, {
        type: "input",
        name: "internEmail",
        message: "What is your email?"

    }, {
        type: "input",
        name: "internSchool",
        message: "What school/university did you attend?"

    }
];

function createManager() {
    inquirer.prompt(ManagerQuestions).then(function (response) {
        const e = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);
        employees.push(e);
        createTeam();
    });
}
function createIntern() {
    inquirer.prompt(InternQuestions).then(function (response) {
        const e = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
        employees.push(e);
        createTeam();
    });
}
function createEngineer() {
    inquirer.prompt(EngineerQuestions).then(function (response) {
        const e = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGitHub);
        employees.push(e);
        createTeam();
    });
}
function print() {
const e = render(employees)
fs.writeFile(outputPath,e, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
}


function createTeam() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which team member would you like to add?",
                choices: ["Engineer", "Manager", "Intern", "No More"],
                name: "userPrompt"
            },
        ])
        .then(function (response) {
            console.log(response)
            if (response.userPrompt === "Manager") {
                createManager();
            } else if(response.userPrompt === "Intern"){
                createIntern();
            } else if(response.userPrompt === "Engineer"){
                createEngineer();
            }
            else {
                print();
            }
            // else if intern run createintern
            // else if engineer run createengineer
            // else call render function and output to output folder
        });
}

createTeam();
//ask user whish team member to add


//if manager, use manager variable


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

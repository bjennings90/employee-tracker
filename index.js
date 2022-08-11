const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('./config/mysql');
const addadepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'enter a department name'
        }
    ])
    .then ((answers) => {
        connection.query(`insert into department (name) values ("${answers.name}")`, (err) => {
            if(err) {
                console.error(err);
            }
            getinitialquestions();
        })
    })
}
const getinitialquestions = () => inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
        }
    ])
    .then((answers) => {
        if (answers.choice === "view all departments") {
            connection.query("select * from department", (err, departments) => {
                if (!err) {
                    console.log(cTable.getTable(departments))
                } else {
                    console.error(err)
                }
                getinitialquestions()
            })
        } else if (answers.choice === "view all roles") {
            connection.query("select * from role", (err, roles) => {
                if (!err) {
                    console.log(cTable.getTable(roles))
                } else {
                    console.error(err)
                }
                getinitialquestions()
            })
        } else if (answers.choice === "view all employees") {
            connection.query("select * from employee", (err, employees) => {
                if (!err) {
                    console.log(cTable.getTable(employees))
                } else {
                    console.error(err)
                }
                getinitialquestions()
            })
        } else if (answers.choice === "add a department") {
            addadepartment();
        }
        // Use user feedback for... whatever!!
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });

    getinitialquestions();

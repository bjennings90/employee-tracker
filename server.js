const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('./config/mysql');
const addemployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the employees last name?'
        }
    ])
    .then ((answers) => {
        connection.query(`insert into employee (first_name) values ("${answers.first_name}")`, (err) => {
            if(err) {
                console.error(err);
            }
            getinitialquestions();
        })
    })
    .then ((answers) => {
        connection.query(`insert into employee (last_name) values ("${answers.last_name}")`, (err) => {
            if(err) {
                console.error(err);
            }
            getinitialquestions();
        })
    })
}
const addrole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter a Role'
        }
    ])
    .then ((answers) => {
        connection.query(`insert into role (title) values ("${answers.title}")`, (err) => {
            if(err) {
                console.error(err);
            }
            getinitialquestions();
        })
    })
}
const adddepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter a Department Name'
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
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles","Add Role", "View All Departments", "Add Department" ]
        }
    ])
    .then((answers) => {
        if (answers.choice === "View All Employees") {
            connection.query("select * from employee", (err, employees) => {
                if (!err) {
                    console.log(cTable.getTable(employees))
                } else {
                    console.error(err)
                }
                getinitialquestions()
            })
        } else if (answers.choice === "Add Employee") {
            addemployee();
        } else if (answers.choice === "Update Employee Role") {
            connection.query("select * from role", (err, roles) => {
                if (!err) {
                    console.log(cTable.getTable(roles))
                } else {
                    console.error(err)
                }
                getinitialquestions()
            })
        } else if (answers.choice === "View All Roles") {
            connection.query("select * from role", (err, roles) => {
                if (!err) {
                    console.log(cTable.getTable(roles))
                } else {
                    console.error(err)
                }
                getinitialquestions()
            })
        } else if (answers.choice === "Add Role") {
            addrole();
        } else if (answers.choice === "View All Departments") {
            connection.query("select * from department", (err, departments) => {
                if (!err) {
                    console.log(cTable.getTable(departments))
                } else {
                    console.error(err)
                }
                getinitialquestions()
            })
        } else if (answers.choice === "Add Department") {
            adddepartment();
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

const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('./config/mysql');
const addemployee = async () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'Whats the employees role?',
            choices: getRoles()
        }
    ])
    .then((a) => {
        console.log(a);
        const query = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`

        connection.query(query, [a.first_name, a.last_name], (req, res) => {
            console.log('added new employee')
        })
        getinitialquestions();
    
    })
}
const getRoles = () => {
    const query = `SELECT title FROM role`
    const name = connection.query(query)
    return name.map(name => name.title);
    console.log(name)
}
const addrole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter a Role'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is their salary?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is their salary?'
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

const cTable = require('console.table');
const inquirer = require('inquirer');
const connection = require('./config/mysql');
const addemployee = () => {
    getRoles((roles) => {
    getEmployees((managers) => {
    
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
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: 'What is the manager id?',
            choices: managers
        }
    ])
    .then((a) => {
        console.log(a);
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`

        connection.query(query, [a.first_name, a.last_name, a.role, a.manager], (req, res) => {
            console.log('added new employee')
            getinitialquestions();
        })
    
    })
})
})
}
const getEmployees = (cb) => {
    const query = `SELECT id AS value, first_name, last_name FROM employee`
    connection.query(query, (err, data) => {
                if (err) throw err;

    const managers = data.map(({ first_name, last_name, value }) => ({ name: `${first_name} ${last_name}`, value }));
     cb(managers)
    })
}
const getDepartment = (cb) => {
    const query = `SELECT id AS value, name FROM department`
    connection.query(query, (err, data) => {
                if (err) throw err;
     cb(data)
    })
}
const getRoles = (cb) => {
    const query = `SELECT role.id, role.title FROM role`
    connection.query(query, (err, data) => {
                if (err) throw err;

    const roles = data.map(({ id, title }) => ({ name: title, value: id }));
     cb(roles)
    })
}
const addrole = () => {
    getDepartment(department => {
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
            type: 'list',
            name: 'department',
            message: 'What is their department?',
            choices: department
        }
    ])
    .then ((answers) => {
        connection.query(`insert into role (title, salary, department_id) values ("${answers.title}", "${answers.salary}", ${answers.department})`, (err) => {
            if(err) {
                console.error(err);
            }
            getinitialquestions();
        })
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
const updateEmployeeRole = () => {
    getRoles((roles) => {
        getEmployees((employees) => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select an Employee',
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select a Role',
            choices: roles
        }
    ])
    .then ((answers) => {
        connection.query(`update employee set role_id = ? WHERE id = ?`, [answers.role, answers.employee], (err) => {
            if(err) {
                console.error(err);
            }
            getinitialquestions();
        })
    })
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
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles","Add Role", "View All Departments", "Add Department", "Quit"]
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
            updateEmployeeRole();
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
        process.exit(0);
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

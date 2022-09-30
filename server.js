const express = require("express");
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Birdie135",
    database: "employee_db"
  });

  connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    prompt();
});

  function prompt() {
    inquirer.prompt([{
        type: "list",
        message: "What option would you like to select?",
        name: "choice",
        choices: [
            "View all employees",
            "View all roles",
            "View all departments",
            "Add an employee",
            "Add a role",
            "Add a department",
            "Update an employee"
        ]
  }
]).then(function(val){
    switch(val.choice){
        
        case "View all employees":
            viewAllEmployees();
        break;

        case "View all roles":
            viewAllRoles();
        break;

        case "View all departments":
            viewAllDepartments();
        break;

        case "Add an employee":
            addAnEmployee();
        break;

        case "Add a role":
            addRole();
        break;

        case "Add a department":
            addDepartment();
        break;

        case "Update an employee":
            updateEmployee();
        break;
    }
})
}


function viewAllEmployees(){
    connection.query("SELECT employee.frist_name, employee.last_name, roles.title, roles.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function(err, res){
        if(err) throw err
        console.table(res)
        prompt()
    })
}

function viewAllRoles(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function(err, res){
        if(err) throw err
        console.table(res)
        prompt()
    })
}

function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      prompt()
    })
  }

  function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          prompt()
      })

  })
}

function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
  
          } 
      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  prompt();
              }
          )
  
      });
    });
    }

    function addDepartment() { 

        inquirer.prompt([
            {
              name: "name",
              type: "input",
              message: "What Department would you like to add?"
            }
        ]).then(function(res) {
            var query = connection.query(
                "INSERT INTO department SET ? ",
                {
                  name: res.name
                
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    prompt();
                }
            )
        })
      }
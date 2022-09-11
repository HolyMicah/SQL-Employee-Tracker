const express = reuire("express");
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
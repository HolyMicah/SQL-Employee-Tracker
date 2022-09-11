INSERT INTO departments(depratment_name)
VALUES ("Engineering"),
       ("Security"),
       ("Accounting"),
       ("Legal"),
       ("Marketing");

INSERT INTO roles(title, salary, department_id)
VALUES ("Frontend Engineer", 95000, 1),
       ("Backend Engineer", 110000, 1),
       ("Fullstack Developer", 120000, 1),
       ("Security Engineer", 100000, 2),
       ("Accountant", 90000, 3),
       ("Lawyer", 200000, 4),
       ("Marketing Analyst", 75000, 5),
       ("Marketing Coordinator", 90000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Morgan", "Freeman", 1, null),
       ("Edris", "Elbra", 2, null),
       ("Margot", "Robbie", 3, null)

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
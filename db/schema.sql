DROP DATABASE IF EXISTS employee_tracker_app_db;


CREATE DATABASE employee_tracker_app_db;


USE employee_tracker_app_db;


CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40)
 );

 CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(40),
    salary DECIMAL,
    department_id INT NOT NULL
 );

 CREATE TABLE employee (
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    role_id INT NOT NULL,
    manager_id INT
 );

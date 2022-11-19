DROP DATABASE IF EXISTS employee_tracker_app_db;

-- creates employee_traker_app_db database --
CREATE DATABASE employee_tracker_app_db;

-- uses the employee_traker_app_db --
USE employee_tracker_app_db;

-- creates department table inside of employee_traker_app_db --
CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40)
 );
-- creates role table inside of employee_traker_app_db --
 CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(40),
    salary DECIMAL,
    department_id INT NOT NULL
 );
-- creates emploee table inside of employee_traker_app_db --
 CREATE TABLE employee (
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    role_id INT NOT NULL,
    manager_id INT
 );

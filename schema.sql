DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;
USE cms_db;
CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    name VARCHAR(30) NOT NULL
);
CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);
CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(3O) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);

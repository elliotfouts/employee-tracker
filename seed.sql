USE cms_db;
INSERT INTO department
    (name)
VALUES
    ("software"),
    ("hardware"),
    ("sales"),
    ("accounting");
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("software engineer", 100000, 1),
    ("tech lead", 150000, 1),
    ("machine learning engineer", 200000, 1),
    ("computer engineer", 80000, 2),
    ("IT specialist", 60000, 2),
    ("salesman", 100000, 3),
    ("sales lead", 150000, 3),
    ("accountant", 40000, 4),
    ("secretary", 50000, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("james", "mills", 1, null),
    ("mason", "west", 1, 1),
    ("julian", "sanchez", 2, 1),
    ("elliot", "fouts", 1, 1);
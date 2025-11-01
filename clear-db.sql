-- Clear database script
-- Run this if you want to start fresh with the database

USE employee_management;

-- Clear all tables
DELETE FROM calendar_events;
DELETE FROM users;
DELETE FROM employees;
DELETE FROM departments;

-- Reset auto-increment counters
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE employees AUTO_INCREMENT = 1;
ALTER TABLE departments AUTO_INCREMENT = 1;
ALTER TABLE calendar_events AUTO_INCREMENT = 1;

-- Show current state
SELECT 'Users count:' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Employees count:', COUNT(*) FROM employees
UNION ALL
SELECT 'Departments count:', COUNT(*) FROM departments
UNION ALL
SELECT 'Calendar events count:', COUNT(*) FROM calendar_events;

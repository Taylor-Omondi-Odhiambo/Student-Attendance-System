CREATE DATABASE Project;
DROP DATABASE Project;

CREATE TABLE Classes (
ClassID VARCHAR(50) PRIMARY KEY,
Teacher VARCHAR(255),
Students INT DEFAULT 0
);

CREATE TABLE Teachers (
Teacher VARCHAR(255),
ClassID VARCHAR(50) PRIMARY KEY,
Students INT DEFAULT 0
);

CREATE TABLE Students (
StudentID VARCHAR(255) PRIMARY KEY,
FirstName VARCHAR(255),
Surname VARCHAR(255),
NoOfClasses INT DEFAULT 0
);

DROP TABLE classes;
DROP TABLE Teachers;
DROP TABLE csc229;
DROP TABLE p151427942021;
DROP TABLE mastertayloromondi;
DROP TABLE Students;

SELECT * FROM P151427942021;
SELECT * FROM csc229;
SELECT * FROM csc227;
SELECT * FROM csc228;
SELECT * FROM classes;
SELECT * FROM Teachers;
SELECT * FROM students;
DELETE h311450062022 FROM classes;

CREATE TABLE IF NOT EXISTS P151427942021 (ClassID VARCHAR(50) PRIMARY KEY, StudentID VARCHAR(50) GENERATED ALWAYS AS("P151427942021"), FirstName VARCHAR(50) GENERATED ALWAYS AS("Taylor"), Surname VARCHAR(50) GENERATED ALWAYS AS("Odhiambo"), Teacher VARCHAR(50), Attended INT DEFAULT 0, TotalClasses INT DEFAULT 0);
INSERT INTO P151427942021 (ClassID,Teacher) VALUES ("CSC229", (SELECT Teacher FROM classes WHERE ClassID = "csc229"));
INSERT INTO P151427942021 (ClassID, Teacher) VALUES (CSC229, (SELECT Teacher FROM classes WHERE ClassID = "CSC229"));

CREATE DATABASE Project;


DROP TABLE Users
-- DROP TABLE Project
-- DROP TABLE Comment

CREATE TABLE Users(
    username VARCHAR(64),
    name VARCHAR(64),
    PRIMARY KEY (username)
)

INSERT INTO Users
VALUES('lucasb', 'Lucas Bowker')
INSERT INTO Users
VALUES('lucasb1', 'Lucas Bowker1')
INSERT INTO Users
VALUES('lucasb2', 'Lucas Bowker2')
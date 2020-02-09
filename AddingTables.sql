DROP PROCEDURE AddUsers
DROP PROCEDURE AddProject
DROP PROCEDURE AddComment
DROP PROCEDURE AddTagProjects
DROP PROCEDURE AddTagUser
DROP PROCEDURE AddProjectUser
DROP PROCEDURE GetComments

DROP TABLE ProjectUsers
DROP TABLE TagUsers
DROP TABLE TagProjects
DROP TABLE Comment
DROP TABLE Project
DROP TABLE Users

CREATE TABLE Users(
    username VARCHAR(64),
    name VARCHAR(64),
    picture_url VARCHAR(128),
    PRIMARY KEY (username)
)

CREATE TABLE Project(
	pid INT NOT NULL IDENTITY PRIMARY KEY,
	pname VARCHAR(64),
	majortag VARCHAR(32),
	short_desc VARCHAR(128),
	description VARCHAR(512),
	logo_url VARCHAR(128),
	external_url VARCHAR(2048),
	owner VARCHAR(64),
	ownerStars INT,
	FOREIGN KEY (owner) REFERENCES Users(username)
)

CREATE TABLE Comment(
	cid INT NOT NULL IDENTITY PRIMARY KEY,
	pid INT,
	username VARCHAR(64),
	dateCreated date DEFAULT GETDATE(),
    commentText VARCHAR(512),
	FOREIGN KEY (username) REFERENCES Users(username),
	FOREIGN KEY (pid) REFERENCES Project(pid)
)

CREATE TABLE TagProjects(
    tname VARCHAR(32),
    pid INT,
    PRIMARY KEY (tname, pid),
    FOREIGN KEY (pid) REFERENCES Project(pid)
)

CREATE TABLE TagUsers(
    tname VARCHAR(32),
    username VARCHAR(64),
    PRIMARY KEY (tname, username),
    FOREIGN KEY (username) REFERENCES Users(username)
)

CREATE TABLE ProjectUsers(
	username VARCHAR(64),
	pid INT,
	star BIT,
	PRIMARY KEY (username, pid),
	FOREIGN KEY (username) REFERENCES Users(username),
	FOREIGN KEY (pid) REFERENCES Project(pid)
)

GO
CREATE PROCEDURE AddUsers
	@username VARCHAR(64),
    @name VARCHAR(64),
    @picture_url VARCHAR(128)
AS
BEGIN
	INSERT INTO Users(username, name, picture_url)
	VALUES(@username, @name, @picture_url)
END

GO
CREATE PROCEDURE AddProject
	@pname VARCHAR(64),
	@majortag VARCHAR(32),
	@short_desc VARCHAR(128),
	@description VARCHAR(512),
	@logo_url VARCHAR(128),
	@external_url VARCHAR(2048),
	@owner VARCHAR(64),
	@ownerStars INT
AS
BEGIN
	INSERT INTO Project(pname, majortag, short_desc, description, logo_url, external_url, owner, ownerStars)
	VALUES(@pname, @majortag, @short_desc, @description, @logo_url, @external_url, @owner, @ownerStars)
END

GO
CREATE PROCEDURE AddComment
	@pid INT,
	@username VARCHAR(64),
    @commentText VARCHAR(256)
AS
BEGIN
	INSERT INTO Comment(pid, username, commentText)
	VALUES(@pid, @username, @commentText)
END

GO
CREATE PROCEDURE AddTagProjects
	@tname VARCHAR(32),
    @pid INT
AS
BEGIN
	INSERT INTO TagProjects(tname, pid)
	VALUES(@tname, @pid)
END

GO
CREATE PROCEDURE AddTagUser
	@tname VARCHAR(32),
    @username VARCHAR(64)
AS
BEGIN
	INSERT INTO TagUsers(tname, username)
	VALUES(@tname, @username)
END

GO
CREATE PROCEDURE AddProjectUser
    @username VARCHAR(64),
	@pid INT,
	@star BIT
AS
BEGIN
    INSERT INTO ProjectUsers(username, pid, star)
    VALUES(@username, @pid, @star)
END

GO
CREATE PROCEDURE GetComments
    @pid INT
AS
BEGIN
    SELECT dateCreated, username, commentText
    FROM Comment
    WHERE pid = @pid
    ORDER BY dateCreated
END

GO
CREATE PROCEDURE GetProjectBrief
	@pid INT
AS
BEGIN
	SELECT pname, short_desc


-- EXEC AddUsers @username = 'LucasB', @name = 'Lucas Bowker', @picture_url = NULL
-- EXEC AddUsers @username = 'JobV', @name = 'Job Villamil', @picture_url = NULL
-- EXEC AddUsers @username = 'GrantS', @name = 'Grant Swalwell', @picture_url = NULL

-- EXEC AddProject @pname = 'Dungeon-Note', @short_desc = 'an app for dungeon masters for tabletop rpg games', @description = 'an app for dungeon masters for tabletop rpg games!', @logo_url = 'NONE', @external_url = 'https://github.com/ulysses-io/Dungeon-Note', @owner = 'LucasB', @ownerStars = '5'

-- EXEC AddComment @pid = 1, @username = 'LucasB', @commentText = 'Lucas finds himself to be a lovely individual.'

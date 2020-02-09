DROP PROCEDURE AddUsers
DROP PROCEDURE AddProject
DROP PROCEDURE AddComment
DROP PROCEDURE AddTagProjects
DROP PROCEDURE AddTagUser
DROP PROCEDURE AddProjectUser
DROP PROCEDURE GetComments
DROP PROCEDURE GetProjectBrief
DROP PROCEDURE GetUserHeartsForProject
DROP PROCEDURE GetProjectTags

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
	userHearts INT,
	PRIMARY KEY (username, pid),
	FOREIGN KEY (username) REFERENCES Users(username),
	FOREIGN KEY (pid) REFERENCES Project(pid)
)
-------------------------------------------------------------

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
	@star BIT,
	@userHearts INT
AS
BEGIN
    INSERT INTO ProjectUsers(username, pid, star, userHearts)
    VALUES(@username, @pid, @star, @userHearts)
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
	@username VARCHAR(64)
AS
BEGIN
	SELECT Project.pid, Project.pname, Project.majortag, Project.short_desc, Project.logo_url, ProjectUsers.star
	FROM Project
	INNER JOIN ProjectUsers ON Project.pid = ProjectUsers.pid
	WHERE ProjectUsers.username = @username
END

GO
CREATE PROCEDURE GetUserHeartsForProject
	@pid INT
AS
BEGIN
	SELECT userHearts
	FROM ProjectUsers
	WHERE pid = @pid
END


GO
CREATE PROCEDURE GetProjectTags
	@pid INT
AS
BEGIN
	SELECT tname
	FROM TagProjects
	WHERE pid = @pid
END



-- EXEC AddUsers @username = 'LucasB', @name = 'Lucas Bowker', @picture_url = 'joe.jpeg'
-- EXEC AddUsers @username = 'JobV', @name = 'Job Villamil', @picture_url = 'elliot.jpeg'
-- EXEC AddUsers @username = 'GrantS', @name = 'Grant Swalwell', @picture_url = 'stevie.jpeg'
-- EXEC AddUsers @username = 'AlanL', @name = 'Alan Lee', @picture_url = 'ade.jpeg' 
-- EXEC AddUsers @username = 'EmilyK', @name = 'Emily Knox', @picture_url = 'veronika.jpeg'
-- EXEC AddUsers @username = 'JohnB', @name = 'John Brown', @picture_url = 'christian.jpeg'
-- EXEC AddUsers @username = 'AlexK', @name = 'Alex Klap', @picture_url = 'jenny.jpeg'
-- EXEC AddUsers @username = 'MeganB', @name = 'Megan Bird', @picture_url = 'zoe.jpeg'
-- EXEC AddUsers @username = 'BettyC', @name = 'Betty Crocker', @picture_url = 'nan.jpeg' 
-- EXEC AddUsers @username = 'EricaK', @name = 'Erica Klang', @picture_url = 'matthew.jpeg' 
-- EXEC AddUsers @username = 'MicaN', @name = 'Mica Nielsen', @picture_url = 'molly.jpeg' 



-- EXEC AddComment @pid = 1, @username = 'LucasB', @commentText = 'I like developing this application.'
-- EXEC AddComment @pid = 1, @username = 'EmilyK', @commentText = 'Do you need any c++ developers for this app?'
-- EXEC AddComment @pid = 1, @username = 'LucasB', @commentText = 'No! Look at the tags!'

-- EXEC AddTagProjects @tname = 'Web Frontend', @pid = 1
-- EXEC AddTagProjects @tname = 'UI', @pid = 1
-- EXEC AddTagProjects @tname = 'Javascript', @pid = 2
-- EXEC AddTagProjects @tname = 'React', @pid = 2
-- EXEC AddTagProjects @tname = 'Python', @pid = 3
-- EXEC AddTagProjects @tname = 'Elixer', @pid = 3
-- EXEC AddTagProjects @tname = 'Web Frontend', @pid = 4
-- EXEC AddTagProjects @tname = 'Python', @pid = 4
-- EXEC AddTagProjects @tname = 'Tensorflow', @pid = 5
-- EXEC AddTagProjects @tname = 'Anaconda', @pid = 5
-- EXEC AddTagProjects @tname = 'Research', @pid = 6
-- EXEC AddTagProjects @tname = 'Python', @pid = 6
-- EXEC AddTagProjects @tname = 'CLI', @pid = 7
-- EXEC AddTagProjects @tname = 'Web Frontend', @pid = 7
-- EXEC AddTagProjects @tname = 'Python', @pid = 8
-- EXEC AddTagProjects @tname = 'Web API', @pid = 8
-- EXEC AddTagProjects @tname = 'Web API', @pid = 9
-- EXEC AddTagProjects @tname = 'Javascript', @pid = 9
-- EXEC AddTagProjects @tname = 'Electron', @pid = 10
-- EXEC AddTagProjects @tname = 'Flux', @pid = 10
-- EXEC AddTagProjects @tname = 'Javascript', @pid = 11
-- EXEC AddTagProjects @tname = 'Scientfic', @pid = 11
-- EXEC AddTagProjects @tname = 'Javascript', @pid = 12
-- EXEC AddTagProjects @tname = 'Node.js', @pid = 12
-- EXEC AddTagProjects @tname = 'Game Engine', @pid = 13
-- EXEC AddTagProjects @tname = 'Multiplatform', @pid = 13
-- EXEC AddTagProjects @tname = 'Docker', @pid = 14
-- EXEC AddTagProjects @tname = 'Container', @pid = 14
-- EXEC AddTagProjects @tname = 'Kotlin', @pid = 15
-- EXEC AddTagProjects @tname = 'Toolkit', @pid = 15
-- EXEC AddTagProjects @tname = 'Rust', @pid = 16
-- EXEC AddTagProjects @tname = 'Browser', @pid = 16
-- EXEC AddTagProjects @tname = 'IDE', @pid = 17
-- EXEC AddTagProjects @tname = 'Javascript', @pid = 17
-- EXEC AddTagProjects @tname = 'Python', @pid = 18
-- EXEC AddTagProjects @tname = 'Python', @pid = 18
-- EXEC AddTagProjects @tname = 'Internationalization', @pid = 19
-- EXEC AddTagProjects @tname = 'Web Server', @pid = 19
-- EXEC AddTagProjects @tname = 'Docker', @pid = 20
-- EXEC AddTagProjects @tname = 'Wrapper', @pid = 20

EXEC AddProjectUser @username = 'MeganB', @pid = 1, @star = 1, @userHearts = 2
EXEC AddProjectUser @username = 'BettyC', @pid = 1, @star = 1, @userHearts = 3
EXEC AddProjectUser @username = 'LucasB', @pid = 1, @star = 1, @userHearts = 1

EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1

EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1

EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1

EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1

EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1

EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1
EXEC AddProjectUser @username = '', @pid = , @star = , @userHearts = 1

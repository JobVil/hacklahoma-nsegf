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
	description VARCHAR(2048),
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
	@description VARCHAR(2048),
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
AS
BEGIN
	SELECT pid, pname, majortag, short_desc, logo_url
	FROM Project
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

-- EXEC AddProject @pname='Falcon', @majortag='API', @short_desc='high performance web api in python', @description='Falcon is a reliable high-performance Python web framework for building large-scale app backends and microservices. It encourages the REST architectural style and tries to do as little as possible while remaining highly effective. Falcon apps work with any WSGI server, and run like a champ under CPython 3.5+ and PyPy 3.5+', @logo_url='images\api.png', @external_url='https://falconframework.org/', @owner='LucasB', @ownerStars=1
-- EXEC AddProject @pname='http-prompt', @majortag='Front End Web Dev', @short_desc='a command line http client', @description='HTTP Prompt is an interactive command-line HTTP client featuring autocomplete and syntax highlighting built on HTTPie and prompt_toolkit.', @logo_url='images\desktop.jpg', @external_url='https://github.com/eliangcs/http-prompt', @owner='JobV', @ownerStars=1
-- EXEC AddProject @pname='Nylas Mail', @majortag='Back End Web Dev', @short_desc='the open source extensible mail chat', @description='Nylas Mail was an open-source mail client built on the modern web with Electron React and Flux. It was designed to be easy to extend and many third-party plugins are available that add functionality to the client.Nylas Mail was initially released and open-sourced in early 2015 and was maintained by Nylas until Spring 2017.', @logo_url='images\back end.jpg', @external_url='https://github.com/nylas/nylas-mail', @owner='GrantS', @ownerStars=4
-- EXEC AddProject @pname='Dunegon-Note', @majortag='Front End Web Dev', @short_desc='an app for dungeon masters for tabletop rpg games', @description='', @logo_url='images\desktop.jpg', @external_url='https://github.com/ulysses-io/Dungeon-Note', @owner='JobV', @ownerStars=3
-- EXEC AddProject @pname='Cartography', @majortag='Front End Web Dev', @short_desc='a source for fantasy maps', @description='', @logo_url='images\desktop.jpg', @external_url='https://github.com/ulysses-io/Cartography', @owner='GrantS', @ownerStars=4
-- EXEC AddProject @pname='Alchemist', @majortag='Desktop', @short_desc='an integration platform in python', @description='', @logo_url='images\front end.jpg', @external_url='https://github.com/tonini/alchemist.el', @owner='AlanL', @ownerStars=1
-- EXEC AddProject @pname='Pelican', @majortag='Front End Web Dev', @short_desc='a static site generator in python', @description='', @logo_url='images\desktop.jpg', @external_url='https://github.com/getpelican/pelican', @owner='EmilyK', @ownerStars=2
-- EXEC AddProject @pname='Tensorflow', @majortag='API', @short_desc='a machine learning platform by google', @description='', @logo_url='images\api.png', @external_url='https://github.com/tensorflow/tensorflow', @owner='JobV', @ownerStars=3
-- EXEC AddProject @pname='Magenta', @majortag='Research', @short_desc='music and art generation with machine learning', @description='', @logo_url='images\research.png', @external_url='https://github.com/tensorflow/magenta', @owner='LucasB', @ownerStars=4
-- EXEC AddProject @pname='Chart.js', @majortag='Front End Web Dev', @short_desc='simply html5 charts using the <canvas> tag', @description='', @logo_url='images\desktop.jpg', @external_url='https://github.com/chartjs/Chart.js', @owner='EmilyK', @ownerStars=5
-- EXEC AddProject @pname='Sigma.js', @majortag='Front End Web Dev', @short_desc='A JavaScript library dedicated to graph drawing', @description='', @logo_url='images\front end.jpg', @external_url='https://github.com/jacomyal/sigma.js', @owner='LucasB', @ownerStars=1
-- EXEC AddProject @pname='Async', @majortag='Back End Web Dev', @short_desc='a utility for asynchronous javascript', @description='', @logo_url='images\back end.jpg', @external_url='https://github.com/caolan/async', @owner='AlanL', @ownerStars=2
-- EXEC AddProject @pname='Godot', @majortag='Desktop', @short_desc='multi platform 2d and 3d game engine', @description='', @logo_url='images\desktop.jpg', @external_url='https://github.com/godotengine/godot', @owner='EmilyK', @ownerStars=1
-- EXEC AddProject @pname='Moby', @majortag='Desktop', @short_desc='Moby is an open-source project created by Docker to enable and accelerate software containerization', @description='a collaborative project for the container ecosystem to assemble container-based systems', @logo_url='images\desktop.jpg', @external_url='https://mobyproject.org/', @owner='GrantS', @ownerStars=5
-- EXEC AddProject @pname='Hexagon', @majortag='API', @short_desc='Hexagon is a microservices toolkit written in Kotlin.', @description='', @logo_url='images\api.png', @external_url='https://github.com/hexagonkt/hexagon', @owner='JobV', @ownerStars=4
-- EXEC AddProject @pname='Servo', @majortag='Back End Web Dev', @short_desc='the servo browser engine', @description='', @logo_url='images\back end.jpg', @external_url='https://github.com/servo/servo', @owner='GrantS', @ownerStars=5
-- EXEC AddProject @pname='VS Code', @majortag='Desktop', @short_desc='Visual Studio Code', @description='', @logo_url='images\front end.jpg', @external_url='https://github.com/microsoft/vscode', @owner='EmilyK', @ownerStars=5
-- EXEC AddProject @pname='Babel', @majortag='Desktop', @short_desc='the python internationalization library', @description='', @logo_url='images\front end.jpg', @external_url='https://github.com/python-babel/babel', @owner='AlanL', @ownerStars=5
-- EXEC AddProject @pname='Woo', @majortag='Back End Web Dev', @short_desc='A fast non-blocking HTTP server on top of libev', @description='', @logo_url='images\desktop.jpg', @external_url='https://github.com/fukamachi/woo', @owner='JobV', @ownerStars=5
-- EXEC AddProject @pname='Compose', @majortag='Back End Web Dev', @short_desc='Define and run multi-container applications with Docker', @description='', @logo_url='images\desktop.jpg', @external_url='https://github.com/docker/compose', @owner='LucasB', @ownerStars=5


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

-- EXEC AddProjectUser @username = 'MeganB', @pid = 1, @star = 1, @userHearts = 2
-- EXEC AddProjectUser @username = 'BettyC', @pid = 1, @star = 1, @userHearts = 3
-- EXEC AddProjectUser @username = 'LucasB', @pid = 1, @star = 1, @userHearts = 1
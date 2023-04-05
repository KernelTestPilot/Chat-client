drop database db;
create database db;
use db;




CREATE TABLE users( 
	userid int NOT NULL AUTO_INCREMENT, 
    username VARCHAR(30) NOT NULL UNIQUE, 
    PRIMARY KEY (userid)
);

CREATE TABLE channels( 
	channelid int NOT NULL AUTO_INCREMENT, 
    userid int,
    channeltheme varchar(30),
    channelname varchar(20),
    PRIMARY KEY (channelid),
	FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE Messeges( 
	msgid int NOT NULL AUTO_INCREMENT, 
    userid int,
    channelid int,
    msg VARCHAR (100),
    PRIMARY KEY (msgid),
	FOREIGN KEY (userid) REFERENCES users(userid),
	FOREIGN KEY (channelid) REFERENCES channels(channelid)

);



#INSERT INTO users (username, password) VALUE ('dahlberg', 'test');

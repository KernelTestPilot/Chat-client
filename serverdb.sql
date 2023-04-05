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



INSERT INTO users (username) VALUE ('dahlberg');
INSERT INTO users (username) VALUE ('fredde');


INSERT INTO channels (channelname, channeltheme,userid) VALUE ('dif', 'fotboll',1);
INSERT INTO channels (channelname,channeltheme,userid) VALUE ('aik', 'fotboll',2);


INSERT INTO Messeges (userid,channelid,msg) VALUE (1, 2,'hejsan hur mår du');
INSERT INTO Messeges (userid,channelid,msg) VALUE (2, 2,'bra,sj');


INSERT INTO Messeges (userid,channelid,msg) VALUE (1, 1,'hejsan hur mår du');
INSERT INTO Messeges (userid,channelid,msg) VALUE (2, 1,'bra,sj');



select msg from Messeges WHERE channelid = 1;

drop database db;
create database db;
use db;



CREATE TABLE users( 
	userid int NOT NULL AUTO_INCREMENT, 
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    rolename VARCHAR(30),
    PRIMARY KEY (userid)
);

CREATE TABLE channels( 
	channelid int NOT NULL AUTO_INCREMENT, 
    channeltheme varchar(30),
    channelname varchar(20),
    PRIMARY KEY (channelid)
);

CREATE TABLE chat( 
	msgid int NOT NULL AUTO_INCREMENT, 
    userid int,
    channelid int,
    msg VARCHAR (100),
    PRIMARY KEY (msgid),
	FOREIGN KEY (userid) REFERENCES users(userid),
	FOREIGN KEY (channelid) REFERENCES channels(channelid)

);



INSERT INTO users (username, password, rolename) VALUE ('dahlberg','test', 'admin');
INSERT INTO users (username,password ) VALUE ('fredde','test');


INSERT INTO channels (channelname, channeltheme) VALUE ('dif', 'fotboll');
INSERT INTO channels (channelname,channeltheme) VALUE ('aik', 'fotboll');
INSERT INTO channels (channelname, channeltheme) VALUE ('Broadcast', 'Trafikolyckor');


INSERT INTO chat (userid,channelid,msg) VALUE (1, 2,'hejsan hur mår du');
INSERT INTO chat (userid,channelid,msg) VALUE (2, 2,'bra,sj');


INSERT INTO chat (userid,channelid,msg) VALUE (1, 1,'fotboll kl 1');
INSERT INTO chat (userid,channelid,msg) VALUE (2, 1,'javisst vi möts där');


select msg,userid from chat WHERE channelid = 1;

SELECT chat.msg,users.username
FROM chat
INNER JOIN users
ON chat.userid = users.userid;

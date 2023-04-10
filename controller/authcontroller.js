

var jwt = require('jsonwebtoken');


const SUPER_SECRET = 'catsareawesomebutdogsareawesometoo';

exports.generate = (username, userid, role) =>{
  let payload = {
    username: username,
    role: role,
    id: userid
  }
  let token = jwt.sign(payload, SUPER_SECRET,{
    expiresIn: "15m",});

    return token;

}

exports.verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, SUPER_SECRET);
    req.user = decoded;
    console.log(req.user)
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

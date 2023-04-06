const express = require("express");
const database = require('./config/sqlConnection');
const cors = require('cors')


const app = express();

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {


  //testar så servern funkar, körs på 5000
  res.send('Hello world');
});





require("./routes/ducks")(app);
require("./routes/broadcast")(app);
app.listen(5000, () => {
  console.log(`Server is up and running on 5000 ...`);
  
});
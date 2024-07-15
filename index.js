const app = require('./app');
const db = require('./db');
const user = require('./schemas/user');
const note = require('./schemas/note');

const port = 3000;
app.get('/',(req,res)=>{
    res.send("hello world....")
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
//module.exports = connectDB;
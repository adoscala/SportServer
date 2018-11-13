const config = require('./config');
const app = require('./app');


app.listen(8080, ()=>{
    console.log("Server runninng on port 8080");
})
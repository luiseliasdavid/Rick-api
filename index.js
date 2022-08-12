
const server = require('./src/app.js');
const { conn } = require('./src/db.js');


 
conn.sync({ force: false }).then(() => {
 const myPort= process.env.PORT || 3001
  server.listen(myPort, () => {
    console.log('%s listening at '+ myPort); 
  });
});
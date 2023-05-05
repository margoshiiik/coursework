import mysql2 from 'mysql2';

export const db = mysql2.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'margoshiiik', 
    database: 'web'
}); 

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
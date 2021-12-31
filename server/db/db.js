const Sequelize = require("sequelize");

const db = new Sequelize('messenger', 'postgres', 'amita', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});
// const db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost:5432/messenger", {
//   logging: false
// });
db.authenticate().then(() => {
  console.log("Success!");
}).catch((err) => {
  console.log(err);
});
module.exports = db;

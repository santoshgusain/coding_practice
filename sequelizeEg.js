import { Sequelize, DataTypes } from "sequelize";

// const sequelize = new Sequelize("sqlite::memory:");
// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const User = sequelize.define("User", {
  username: DataTypes.STRING,
  //   age: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

// sequelize
//   .sync()
//   .then(async () => {
//     console.log("Table created successfully");
//     const jane = await User.create({
//       username: "janedoe",
//       age: 35,
//       birthday: new Date(1980, 6, 20),
//     });
//     const users = await User.findAll({ raw: true });
//     console.log(users, "--------------");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

const jane = await User.create({
  username: "santosh",
  birthday: new Date(1980, 6, 20),
});

const users = await User.findAll({ raw: true });
console.log(users, "--------------");

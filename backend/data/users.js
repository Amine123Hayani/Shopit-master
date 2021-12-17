import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "jhon doe",
    email: "jhon@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "jane doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;

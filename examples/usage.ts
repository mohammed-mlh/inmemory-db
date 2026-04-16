import { Database } from "../dist/index.js";

const db = new Database("mydb");

// Define your user type
type User = {
  id: string;
  name: string;
  age: number;
};

// Create typed collection
const users = db.createCollection<User>("users", [
  { name: "id", type: "string" },
  { name: "name", type: "string" },
  { name: "age", type: "number" }
]);

// Insert data
users.insert({
  id: "1",
  name: "Ali",
  age: 20
});

// Read data
console.log(users.findById("1"));
import { Database } from "../dist/index.js";
const db = new Database("mydb");
// Create typed collection
const users = db.createCollection("users", [
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
//# sourceMappingURL=usage.js.map
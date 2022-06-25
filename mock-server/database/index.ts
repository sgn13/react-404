import sessions from "./session.data";
import users from "./users.data";
import movies from "./movies.data";

// Barrels pattern:
const database = { sessions, users, movies };

export default database;

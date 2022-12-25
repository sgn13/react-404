"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const session_data_1 = __importDefault(require("./session.data"));
const users_data_1 = __importDefault(require("./users.data"));
const movies_data_1 = __importDefault(require("./movies.data"));
// Barrels pattern:
const database = {
  sessions: session_data_1.default,
  users: users_data_1.default,
  movies: movies_data_1.default,
};
exports.default = database;

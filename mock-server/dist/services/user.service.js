"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUsersCount =
  exports.deleteUsers =
  exports.updateUsers =
  exports.createUsers =
  exports.readUsersById =
  exports.readAllUsers =
    void 0;
const index_1 = __importDefault(require("../database/index"));
const readAllUsers = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { users } = index_1.default;
      return users;
    } catch (err) {
      throw err;
    }
  });
exports.readAllUsers = readAllUsers;
const readUsersById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = index_1.default.users.find((item) => item.id === id);
      return user;
    } catch (err) {
      throw err;
    }
  });
exports.readUsersById = readUsersById;
const createUsers = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const payloadIndex = index_1.default.users.findIndex((item) => item.id === payload.id);
      if (payloadIndex === -1) {
        index_1.default.users.push(payload);
        return payload;
      }
      const err = new Error("Already Exists");
      err.status = 409;
      throw err;
    } catch (err) {
      throw err;
    }
  });
exports.createUsers = createUsers;
const updateUsers = (type, id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      if (!id || !payload || !Object.keys(payload).length) return;
      // eslint-disable-next-line no-param-reassign
      payload.id = id; // overwrite the id with the id passed in so that id is not changed
      const user = index_1.default.users.find((item) => item.id === id);
      if (user) {
        const payloadIndex = index_1.default.users.findIndex((item) => item.id === id);
        if (type === "put") {
          // replace item at index with another item
          index_1.default.users.splice(payloadIndex, 1, payload);
          // eslint-disable-next-line consistent-return
          return index_1.default.users[payloadIndex];
        }
        if (type === "patch") {
          // only change those fields which are available in the existing payload
          Object.keys(payload).forEach((key) => {
            if (key in user) user[key] = payload[key];
          });
          index_1.default.users.splice(payloadIndex, 1, user);
          // eslint-disable-next-line consistent-return
          return index_1.default.users[payloadIndex];
        }
        const err = new Error("Bad Request.");
        err.status = 400;
        throw err;
      }
      throw new Error(`User ${payload.id} does not exist`);
    } catch (err) {
      throw err;
    }
  });
exports.updateUsers = updateUsers;
const deleteUsers = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const payloadIndex = index_1.default.users.findIndex((item) => item.id === id);
      if (payloadIndex > -1) {
        // remove at index
        const deletedItem = index_1.default.users.splice(payloadIndex, 1);
        return deletedItem[0];
      }
      throw new Error(`User ${id} does not exist`);
    } catch (err) {
      throw err;
    }
  });
exports.deleteUsers = deleteUsers;
const readUsersCount = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const count = index_1.default.users.length;
      return count;
    } catch (err) {
      throw err;
    }
  });
exports.readUsersCount = readUsersCount;

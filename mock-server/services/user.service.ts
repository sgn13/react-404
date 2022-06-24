/* eslint-disable no-useless-catch */
// Follow CRUD convention for name methods
import { IErrorWithStatus } from "../controllers/error.controller";
import database from "../database/index";

export const readAllUsers = async () => {
  try {
    const { users } = database;
    return users;
  } catch (err) {
    throw err;
  }
};

export const readUsersById = async (id: number) => {
  try {
    const user = database.users.find((item) => item.id === id);
    return user;
  } catch (err) {
    throw err;
  }
};

export const createUsers = async (payload: any) => {
  try {
    const payloadIndex = database.users.findIndex((item) => item.id === payload.id);
    if (payloadIndex === -1) {
      database.users.push(payload);
      return payload;
    }
    const err: IErrorWithStatus = new Error("Already Exists");
    err.status = 409;
    throw err;
  } catch (err) {
    throw err;
  }
};

export const updateUsers = async (type: "put" | "patch", id: number, payload: any) => {
  try {
    if (!id || !payload || !Object.keys(payload).length) return;
    // eslint-disable-next-line no-param-reassign
    payload.id = id; // overwrite the id with the id passed in so that id is not changed
    const user: any = database.users.find((item) => item.id === id);

    if (user) {
      const payloadIndex = database.users.findIndex((item) => item.id === id);
      if (type === "put") {
        // replace item at index with another item
        database.users.splice(payloadIndex, 1, payload);
        // eslint-disable-next-line consistent-return
        return database.users[payloadIndex];
      }
      if (type === "patch") {
        // only change those fields which are available in the existing payload
        Object.keys(payload).forEach((key) => {
          if (key in user) user[key] = payload[key];
        });

        database.users.splice(payloadIndex, 1, user);
        // eslint-disable-next-line consistent-return
        return database.users[payloadIndex];
      }
      const err: IErrorWithStatus = new Error("Bad Request.");
      err.status = 400;
      throw err;
    }
    throw new Error(`User ${payload.id} does not exist`);
  } catch (err) {
    throw err;
  }
};

export const deleteUsers = async (id: number) => {
  try {
    const payloadIndex = database.users.findIndex((item) => item.id === id);
    if (payloadIndex > -1) {
      // remove at index
      const deletedItem = database.users.splice(payloadIndex, 1);
      return deletedItem[0];
    }
    throw new Error(`User ${id} does not exist`);
  } catch (err) {
    throw err;
  }
};

export const readUsersCount = async () => {
  try {
    const count = database.users.length;
    return count;
  } catch (err) {
    throw err;
  }
};

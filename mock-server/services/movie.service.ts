/* eslint-disable no-useless-catch */
// Follow CRUD convention for name methods
import database from "../database/index";
import { IErrorWithStatus } from "../controllers/error.controller";

export const readAllMovies = async () => {
  try {
    const { movies } = database;
    return movies;
  } catch (err) {
    throw err;
  }
};

export const readMoviesById = async (id: number) => {
  try {
    const movie = database.movies.find((item) => item.id === id);
    return movie;
  } catch (err) {
    throw err;
  }
};

export const createMovies = async (payload: any) => {
  try {
    const payloadIndex = database.movies.findIndex((item) => item.id === payload.id);
    if (payloadIndex === -1) {
      database.movies.push(payload);
      return payload;
    }
    // these code will not execute if payloadIndex is -1 and it's return statement
    const err: IErrorWithStatus = new Error("Already Exists");
    err.status = 409;
    throw err;
  } catch (err) {
    throw err;
  }
};

export const updateMovies = async (type: "put" | "patch", id: number, payload: any) => {
  try {
    if (!id || !payload || !Object.keys(payload).length) return;
    payload.id = id; // overwrite the id with the id passed in so that id is not changed
    const movie: any = database.movies.find((item) => item.id === id);

    if (movie) {
      const payloadIndex = database.movies.findIndex((item) => item.id === id);
      if (type === "put") {
        // replace item at index with another item
        database.movies.splice(payloadIndex, 1, payload);
        // eslint-disable-next-line consistent-return
        return database.movies[payloadIndex];
      }
      if (type === "patch") {
        // only change those fields which are available in the existing payload
        Object.keys(payload).forEach((key) => {
          if (key in movie) movie[key] = payload[key];
        });

        database.movies.splice(payloadIndex, 1, movie);
        // eslint-disable-next-line consistent-return
        return database.movies[payloadIndex];
      }
      const err: IErrorWithStatus = new Error("Bad Request.");
      err.status = 400;
      throw err;
    }
    throw new Error(`Movie ${payload.id} does not exist`);
  } catch (err) {
    throw err;
  }
};

export const deleteMovies = async (id: number) => {
  try {
    const payloadIndex = database.movies.findIndex((item) => item.id === id);
    if (payloadIndex > -1) {
      // remove at index
      const deletedItem = database.movies.splice(payloadIndex, 1);
      return deletedItem[0];
    }
    throw new Error(`Movie ${id} does not exist`);
  } catch (err) {
    throw err;
  }
};

export const readMoviesCount = async () => {
  try {
    const count = database.movies.length;
    return count;
  } catch (err) {
    throw err;
  }
};

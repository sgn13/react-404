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
exports.readMoviesCount =
  exports.deleteMovies =
  exports.updateMovies =
  exports.createMovies =
  exports.readMoviesById =
  exports.readAllMovies =
    void 0;
/* eslint-disable no-useless-catch */
// Follow CRUD convention for name methods
const index_1 = __importDefault(require("../database/index"));
const readAllMovies = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { movies } = index_1.default;
      return movies;
    } catch (err) {
      throw err;
    }
  });
exports.readAllMovies = readAllMovies;
const readMoviesById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const movie = index_1.default.movies.find((item) => item.id === id);
      return movie;
    } catch (err) {
      throw err;
    }
  });
exports.readMoviesById = readMoviesById;
const createMovies = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const payloadIndex = index_1.default.movies.findIndex((item) => item.id === payload.id);
      if (payloadIndex === -1) {
        index_1.default.movies.push(payload);
        return payload;
      }
      // these code will not execute if payloadIndex is -1 and it's return statement
      const err = new Error("Already Exists");
      err.status = 409;
      throw err;
    } catch (err) {
      throw err;
    }
  });
exports.createMovies = createMovies;
const updateMovies = (type, id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      if (!id || !payload || !Object.keys(payload).length) return;
      payload.id = id; // overwrite the id with the id passed in so that id is not changed
      const movie = index_1.default.movies.find((item) => item.id === id);
      if (movie) {
        const payloadIndex = index_1.default.movies.findIndex((item) => item.id === id);
        if (type === "put") {
          // replace item at index with another item
          index_1.default.movies.splice(payloadIndex, 1, payload);
          // eslint-disable-next-line consistent-return
          return index_1.default.movies[payloadIndex];
        }
        if (type === "patch") {
          // only change those fields which are available in the existing payload
          Object.keys(payload).forEach((key) => {
            if (key in movie) movie[key] = payload[key];
          });
          index_1.default.movies.splice(payloadIndex, 1, movie);
          // eslint-disable-next-line consistent-return
          return index_1.default.movies[payloadIndex];
        }
        const err = new Error("Bad Request.");
        err.status = 400;
        throw err;
      }
      throw new Error(`Movie ${payload.id} does not exist`);
    } catch (err) {
      throw err;
    }
  });
exports.updateMovies = updateMovies;
const deleteMovies = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const payloadIndex = index_1.default.movies.findIndex((item) => item.id === id);
      if (payloadIndex > -1) {
        // remove at index
        const deletedItem = index_1.default.movies.splice(payloadIndex, 1);
        return deletedItem[0];
      }
      throw new Error(`Movie ${id} does not exist`);
    } catch (err) {
      throw err;
    }
  });
exports.deleteMovies = deleteMovies;
const readMoviesCount = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const count = index_1.default.movies.length;
      return count;
    } catch (err) {
      throw err;
    }
  });
exports.readMoviesCount = readMoviesCount;

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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovies =
  exports.patchMovies =
  exports.putMovies =
  exports.postMovies =
  exports.getMoviesById =
  exports.getAllMovies =
    void 0;
const movie_service_1 = require("../services/movie.service");
const getAllMovies = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // // paginating user model
    // const page = parseInt(req.query.page, 10);
    // const limit = parseInt(req.query.limit, 10);
    // const { sort } = req.query;
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // const results: any = {};
    // // endIndex number is less than total Documents number, it means next page must be there
    // if (endIndex < (await findMoviesCount())) {
    //   results.next = {
    //     page: page + 1, // since index starts at 0
    //     limit: limit,
    //   };
    // }
    // // if 1 or more documents are skipped at the begining, it means previous page exists containing those skipped documents
    // if (startIndex > 0) {
    //   results.previous = {
    //     page: page - 1,
    //     limit: limit,
    //   };
    // }
    try {
      // results.results = await findAllMovies(sort, startIndex, limit);
      const results = yield (0, movie_service_1.readAllMovies)();
      if (results) {
        res.status(200).json(results);
        return;
      }
      res.status(404).end();
      return;
      // logger.info(res);
    } catch (err) {
      next(err);
    }
  });
exports.getAllMovies = getAllMovies;
const getMoviesById = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params;
      const movie = yield (0, movie_service_1.readMoviesById)(Number(id));
      if (movie) {
        res.status(200).json(movie);
        return;
      }
      res.status(404).end();
      return;
    } catch (err) {
      next(err);
    }
  });
exports.getMoviesById = getMoviesById;
const postMovies = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const payload = req.body;
      const movie = yield (0, movie_service_1.createMovies)(payload);
      res.status(200).json(movie);
      return movie;
    } catch (err) {
      next(err);
    }
  });
exports.postMovies = postMovies;
// put replaces the entire document with the new one
// all new and old properties are recieved in the body
// new fields could be recieved.
const putMovies = (req, res, next) => {
  try {
    const type = "put";
    const { id } = req.params;
    const _a = req.body,
      { id: excludingId } = _a,
      payload = __rest(_a, ["id"]);
    const movie = (0, movie_service_1.updateMovies)(type, Number(id), payload);
    res.status(200).json(movie);
    return movie;
  } catch (err) {
    next(err);
  }
};
exports.putMovies = putMovies;
// patch replaces only the fields that are passed in the request
// only newly update field is recieved in the body
// only existing fields are affected
const patchMovies = (req, res, next) => {
  try {
    const type = "patch";
    const { id } = req.params;
    const _a = req.body,
      { id: excludingId } = _a,
      remainingPayload = __rest(_a, ["id"]);
    const movie = (0, movie_service_1.updateMovies)(type, Number(id), remainingPayload);
    res.status(200).json(movie);
    return movie;
  } catch (err) {
    next(err);
  }
};
exports.patchMovies = patchMovies;
const deleteMovies = (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = (0, movie_service_1.deleteMovies)(Number(id));
    res.status(204).json(movie);
    return;
  } catch (err) {
    next(err);
  }
};
exports.deleteMovies = deleteMovies;

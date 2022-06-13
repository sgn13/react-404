"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("../controllers/movie.controller");
const router = express_1.default.Router();
router.get("/movies", movie_controller_1.getAllMovies);
router.get("/movies/:id", movie_controller_1.getMoviesById);
router.post("/movies", movie_controller_1.postMovies);
router.put("/movies/:id", movie_controller_1.putMovies);
router.patch("/movies/:id", movie_controller_1.patchMovies);
router.delete("/movies/:id", movie_controller_1.deleteMovies);
exports.default = router;

"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const movie_route_1 = __importDefault(require("./movie.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const router = express_1.default.Router();
const root = "/";
const suffix = "api/v1";
router.use(root + suffix, auth_route_1.default);
router.use(root + suffix, user_route_1.default);
router.use(root + suffix, movie_route_1.default);
exports.default = router;

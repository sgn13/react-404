"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.get("/users", user_controller_1.getAllUsers);
router.get("/users/:id", user_controller_1.getUsersById);
router.post("/users", user_controller_1.postUsers);
router.put("/users/:id", user_controller_1.putUsers);
router.patch("/users/:id", user_controller_1.patchUsers);
router.delete("/users/:id", user_controller_1.deleteUsers);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const error_controller_1 = require("./controllers/error.controller");
dotenv_1.default.config();
const cors = require("cors");
const app = (0, express_1.default)();
// for parsing json data, is built-in replacement for body-parser middleware
app.use(express_1.default.json());
// for parsing x-www-form-data
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, morgan_1.default)("tiny"));
const corsConfig = {
    // Access-Control-Allow-Origin i.e client address
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "OPTIONS"],
    // Access-Control-Allow-Credentials
    credentials: true,
};
// enable options request for all headers and methods rather than only delete method.
app.options("*", cors(corsConfig));
app.use(cors(corsConfig));
app.get("/", (req, res) => {
    res.send("<h1>Hello from the TypeScript world!</h1>");
});
//-------------------------------------------------------
// ALL ROUTERS
//-------------------------------------------------------
app.use(index_1.default);
//-------------------------------------------------------
// ERROR-HANDLING
//-------------------------------------------------------
// if error(implicit or explicit) occurred, non-error-handling-middleware will be skipped and error-handling-middleware will be invoked
// all four arguments (err, req, res, next) are mandatory for constructing error-handling-middleware.
app.use(error_controller_1.missedRouteCatcher);
app.use(error_controller_1.errorLogger);
app.use(error_controller_1.respond404WithClientSupportedContentType);
app.use(error_controller_1.errorResponder);
(0, error_controller_1.handleUnhandledRejection)();
// starting server
const httpPort = process.env.PORT || 2000;
app.listen(httpPort, () => {
    console.log(`Mock server is listening at ${httpPort} ⚡`);
});
exports.default = express_1.default;

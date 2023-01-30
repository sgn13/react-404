"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.patchUsers = exports.putUsers = exports.postUsers = exports.getUsersById = exports.getAllUsers = void 0;
const user_service_1 = require("../services/user.service");
const utils_1 = require("../utils");
const directories_1 = require("../constants/directories");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // paginating user model
        const { page = "1", perPage = "10", order = "ASC", orderBy = "fullName" } = req.query;
        let prev = null;
        const current = {
            page: page ? parseInt(page, 10) : 1,
            perPage: perPage ? parseInt(perPage, 10) : 10,
        };
        let next = null;
        const fromIndex = current.page ? (current.page - 1) * current.perPage : 0;
        const toIndex = current.page ? current.page * current.perPage : 0;
        let results = yield (0, user_service_1.readAllUsers)();
        const totalCount = results.length;
        if (totalCount)
            results = results.slice(fromIndex, toIndex);
        // endIndex number is less than total Documents number, it means next page must be there
        if (toIndex < totalCount) {
            next = {
                page: current.page + 1,
                perPage: current.perPage,
            };
        }
        // if 1 or more documents are skipped at the begining, it means previous page exists containing those skipped documents
        if (fromIndex > 0) {
            prev = {
                page: current.page - 1,
                perPage: current.perPage,
            };
        }
        if (results) {
            res.status(200).json({
                results,
                count: totalCount,
                next,
                prev,
                order: "",
                orderBy: "",
            });
            return;
        }
        res.status(404).end();
        return;
        // logger.info(res);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUsers = getAllUsers;
const getUsersById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, user_service_1.readUsersById)(id);
        if (user) {
            res.status(200).json(user);
            return;
        }
        res.status(404).end();
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.getUsersById = getUsersById;
const postUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const uploadedFileUrl = `${req.protocol}://${req.get("host")}${directories_1.directories.PROFILE_PICTURE_MOUNTPOINT}/${req.uploadedFilename}`;
        payload.id = (0, utils_1.getShortId)();
        payload.profilePic = uploadedFileUrl;
        const user = yield (0, user_service_1.createUsers)(payload);
        res.status(200).json(user);
        return user;
    }
    catch (err) {
        next(err);
    }
});
exports.postUsers = postUsers;
// put replaces the entire document with the new one
// new fields could be added
const putUsers = (req, res, next) => {
    try {
        const type = "put";
        const { id } = req.params;
        const _a = req.body, { id: excludingId } = _a, payload = __rest(_a, ["id"]);
        console.log("payload", payload);
        const user = (0, user_service_1.updateUsers)(type, id, payload);
        res.status(200).json(user);
        return true;
    }
    catch (err) {
        next(err);
    }
};
exports.putUsers = putUsers;
// patch replaces only the fields that are passed in the request
// only existing fields are updated
const patchUsers = (req, res, next) => {
    try {
        const type = "patch";
        const { id } = req.params;
        const _a = req.body, { id: excludingId } = _a, remainingPayload = __rest(_a, ["id"]);
        const user = (0, user_service_1.updateUsers)(type, id, remainingPayload);
        res.status(200).json(user);
        return true;
    }
    catch (err) {
        next(err);
    }
};
exports.patchUsers = patchUsers;
const deleteUsers = (req, res, next) => {
    try {
        const { id } = req.params;
        const user = (0, user_service_1.deleteUsers)(Number(id));
        res.status(204).json(user);
        return;
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUsers = deleteUsers;

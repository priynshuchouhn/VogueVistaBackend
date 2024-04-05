"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkServerWorking = void 0;
const checkServerWorking = (req, res, next) => {
    res.status(200).json(true);
};
exports.checkServerWorking = checkServerWorking;

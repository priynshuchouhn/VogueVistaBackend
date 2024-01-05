"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (req, res, next) => {
    if (req.user.userTypeId == 1) {
        next();
    }
    else {
        res.status(401).json({ success: false, data: false, message: 'Not a Admin Account' });
    }
};
exports.authorize = authorize;

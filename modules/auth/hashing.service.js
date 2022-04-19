"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.validate = void 0;
const bcrypt = require("bcrypt");
const saltOrRounds = 10;
function validate(password, hash) {
    return bcrypt.compare(password, hash);
}
exports.validate = validate;
function hash(password) {
    return bcrypt.hash(password, saltOrRounds);
}
exports.hash = hash;
//# sourceMappingURL=hashing.service.js.map
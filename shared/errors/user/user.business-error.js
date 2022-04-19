"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusinessErrors = void 0;
exports.UserBusinessErrors = {
    NotFound: {
        apiErrorCode: 'E_0002_0001',
        errorMessage: 'User not found',
        reason: `Provided user ids doesn't exist in DB`
    },
    InvalidRole: {
        apiErrorCode: 'E_0002_0002',
        errorMessage: 'Invalid Role',
        reason: `Role is not valid`
    },
    UniqueLoginException: {
        apiErrorCode: 'E_0002_0003',
        errorMessage: 'Unique login exception',
        reason: `User with this login already exists, use another login`
    }
};
//# sourceMappingURL=user.business-error.js.map
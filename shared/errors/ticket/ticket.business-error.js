"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketBusinessErrors = void 0;
exports.TicketBusinessErrors = {
    NotFound: {
        apiErrorCode: 'E_0003_0001',
        errorMessage: 'Ticket not found',
        reason: `Provided ticket ids doesn't exist in DB`
    },
    UnauthorizedMessageCreate: {
        apiErrorCode: 'E_0003_0002',
        errorMessage: 'Access Denied',
        reason: `User aren't allowed to add messages to this ticket`
    },
    UnauthorizedTicketAccess: {
        apiErrorCode: 'E_0003_0003',
        errorMessage: 'Access Denied',
        reason: `User don't have permission to view tickets of other users`
    },
    UnauthorizedTicketCancel: {
        apiErrorCode: 'E_0003_0004',
        errorMessage: 'Access Denied',
        reason: `User don't have permission to close tickets of other users`
    },
    TicketCompletionFailure: {
        apiErrorCode: 'E_0003_0005',
        errorMessage: 'Completion Fail',
        reason: `Only tickets "IN WORK" allowed for completion`
    },
    UnauthorizedTicketConfirm: {
        apiErrorCode: 'E_0003_0006',
        errorMessage: 'Access Denied',
        reason: `User don't have permission to confirm tickets of other users`
    },
    TicketConfirmFailure: {
        apiErrorCode: 'E_0003_0007',
        errorMessage: 'Confirm Fail',
        reason: `Only tickets "WAITING FOR CONFIRMATION" allowed for confirmation`
    },
    UnauthorizedTicketReject: {
        apiErrorCode: 'E_0003_0006',
        errorMessage: 'Access Denied',
        reason: `User don't have permission to reject tickets of other users`
    },
    TicketRejectionFailure: {
        apiErrorCode: 'E_0003_0007',
        errorMessage: 'Confirm Fail',
        reason: `Only tickets "WAITING FOR CONFIRMATION" allowed for rejection`
    },
    UnauthorizedTicketAssign: {
        apiErrorCode: 'E_0003_0008',
        errorMessage: 'Access Denied',
        reason: `User don't have permission to assign tickets to other users`
    },
    TicketAlreadyInWork: {
        apiErrorCode: 'E_0003_0009',
        errorMessage: 'Access Denied',
        reason: `Ticket already has worker, and user aren't allowed to change ticket worker`
    },
    InvalidUser: {
        apiErrorCode: 'E_0003_0010',
        errorMessage: 'Invalid Value',
        reason: `Invalid user for worker, workers can be only Tech support personal`
    }
};
//# sourceMappingURL=ticket.business-error.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./modules/auth/jwt-auth.guard");
const auth_service_1 = require("./modules/auth/auth.service");
const roles_guard_1 = require("./roles/roles.guard");
const role_decorator_1 = require("./roles/role.decorator");
const role_enum_1 = require("./roles/role.enum");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(authService, appService) {
        this.authService = authService;
        this.appService = appService;
    }
    async weekStatistics() {
        return this.appService.WeekStatistics();
    }
    async yearStatistics() {
        return this.appService.YearStatistics();
    }
};
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)('analytics/weekly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "weekStatistics", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)('analytics/yearly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "yearStatistics", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [auth_service_1.AuthService, app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map
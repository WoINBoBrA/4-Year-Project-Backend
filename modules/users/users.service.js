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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const verificationService = require("../auth/hashing.service");
const constants_1 = require("../../core/constants");
const role_enum_1 = require("../../roles/role.enum");
const user_business_error_1 = require("../../shared/errors/user/user.business-error");
let UsersService = class UsersService {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async onModuleInit() {
        const users = await this.usersModel.findAndCountAll({ where: { role: role_enum_1.Role.ADMIN, isActive: true } });
        if (users.count <= 0) {
            const user = await this.usersModel.findOne({ where: { login: "root" } });
            if (!user)
                this.create({ login: "root", password: "root", firstName: "root", secondName: "root", role: role_enum_1.Role.ADMIN, isActive: true });
            else
                this.activate(user.id);
        }
    }
    findAll(page, elements) {
        if (page <= 0) {
            common_1.Logger.error(`Page must be more than 0`, '', 'TicketService', true);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        if (elements <= 0) {
            common_1.Logger.error(`Elements must be more than 0`, '', 'TicketService', true);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        return this.usersModel.findAndCountAll({ limit: elements, offset: elements * (page - 1) });
    }
    findByRole(role) {
        if (!Object.values(role_enum_1.Role).includes(role)) {
            common_1.Logger.error(`Role ${role} is not valid`, '', 'UserService', true);
            throw new common_1.NotAcceptableException(user_business_error_1.UserBusinessErrors.InvalidRole);
        }
        return this.usersModel.findAll({ where: { role: role } });
    }
    async findOne(id) {
        const user = await this.usersModel.findByPk(id);
        if (!user) {
            common_1.Logger.error(`Couldn't find user with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        return user;
    }
    async create(userDto) {
        if (!Object.values(role_enum_1.Role).includes(userDto.role)) {
            common_1.Logger.error(`Role ${userDto.role} is not valid`, '', 'UserService', true);
            throw new common_1.NotAcceptableException(user_business_error_1.UserBusinessErrors.InvalidRole);
        }
        const user = await this.usersModel.findOne({ where: { login: userDto.login } });
        if (user) {
            common_1.Logger.error(`User with login ${userDto.login} already exists, use another login`, '', 'UserService', true);
            throw new common_1.NotAcceptableException(user_business_error_1.UserBusinessErrors.UniqueLoginException);
        }
        const createdUser = await this.usersModel.create(Object.assign(Object.assign({}, userDto), { password: await verificationService.hash(userDto.password) }));
        return this.usersModel.findByPk(createdUser.id);
    }
    findByLogin(login) {
        return this.usersModel.scope("login").findOne({ where: { login: login, isActive: true } });
    }
    async changePassword(id, newPassword) {
        const user = await this.usersModel.findByPk(id);
        if (!user) {
            common_1.Logger.error(`Couldn't find user with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        user.update({ password: await verificationService.hash(newPassword) });
        return user;
    }
    async selfChangePassword(oldPassword, newPassword, user) {
        const _user = await this.usersModel.scope("login").findByPk(user.userId);
        if (!_user) {
            common_1.Logger.error(`Couldn't find user with id = ${user.userId}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        if (!(await verificationService.validate(oldPassword, _user.password))) {
            common_1.Logger.error(`Incorrect old password`);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        _user.update({ password: await verificationService.hash(newPassword) });
        return _user;
    }
    async update(id, userUpdateDto) {
        const user = await this.usersModel.findByPk(id);
        if (!user) {
            common_1.Logger.error(`Couldn't find user with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        user.update(Object.assign({}, userUpdateDto));
        return user;
    }
    async activate(id) {
        const user = await this.usersModel.findByPk(id);
        if (!user) {
            common_1.Logger.error(`Couldn't find user with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        user.update({ isActive: true });
        return user;
    }
    async disable(id) {
        const user = await this.usersModel.findByPk(id);
        if (!user) {
            common_1.Logger.error(`Couldn't find user with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        user.update({ isActive: false });
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
import { Controller, Get, Post, Body, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { elementAt } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';
import { UserUpdateDto } from './userupdate.dto';

@Controller('Users')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
      ) {}

    @Get('config/page:page/elements:elements')
    @Roles(Role.ADMIN)
    findAll(@Param('page') page: number, @Param('elements') elements: number) {
        return this.usersService.findAll(page, elements);
    }


    @Get(':id')
    @Roles(Role.ADMIN)
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Get('role/:role')
    @Roles(Role.ADMIN)
    findByRole(@Param('role') role: Role) {
        return this.usersService.findByRole(role);
    }


    @Post()
    @Roles(Role.ADMIN)
    create(@Body() userDto: UserDto) {
        return this.usersService.create(userDto);
    }

    @Patch('update/:id')
    @Roles(Role.ADMIN)
    update(@Param('id') id: string, @Body() userUpdateDto: UserUpdateDto) {
        return this.usersService.update(id, userUpdateDto);
    }

    @Patch('change-password/:id')
    @Roles(Role.ADMIN)
    changePassword(@Param('id') id: string, @Body("password") password: string) {
        return this.usersService.changePassword(id, password);
    }

    @Patch('change-password')
    selfChangePassword(@Body("oldPassword") oldPassword: string ,@Body("newPassword") newPassword: string, @Req() req) {
        return this.usersService.selfChangePassword(oldPassword,newPassword,req.user);
    }

    @Patch('activate/:id')
    @Roles(Role.ADMIN)
    activate(@Param('id') id: string) {
        return this.usersService.activate(id);
    }

    @Patch('deactivate/:id')
    @Roles(Role.ADMIN)
    disable(@Param('id') id: string) {
        return this.usersService.disable(id);
    }
}
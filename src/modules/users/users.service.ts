import { Inject, Injectable, Logger, NotAcceptableException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { UserDto } from 'src/modules/users/user.dto';
import { User } from './users.model';
import * as verificationService from '../auth/hashing.service';
import { USER_REPOSITORY } from 'src/core/constants';
import { Role } from 'src/roles/role.enum';
import { UserBusinessErrors } from 'src/shared/errors/user/user.business-error';
import { UserUpdateDto } from './userupdate.dto';
import { elementAt } from 'rxjs';



@Injectable()
export class UsersService implements OnModuleInit {

  constructor(
    @Inject(USER_REPOSITORY) private readonly usersModel: typeof User,
  ) {}

  async onModuleInit(): Promise<void> {
      const users = await this.usersModel.findAndCountAll({where:{role:Role.ADMIN,isActive:true}});
      if(users.count <= 0){
        const user = await this.usersModel.findOne({where:{login:"root"}});
        if(!user) this.create({login:"root",password:"root",firstName:"root",secondName:"root",role:Role.ADMIN,isActive:true});
        else this.activate(user.id);
      }
  }

  findAll(page: number, elements: number): Promise<{rows:User[],count:number}> {
    if(page<=0){
      Logger.error(`Page must be more than 0`,'','TicketService',true);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }
    if(elements<=0){
      Logger.error(`Elements must be more than 0`,'','TicketService',true);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }


    return this.usersModel.findAndCountAll({limit: elements, offset: elements*(page-1)});
  }

  findByRole(role: Role): Promise<User[]> {
    if(!Object.values(Role).includes(role)) {
      Logger.error(`Role ${role} is not valid`,'','UserService',true);
      throw new NotAcceptableException(UserBusinessErrors.InvalidRole);
    }

    return this.usersModel.findAll({where:{role:role}});
  }


  async findOne(id: string): Promise<User> {
    const user = await this.usersModel.findByPk(id);
    
    if(!user) {
      Logger.error(`Couldn't find user with id = ${id}`,'','TicketService',true);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }

    return user;
  }
  



  async create(userDto: UserDto): Promise<User> {

    if(!Object.values(Role).includes(userDto.role)) {
      Logger.error(`Role ${userDto.role} is not valid`,'','UserService',true);
      throw new NotAcceptableException(UserBusinessErrors.InvalidRole);
    }



    const user = await this.usersModel.findOne({where:{login:userDto.login}});
    if(user) {
      Logger.error(`User with login ${userDto.login} already exists, use another login`,'','UserService',true);
      throw new NotAcceptableException(UserBusinessErrors.UniqueLoginException);
    }

    const createdUser = await this.usersModel.create({...userDto, password: await verificationService.hash(userDto.password)});
    return this.usersModel.findByPk(createdUser.id);
  }


  findByLogin(login: string): Promise<User> {
    return this.usersModel.scope("login").findOne({where:{ login: login, isActive: true}});
  }

  async changePassword(id: string, newPassword: string): Promise<User> {
    const user = await this.usersModel.findByPk(id);
    if(!user) {
      Logger.error(`Couldn't find user with id = ${id}`,'','TicketService',true);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }

    user.update({password: await verificationService.hash(newPassword)});
    return user;
  }


  async selfChangePassword(oldPassword: string, newPassword: string, user: any): Promise<User> {
    const _user = await this.usersModel.scope("login").findByPk(user.userId);

    if(!_user) {
      Logger.error(`Couldn't find user with id = ${user.userId}`,'','TicketService',true);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }

    if(!(await verificationService.validate(oldPassword,_user.password))){
      Logger.error(`Incorrect old password`);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }

    _user.update({password: await verificationService.hash(newPassword)});
    return _user;
  }

  async update(id: string, userUpdateDto: UserUpdateDto) {
    const user = await this.usersModel.findByPk(id);
    if(!user) {
      Logger.error(`Couldn't find user with id = ${id}`,'','TicketService',true);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }

    user.update({...userUpdateDto});
    return user;
  }

  async activate(id: string): Promise<User> {
    const user = await this.usersModel.findByPk(id);
    if(!user){
      Logger.error(`Couldn't find user with id = ${id}`,'','TicketService',true);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }

    user.update({isActive:true});
    return user;
  }

  async disable(id: string): Promise<User> {
    const user = await this.usersModel.findByPk(id);
    if(!user){
      Logger.error(`Couldn't find user with id = ${id}`,'','TicketService',true);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }
    user.update({isActive:false});
    return user;
  }

}
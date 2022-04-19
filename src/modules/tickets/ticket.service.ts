import { Inject, Injectable, Logger, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Ticket } from './ticket.model';
import { MessageDto } from '../messages/message.dto';
import { TicketDto } from './ticket.dto';
import { Category } from '../categories/category.model';
import { User } from '../users/users.model';
import { Message } from '../messages/message.model';
import { Role } from 'src/roles/role.enum';
import { CATEGORY_REPOSITORY, MESSAGE_REPOSITORY, SEQUELIZE, STATE_REPOSITORY, TICKET_REPOSITORY, USER_REPOSITORY } from 'src/core/constants';
import { CategoryBusinessErrors } from 'src/shared/errors/category/category.business-error';
import { UserBusinessErrors } from 'src/shared/errors/user/user.business-error';
import { TicketBusinessErrors } from 'src/shared/errors/ticket/ticket.business-error';
import { State, TicketState } from './states/state.model';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { TLSSocket } from 'tls';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TICKET_REPOSITORY) private readonly ticketModel: typeof Ticket,
    @Inject(MESSAGE_REPOSITORY) private readonly messageModel: typeof Message,
    @Inject(CATEGORY_REPOSITORY) private readonly categoryModel: typeof Category,
    @Inject(USER_REPOSITORY) private readonly userModel: typeof User,
    @Inject(STATE_REPOSITORY) private readonly stateModel: typeof State,
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
  ) { }

  async create(ticketDto: TicketDto, messageDto: MessageDto, user: any): Promise<Ticket> {

    const category = await this.categoryModel.findByPk(ticketDto.categoryId);

    if (!category) {
      Logger.error(`Couldn't find category with id = ${ticketDto.categoryId}`, '', 'TicketService', true);
      throw new NotFoundException(CategoryBusinessErrors.NotFound);
    }

    const applicant = await this.userModel.findByPk(user.userId);
    if (!applicant) {
      Logger.error(`Couldn't find user with id = ${user.userId}`, '', 'TicketService', true);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }

    const ticket = await this.ticketModel.create({ ...ticketDto, applicantId: user.userId });
    await this.stateModel.create({ state: TicketState.INWORK, ticketId: ticket.id });
    await this.messageModel.create({ text: messageDto.text, userId: user.userId, ticketId: ticket.id });

    return this.ticketModel.scope("one").findByPk(ticket.id);

  }

  async createMessage(id: string, messageDto: MessageDto, user: any): Promise<Ticket> {

    const ticket = await this.ticketModel.scope("basic").findByPk(id);

    if (!ticket) {
      Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    const _user = await this.userModel.findByPk(user.userId);
    if (!_user) {
      Logger.error(`Couldn't find user with id = ${user.userId}`, '', 'TicketService', true);
      throw new NotFoundException(UserBusinessErrors.NotFound);
    }

    if (user.userId != ticket.applicantId && user.role == Role.USER) {
      Logger.error(`User(id:${user.userId}) aren't allowed to add messages to ticket(id:${id})`, '', 'TicketService', true);
      throw new UnauthorizedException(TicketBusinessErrors.UnauthorizedMessageCreate);
    }

    await this.messageModel.create({ text: messageDto.text, userId: user.userId, ticketId: ticket.id });

    return this.ticketModel.scope("one").findByPk(id);
  }


  findAll(page: number, elements: number): Promise<{ rows: Ticket[], count: number }> {
    if (page <= 0) {
      Logger.error(`Page must be more than 0`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }
    if (elements <= 0) {
      Logger.error(`Elements must be more than 0`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    return this.ticketModel.findAndCountAll({ limit: elements, offset: (page - 1) * elements });
  }


  async findOne(id: string, user: any): Promise<Ticket> {

    const ticket = await this.ticketModel.scope("basic").findByPk(id);

    if (!ticket) {
      Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (user.userId != ticket.applicantId && user.role == Role.USER) {
      Logger.error(`User(id:${user.userId}) aren't allowed to view tickets of other user`, '', 'TicketService', true);
      throw new UnauthorizedException(TicketBusinessErrors.UnauthorizedTicketAccess);
    }

    return this.ticketModel.scope("one").findByPk(id);
  }

  findByApplicantAndState(page: number, elements: number, id: string, user: any, state?: TicketState): Promise<{ rows: Ticket[], count: number }> {

    if (page <= 0) {
      Logger.error(`Page must be more than 0`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (elements <= 0) {
      Logger.error(`Elements must be more than 0`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (user.userId != id && user.role == Role.USER) {
      Logger.error(`User(id:${user.userId}) aren't allowed to view tickets of other user`, '', 'TicketService', true);
      throw new UnauthorizedException(TicketBusinessErrors.UnauthorizedTicketAccess);
    }

    if (!Object.values(TicketState).includes(state)) {
      return this.ticketModel.findAndCountAll({ where: { applicantId: Number(id) }, limit: elements, offset: (page - 1) * elements, });
    } else {
      console.log(state);
      return this.ticketModel.findAndCountAll({ where: { applicantId: Number(id) }, include: { model: State, where: { state: state } }, limit: elements, offset: (page - 1) * elements, });
    }
  }

  findByWorkerAndState(page: number, elements: number, id: string, state: TicketState): Promise<{ rows: Ticket[], count: number }> {

    if (page <= 0) {
      Logger.error(`Page must be more than 0`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (elements <= 0) {
      Logger.error(`Elements must be more than 0`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }
    let workerId = Number(id) <= 0 ? null : Number(id);

    if (!Object.values(TicketState).includes(state)) {
      return this.ticketModel.findAndCountAll({ where: { workerId: workerId }, limit: elements, offset: (page - 1) * elements, });
    } else {
      return this.ticketModel.findAndCountAll({ where: { workerId: workerId }, include: { model: State, where: { state: state } }, limit: elements, offset: (page - 1) * elements, });
    }
  }

  findByState(page: number, elements: number, state: TicketState): Promise<{ rows: Ticket[], count: number }> {

    if (page <= 0) {
      Logger.error(`Page must be more than 0`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (elements <= 0) {
      Logger.error(`Elements must be more than 0`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }


    return this.ticketModel.findAndCountAll({ include: { model: State, where: { state: state } }, limit: elements, offset: (page - 1) * elements, });
  }

  async cancelTicket(id: string, user: any): Promise<Ticket> {

    const ticket = await this.ticketModel.findByPk(id);

    if (!ticket) {
      Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (user.userId != ticket.applicantId) {
      Logger.error(`User aren't allowed to cancel ticket of other users`, '', 'TicketService', true);
      throw new NotAcceptableException(TicketBusinessErrors.UnauthorizedTicketCancel);
    }

    if (ticket.states[0].state == TicketState.CANCELED || ticket.states[0].state == TicketState.CLOSED || ticket.states[0].state == TicketState.COMPLETED) {
      //TODO: ERROR
      throw new NotAcceptableException(TicketBusinessErrors.UnauthorizedTicketCancel);
    }

    const t: Transaction = await this.sequelize.transaction();
    try {
      await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
      await this.stateModel.create({ state: TicketState.CANCELED, ticketId: id }, { transaction: t });
      const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
      t.commit();
      return _ticket;
    } catch (err) {
      t.rollback();
      throw err;
    }

  }

  async completeTicket(id: string): Promise<Ticket> {

    const ticket = await this.ticketModel.findByPk(id);

    if (!ticket) {
      Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (ticket.states[0].state != TicketState.INWORK) {
      Logger.error(`Couldn't complete ticket with id = ${id}, as it is not in "IN WORK" status`, '', 'TicketService', true);
      throw new NotAcceptableException(TicketBusinessErrors.TicketCompletionFailure);
    }

    const t: Transaction = await this.sequelize.transaction();
    try {
      await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
      await this.stateModel.create({ state: TicketState.WAITFORCONFRIMATION, ticketId: id }, { transaction: t });
      const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
      t.commit();
      return _ticket;
    } catch (err) {
      t.rollback();
      throw err;
    }
  }

  async confirmTicket(id: string, user: any): Promise<Ticket> {

    const ticket = await this.ticketModel.findByPk(id);

    if (!ticket) {
      Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (ticket.states[0].state != TicketState.WAITFORCONFRIMATION) {
      Logger.error(`Couldn't confirm ticket with id = ${id}, as it is not in "WAIT FOR CONFIRMATION" status`, '', 'TicketService', true);
      throw new NotAcceptableException(TicketBusinessErrors.TicketCompletionFailure);
    }

    if (user.userId != ticket.applicantId) {
      Logger.error(`User aren't allowed to confirm ticket of other users`, '', 'TicketService', true);
      throw new NotAcceptableException(TicketBusinessErrors.UnauthorizedTicketConfirm);
    }
    const t: Transaction = await this.sequelize.transaction();
    try {
      await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
      await this.stateModel.create({ state: TicketState.COMPLETED, ticketId: id }, { transaction: t });
      const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
      t.commit();
      return _ticket;
    } catch (err) {
      t.rollback();
      throw err;
    }

  }




  async closeTicket(id: string): Promise<Ticket> {

    const ticket = await this.ticketModel.findByPk(id);

    if (!ticket) {
      Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (ticket.states[0].state == TicketState.CANCELED || ticket.states[0].state == TicketState.CLOSED || ticket.states[0].state == TicketState.COMPLETED) {
      //TODO: ERROR
      throw new NotAcceptableException(TicketBusinessErrors.UnauthorizedTicketCancel);
    }

    const t: Transaction = await this.sequelize.transaction();
    try {
      await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
      await this.stateModel.create({ state: TicketState.CLOSED, ticketId: id }, { transaction: t });
      const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
      t.commit();
      return _ticket;
    } catch (err) {
      t.rollback();
      throw err;
    }

  }

  async rejectTicket(id: string, user: any): Promise<Ticket> {

    const ticket = await this.ticketModel.findByPk(id);

    if (!ticket) {
      Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }


    if (ticket.states[0].state != TicketState.WAITFORCONFRIMATION) {
      Logger.error(`Couldn't reject ticket with id = ${id}, as it is not in "WAIT FOR CONFIRMATION" status`, '', 'TicketService', true);
      throw new NotAcceptableException(TicketBusinessErrors.TicketRejectionFailure);
    }

    if (user.userId != ticket.applicantId) {
      Logger.error(`User aren't allowed to reject ticket of other users`, '', 'TicketService', true);
      throw new NotAcceptableException(TicketBusinessErrors.UnauthorizedTicketReject);
    }

    const t: Transaction = await this.sequelize.transaction();
    try {
      await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
      await this.stateModel.create({ state: TicketState.INWORK, ticketId: id }, { transaction: t });
      const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
      t.commit();
      return _ticket;
    } catch (err) {
      t.rollback();
      throw err;
    }
  }


  async changeState(id: string, stateS: TicketState): Promise<Ticket> {

    const ticket = await this.ticketModel.findByPk(id);

    if (!ticket) {
      Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (!Object.values(TicketState).includes(stateS)) {
      //TODO: ERROR
      throw new NotAcceptableException(TicketBusinessErrors.UnauthorizedTicketCancel);
    }

    if (ticket.states[0].state == stateS) {
      //TODO: ERROR
      throw new NotAcceptableException(TicketBusinessErrors.UnauthorizedTicketCancel);
    }

    if (ticket.states[0].state == TicketState.CANCELED || ticket.states[0].state == TicketState.COMPLETED) {
      //TODO: ERROR
      throw new NotAcceptableException(TicketBusinessErrors.UnauthorizedTicketCancel);
    }
    const t: Transaction = await this.sequelize.transaction();








    try {
      if (ticket.states[0].state == TicketState.CLOSED) {
        await this.stateModel.destroy({where: {ticketId: id, isActive: true}});
        const state = await this.stateModel.findOne({where: {ticketId:id}, order:["createdAt"]});
        if(state.state != stateS){
          await this.stateModel.create({ state: stateS, ticketId: id }, { transaction: t });
        } else {
          await state.update({isActive:true});
        }
      } else {
        await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
        await this.stateModel.create({ state: stateS, ticketId: id }, { transaction: t });
      }

      const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
      t.commit();
      return _ticket;
    } catch (err) {
      t.rollback();
      throw err;
    }
  }

  async changeCategory(id: string, categoryId: string): Promise<Ticket> {

    const ticket = await this.ticketModel.scope("basic").findByPk(id);

    if (!ticket) {
      Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    const category = await this.categoryModel.findByPk(categoryId);

    if (!category) {
      //TODO: ERROR
      throw new NotAcceptableException(TicketBusinessErrors.UnauthorizedTicketCancel);
    }
    ticket.update({ categoryId: categoryId });
    return this.ticketModel.scope('one').findByPk(id);
  }

  async assignWorker(ticketId: string, workerId: string, user: any): Promise<Ticket> {

    const ticket = await this.ticketModel.scope("basic").findByPk(ticketId);

    if (!ticket) {
      Logger.error(`Couldn't find ticket with id = ${ticketId}`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.NotFound);
    }

    if (user.userId != workerId && user.role == Role.TECHSUPPORT) {
      Logger.error(`User(id:${user.userId}) aren't allowed to assign tickets to other users`, '', 'TicketService', true);
      throw new UnauthorizedException(TicketBusinessErrors.UnauthorizedTicketAccess);
    }

    if (ticket.workerId != null && user.role == Role.TECHSUPPORT) {
      Logger.error(`User(id:${user.userId}) aren't allowed to change ticket worker`, '', 'TicketService', true);
      throw new UnauthorizedException(TicketBusinessErrors.TicketAlreadyInWork);
    }

    const _user = await this.userModel.findByPk(workerId);
    if (!_user) {
      workerId = null;
    }

    if (workerId != null && _user.role != Role.TECHSUPPORT) {
      Logger.error(`Users with role ${_user.role} aren't allow for worker position`, '', 'TicketService', true);
      throw new NotFoundException(TicketBusinessErrors.InvalidUser);
    }

    await ticket.update({ workerId: workerId });
    return await this.ticketModel.scope("one").findByPk(ticketId);
  }


}
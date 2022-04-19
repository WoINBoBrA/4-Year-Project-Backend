import { Controller, Get, Post, Body, Param, Delete, Request, Put, UseGuards, Patch } from '@nestjs/common';
import { TicketDto } from './ticket.dto';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/role.enum';
import { MessageDto } from 'src/modules/messages/message.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { TicketState } from './states/state.model';
import { ConfigModule } from '@nestjs/config';

@Controller('tickets')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class TicketController {
    constructor(
        private readonly ticketService: TicketService,
      ) {}

    @Get('config/page:page/elements:elements')
    @Roles(Role.TECHSUPPORT, Role.ADMIN)
    findAll(@Param('page') page: number, @Param('elements') elements: number) {
        return this.ticketService.findAll(page,elements);
    }

    @Get(':id')
    @Roles(Role.USER, Role.TECHSUPPORT, Role.ADMIN)
    findOne(@Param('id') id: string, @Request() req) {
        return this.ticketService.findOne(id,req.user);
    }

    @Get('applicant:id/state:state/config/page:page/elements:elements')
    @Roles(Role.USER, Role.ADMIN)
    findByApplicantAndState(@Param('page') page: number, @Param('elements') elements: number ,@Param('id') id: string, @Param("state") state: TicketState, @Request() req) {
        return this.ticketService.findByApplicantAndState(page, elements, id, state, req.user);
    }

    @Get('worker:id/state:state/config/page:page/elements:elements')
    @Roles(Role.TECHSUPPORT, Role.ADMIN)
    findByWorker(@Param('page') page: number, @Param('elements') elements: number, @Param('id') id: string, @Param("state") state: TicketState) {
        return this.ticketService.findByWorkerAndState(page, elements, id, state);
    }

    @Get('state:state/config/page:page/elements:elements')
    @Roles(Role.TECHSUPPORT, Role.ADMIN)
    findByState(@Param("state") state: TicketState,@Param('page') page: number, @Param('elements') elements: number){
        return this.ticketService.findByState(page,elements,state);
    }

    @Post()
    @Roles(Role.USER)
    create(@Body('ticket') ticketDto: TicketDto, @Body('message') messageDto: MessageDto, @Request() req) {
        return this.ticketService.create(ticketDto,messageDto, req.user);
    }

    @Post('message/:id')
    @Roles(Role.USER, Role.TECHSUPPORT, Role.ADMIN)
    createMessage(@Param('id') id: string, @Body() messageDto: MessageDto, @Request() req) {
        return this.ticketService.createMessage(id,messageDto, req.user);
    }

    @Patch('cancel/:id')
    @Roles(Role.USER)
    cancelTicket(@Param('id') id: string, @Request() req){
        return this.ticketService.cancelTicket(id, req.user);
    }

    @Patch('confirm/:id')
    @Roles(Role.USER)
    confirmTicket(@Param('id') id: string, @Request() req){
        return this.ticketService.confirmTicket(id, req.user);
    }

    @Patch('reject/:id')
    @Roles(Role.USER)
    rejectTicket(@Param('id') id: string, @Request() req){
        return this.ticketService.rejectTicket(id, req.user);
    }

    @Patch('close/:id')
    @Roles(Role.TECHSUPPORT, Role.ADMIN)
    closeTicket(@Param('id') id: string){
        return this.ticketService.closeTicket(id);
    }

    @Patch('complete/:id')
    @Roles(Role.TECHSUPPORT, Role.ADMIN)
    completeTicket(@Param('id') id: string){
        return this.ticketService.completeTicket(id);
    }

    @Patch(':id/state:state')
    @Roles(Role.ADMIN)
    changeState(@Param('id') id: string, @Param('state') state: TicketState){
        return this.ticketService.changeState(id,state);
    }

    @Patch('assign/:id')
    @Roles(Role.TECHSUPPORT, Role.ADMIN)
    assignTicket(@Param('id') ticketId: string, @Body("userId") userId: string, @Request() req){
        return this.ticketService.assignWorker(ticketId,userId,req.user);
    }

    @Patch(':id/category:id')
    @Roles(Role.TECHSUPPORT, Role.ADMIN)
    changeCategory(@Param('id') id: string, @Param("category") categoryId: string){
        return this.ticketService.changeCategory(id,categoryId);
    }

}
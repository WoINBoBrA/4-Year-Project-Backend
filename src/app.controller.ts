import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles/role.decorator';
import { Role } from './roles/role.enum';
import { AppService } from './app.service';


@Controller()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class AppController {
  constructor(private authService: AuthService, private appService: AppService) {}



  @Roles(Role.ADMIN)
  @Get('analytics/weekly')
  async weekStatistics(){
    return this.appService.WeekStatistics();
  }

  @Roles(Role.ADMIN)
  @Get('analytics/yearly')
  async yearStatistics(){
    return this.appService.YearStatistics();
  }
  
}
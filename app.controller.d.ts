import { AuthService } from './modules/auth/auth.service';
import { AppService } from './app.service';
export declare class AppController {
    private authService;
    private appService;
    constructor(authService: AuthService, appService: AppService);
    weekStatistics(): Promise<[import("./modules/tickets/ticket.model").Ticket[], import("./modules/tickets/states/state.model").State[], import("./modules/tickets/states/state.model").State[]]>;
    yearStatistics(): Promise<[import("./modules/tickets/ticket.model").Ticket[], import("./modules/tickets/states/state.model").State[], import("./modules/tickets/states/state.model").State[]]>;
}

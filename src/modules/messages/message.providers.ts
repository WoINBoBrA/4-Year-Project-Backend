import { MESSAGE_REPOSITORY } from "src/core/constants";
import { Message } from "./message.model";

export const messageProviders = [{
    provide: MESSAGE_REPOSITORY,
    useValue: Message,
}];
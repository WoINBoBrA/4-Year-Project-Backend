import { STATE_REPOSITORY } from "src/core/constants";
import { State } from "./state.model";

export const stateProviders = [{
  provide: STATE_REPOSITORY,
  useValue: State,
}];
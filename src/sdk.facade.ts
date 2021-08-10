import { injectable } from 'inversify';
import { SdkCommand, SdkCommandInvoker } from './sdk.command-invoker';
import { Constructor, OopsdkFactoryInput } from './sdk.factory';

/**
 * Class for making beautiful facades (aliases)
 */
@injectable()
export class SdkFacade {
  constructor(private commandInvoker: SdkCommandInvoker) {}

  command<C extends SdkCommand>(Command: Constructor<C>) {
    return (input?: OopsdkFactoryInput<C>) => this.commandInvoker.execute(Command, input);
  }
}

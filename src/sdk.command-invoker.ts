import { injectable } from 'inversify';
import { Constructor, OopsdkFactoryInput, SdkFactory } from './sdk.factory';

export interface ICommand {
  execute(): any;
}

@injectable()
export class SdkCommandInvoker {
  constructor(private factory: SdkFactory) {}

  execute<T extends ICommand>(cls: Constructor<T>, input?: OopsdkFactoryInput<T>): ReturnType<T['execute']> {
    const classObj = this.factory.instantiate(cls, input);
    return classObj.execute();
  }
}
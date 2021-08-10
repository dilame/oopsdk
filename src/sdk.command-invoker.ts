import { injectable } from 'inversify';
import { Constructor, OopsdkFactoryInput, SdkFactory } from './sdk.factory';

export interface ISdkCommand {
  execute(): any;
}

@injectable()
export class SdkCommandInvoker {
  constructor(private factory: SdkFactory) {}

  execute<T extends ISdkCommand>(cls: Constructor<T>, input?: OopsdkFactoryInput<T>): ReturnType<T['execute']> {
    const classObj = this.factory.instantiate(cls, input);
    return classObj.execute();
  }
}

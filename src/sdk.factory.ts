import { Container, injectable } from 'inversify';
import { INPUT_IDENTIFIER } from './sdk.input.decorator';

export type OopsdkFactoryInput<T> = T extends Inputable<infer Input> ? Input : never;
export type Constructor<T> = { new (...args: any[]): T };
export type Inputable<T = any> = {
  input: T;
};

@injectable()
export class SdkFactory {
  constructor(private container: Container) {}

  instantiate<T>(Cls: Constructor<T>, input?: OopsdkFactoryInput<T>): T {
    const container = this.container.createChild();
    container.bind(INPUT_IDENTIFIER).toDynamicValue(context => {
      const BaseClass = context.currentRequest.parentRequest?.serviceIdentifier;
      if (!BaseClass) {
        throw new Error(`@Input() decorator is only for constructor arguments / class property`);
      }
      const inversifyTagged = Reflect.getMetadata('inversify:tagged', BaseClass);
      const designParamtypes = Reflect.getMetadata('design:paramtypes', BaseClass);
      const inputIndex = Object.keys(inversifyTagged).find(index => {
        return inversifyTagged[index][0].value === INPUT_IDENTIFIER;
      });
      if (typeof inputIndex === 'undefined') {
        return input;
      }
      const InputType = designParamtypes[inputIndex];
      if (typeof input === 'undefined') {
        throw new Error(`${String(BaseClass)} requires input of type ${InputType}, but you don't provide it`);
      }
      if ([String, Number, Boolean, Symbol, BigInt, Object].includes(InputType)) {
        return input;
      }
      return Object.assign(new InputType(), input);
    });
    const instance = container.get(Cls);
    container.unbindAll();
    return instance;
  }
}

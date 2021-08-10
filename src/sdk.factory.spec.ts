import { Container, injectable } from 'inversify';
import { Inputable, SdkFactory } from './sdk.factory';
import { SdkInput } from './sdk.input.decorator';

describe('oopsdk factory', () => {
  const container = new Container({ autoBindInjectable: true });
  container.bind(Container).toConstantValue(container);
  const factory = container.get(SdkFactory);

  class TestInput {
    constructor(readonly hello: string) {}
  }

  @injectable()
  class TestClass {
    constructor() {}
  }

  @injectable()
  class TestClassInputable implements Inputable {
    constructor(readonly anotherDependency: TestClass, @SdkInput() readonly input: TestInput) {}
  }

  it('should instantiate inputable class with input', () => {
    const testClass = factory.instantiate(TestClassInputable, { hello: 'world' });
    expect(testClass.input.hello).toBe('world');
  });

  it('should throw if no input provided for inputable class', () => {
    expect(() => factory.instantiate(TestClassInputable)).toThrow();
  });

  it('should instantiate non-inputable class without input provided', () => {
    const testClass = factory.instantiate(TestClass);
    expect(testClass).toBeInstanceOf(TestClass);
  });
});

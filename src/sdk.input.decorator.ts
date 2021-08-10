import { inject } from 'inversify';

export const INPUT_IDENTIFIER = Symbol.for('input');

export function SdkInput() {
  return inject(INPUT_IDENTIFIER);
}

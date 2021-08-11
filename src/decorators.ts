import { inject, injectable } from 'inversify';

export const INPUT_IDENTIFIER = Symbol.for('input');

export function SdkInput() {
  return inject(INPUT_IDENTIFIER);
}

export function SdkCommand() {
  return injectable();
}

export function SdkComponent() {
  return injectable();
}

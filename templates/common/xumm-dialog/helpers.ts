import { WalletSubscription } from './types';

export const checkExpiration = (
  lastJsonMessage: WalletSubscription | null
): boolean | null => {
  if (
    lastJsonMessage &&
    'expires_in_seconds' in lastJsonMessage &&
    typeof lastJsonMessage.expires_in_seconds === 'number'
  ) {
    return lastJsonMessage.expires_in_seconds <= 0;
  }

  return null;
};

export const checkSigned = (
  lastJsonMessage: WalletSubscription | null
): boolean | null => {
  if (
    lastJsonMessage &&
    'signed' in lastJsonMessage &&
    typeof lastJsonMessage.signed === 'boolean'
  ) {
    return lastJsonMessage.signed;
  }

  return null;
};

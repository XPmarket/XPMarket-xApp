import { JsonValue } from 'react-use-websocket/dist/lib/types';

export type WalletSubscription =
  | {
      expires_in_seconds: number;
    }
  | {
      message: string;
    }
  | {
      opened: boolean;
    }
  | {
      payload_uuidv4: string;
      reference_call_uuidv4: string;
      signed: boolean;
      user_token: boolean;
      return_url: {
        app: null | string;
        web: null | string;
      };
      txid: string;
      opened_by_deeplink: boolean;
      custom_meta: {
        identifier: null | string;
        blob: null | string;
        instruction: null | string;
      };
    }
  | JsonValue;

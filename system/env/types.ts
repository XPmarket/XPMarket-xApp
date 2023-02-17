export type AppEnv = 'local' | 'dev' | 'prod';

export type NodeEnv = 'development' | 'production' | 'test';

export interface TypedEnv {
  client: ClientEnv;
  server: ServerEnv;
}

interface ClientEnv {
  appEnv: AppEnv;
  baseOrigin: string;
}

interface ServerEnv {
  nodeEnv: NodeEnv;
  port: string;
  prefetchEnabled?: boolean;
  xummApiKey?: string;
  xummApiSecret?: string;
}

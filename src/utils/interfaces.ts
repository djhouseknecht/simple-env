export type UnifiedEnvReturnObject<Obj extends IEnvOptionsObject> = {
  [key in keyof Obj]: TypeFromConstructor<
    Obj[key] extends IEnvOption
    ? Obj[key]['type']
    : StringConstructor
  >
};

export type TypeFromConstructor<T> = T extends BooleanConstructor
  ? boolean
  : T extends NumberConstructor ? number : string;

export type UnifiedEnvErrorObject<Obj extends IEnvOptionsObject> = { [key in keyof Obj]: string[] };


export type ValidType = StringConstructor | NumberConstructor | BooleanConstructor;
export type LogLevel = 'log' | 'debug' | 'info' | 'warn' | 'error';
export type TieBreakers = 'env' | 'argv' | 'file' | '__defaultValue';

export interface IEnvOptionsObject {
  // TODO: add `false` for a non-required string
  [key: string]: IEnvOption | true;
};

export interface IEnvOption {
  required?: boolean;
  // TODO: fix this to make it type safe
  defaultValue?: string | boolean | number;
  acceptableValues?: (string | boolean | number)[];
  type?: ValidType;
  tieBreaker?: TieBreakers;
};

export interface IObjectOfStings {
  [key: string]: string;
}

export interface IUnifiedEnvOptions {
  logLevel: LogLevel;
  logger: ILogger;
  // allowNonDeclaredVariables: boolean; // TODO: add this functionality
};

export interface ILogger {
  log (...args: any[]): void;
  debug (...args: any[]): void;
  info (...args: any[]): void;
  warn (...args: any[]): void;
  error (...args: any[]): void;
};

export interface IFileOptions {
  filePath: string;
  encoding: string;
  failIfNotFound: boolean;
};


/* possible features for the future */

// allow for variables to be required at different envs.
//  issue is you need to specify the order of required envs

// export type EnvType = boolean | 'prod' | 'test' | 'dev' | string;
// export type EnvOption = {
//   defaultValue?: string;
//   required?: EnvType;
//   acceptableValues?: string[];
//   type?: ValidType;
//   tieBreaker?: TieBreakers;
// };

// export interface IUnifiedEnvOptions {
//   logLevel: LogLevel;
//   logger: ILogger;
//   requireOrder: string[]; // would need this
//   orderField: string; // and this
// };

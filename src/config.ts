import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import _ from 'lodash';

process.env.TZ = 'UTC';

type ParsedEnvType = { [key: string]: string; };

const parsedEnvFile = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const localConfig: ParsedEnvType = parsedEnvFile || {};

const defaultConfig = dotenv.config({ path: path.normalize(`${__dirname}/../default.env`) }).parsed as ParsedEnvType;

const joinedConfig: ParsedEnvType = _.defaultsDeep({ ...localConfig }, defaultConfig);

export const envTypes = {
  dev: 'development',
  test: 'test',
  stage: 'staging',
  prod: 'production',
};

const envType = process.env.NODE_ENV || joinedConfig.NODE_ENV;
export const isDev = envType === envTypes.dev;
export const isTest = envType === envTypes.test;

const logWarn = (...args: unknown[]) => {
  if (isTest) {
    return;
  }

  console.warn('\x1b[33m%s\x1b[0m', '   WARN: ', ...args);
};

if (!parsedEnvFile) {
  logWarn('You don\'t have a .env file.');
} else if (Object.keys(localConfig).length < Object.keys(defaultConfig).length) {
  const localConfigFieldsCont = Object.keys(localConfig).length;
  const defaultConfigFieldsCont = Object.keys(defaultConfig).length;
  const missedFields = defaultConfigFieldsCont - localConfigFieldsCont;

  logWarn(`You have ${missedFields} missed fields in the .env file.`);
}

const transformStringToBool = (str: string): boolean => str === 'true';

const config = {
  server: {
    port: +joinedConfig.SERVER_PORT,
    bodySizeLimit: joinedConfig.SERVER_BODY_SIZE_LIMIT,
    isCorsEnabled: transformStringToBool(joinedConfig.SERVER_IS_CORS_ENABLED),
    endpointsPrefix: joinedConfig.SERVER_ENDPOINTS_PREFIX,
    internalErrorMessage: joinedConfig.SERVER_INTERNAL_ERROR_MESSAGE,
  },
  envType,
  logger: {
    timezone: joinedConfig.LOGGER_TIMEZONE,
    showInfoLogs: transformStringToBool(joinedConfig.LOGGER_SHOW_INFO_LOGS),
    showWarningLogs: transformStringToBool(joinedConfig.LOGGER_SHOW_WARNING_LOGS),
    showErrorLogs: transformStringToBool(joinedConfig.LOGGER_SHOW_ERROR_LOGS),
  },
  urls: {
    current: joinedConfig.CURRENT_URL,
    clientUrl: joinedConfig.CLIENT_URL,
  },
  isSwaggerEnabled: transformStringToBool(joinedConfig.IS_SWAGGER_ENABLED),
  maxMessages: +joinedConfig.MAX_MESSAGES,
};

export default config;

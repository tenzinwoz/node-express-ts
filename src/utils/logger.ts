import winston from "winston";

const consoleTransport = ():{
    return []
}

export const logger = winston.createLogger({
  defaultMeta: {
    meta: {}, //default meta data
  },
  transports: [

  ],
});

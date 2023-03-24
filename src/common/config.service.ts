import {
  RABBIT_EXCHANGE_NAMES,
  RABBIT_EXCHANGE_TYPES,
  RABBIT_CHANNEL_NAMES,
} from 'common/constant/rabbitmq';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

import * as dotenv from 'dotenv';

if (['development', 'test'].includes(process.env.NODE_ENV)) {
  dotenv.config({
    path: '.env.development',
  });
}

interface IRabbitConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

interface IConfig {
  nodeEnv: string;
  port: number;
  rabbit: IRabbitConfig;
}

export const APP_CONFIG: IConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: Number.parseInt(process.env.PORT, 10) || 5001,
  rabbit: {
    host: process.env.RABBIT_HOST,
    port: Number.parseInt(process.env.RABBIT_PORT, 10) || 5672,
    username: process.env.RABBIT_USERNAME || undefined,
    password: process.env.RABBIT_PASSWORD || undefined,
  },
};

export class ConfigService {
  private static instanceCache?: ConfigService;

  public static get instance(): ConfigService {
    if (!this.instanceCache) {
      this.instanceCache = new this();
    }

    return this.instanceCache;
  }

  get config() {
    return APP_CONFIG;
  }

  get rabbitAdvanceConfig(): RabbitMQConfig {
    const { username, password, port, host } = this.config.rabbit;
    const { CHANNEL_1, CHANNEL_2 } = RABBIT_CHANNEL_NAMES;
    const rabbitUri =
      username && password
        ? `amqp://${username}:${password}@${host}:${port}`
        : `amqp://${host}:${port}`;
    const options: RabbitMQConfig = {
      uri: rabbitUri,
      exchanges: [
        {
          name: RABBIT_EXCHANGE_NAMES.FANOUT,
          type: RABBIT_EXCHANGE_TYPES.FANOUT,
        },
      ],
      // channels: {
      //   [CHANNEL_1]: {
      //     prefetchCount: 5,
      //     default: true,
      //   },
      //   [CHANNEL_2]: {
      //     prefetchCount: 2,
      //   },
      // },
    };
    console.log('options =', options);

    return options;
  }
}

import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitSubscribe, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
  RABBIT_EXCHANGE_NAMES,
  RABBIT_QUEUE_NAMES,
  RABBIT_CHANNEL_NAMES,
  RABBIT_ROUTING_KEY,
} from 'common/constant/rabbitmq';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @RabbitRPC({
    exchange: RABBIT_EXCHANGE_NAMES.DIRECT,
    routingKey: RABBIT_ROUTING_KEY.RPC_MESSAGE,
    queue: RABBIT_QUEUE_NAMES.RPC_MESSAGE,
    queueOptions: {
      channel: RABBIT_CHANNEL_NAMES.CHANNEL_2,
    },
  })
  public async rpcHandler(payload: { message: string }) {
    console.log('\n ==> MESSAGE_RPC =', payload.message);
    return `Response - ${payload.message}`;
  }

  @RabbitSubscribe({
    exchange: RABBIT_EXCHANGE_NAMES.DIRECT,
    routingKey: RABBIT_ROUTING_KEY.MESSAGE,
    queue: RABBIT_QUEUE_NAMES.MESSAGE,
  })
  public async pubSubHandler(payload: { message: string }) {
    console.log('\n ==> MESSAGE =', payload.message);
  }
}

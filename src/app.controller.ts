import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitSubscribe, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
  RABBIT_EXCHANGE_NAMES,
  RABBIT_QUEUE_NAMES,
  RABBIT_CHANNEL_NAMES,
} from 'common/constant/rabbitmq';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @RabbitRPC({
    exchange: RABBIT_EXCHANGE_NAMES.FANOUT,
    routingKey: '',
    queue: 'routing-key-' + RABBIT_QUEUE_NAMES.MESSAGE,
    queueOptions: {
      channel: RABBIT_CHANNEL_NAMES.CHANNEL_2,
    },
  })
  public async rpcHandler(message: any) {
    console.log('\n ==> MESSAGE =', message);
  }

  @RabbitSubscribe({
    exchange: RABBIT_EXCHANGE_NAMES.FANOUT,
    routingKey: '',
    queue: 'routing-key/' + RABBIT_EXCHANGE_NAMES.FANOUT,
  })
  public async pubSubHandler(message: any) {
    console.log('\n ==> MESSAGE =', message);
  }
}

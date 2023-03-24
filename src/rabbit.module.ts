import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from 'common/config.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(
      RabbitMQModule,
      ConfigService.instance.rabbitAdvanceConfig,
    ),
    RabbitExampleModule,
  ],
  providers: [],
  controllers: [],
})
export class RabbitExampleModule {}

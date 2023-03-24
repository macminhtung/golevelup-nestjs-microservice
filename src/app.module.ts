import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from 'common/config.service';
import { RabbitExampleModule } from './rabbit.module';

@Module({
  imports: [
    RabbitMQModule.forRoot(
      RabbitMQModule,
      ConfigService.instance.rabbitAdvanceConfig,
    ),
    RabbitExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

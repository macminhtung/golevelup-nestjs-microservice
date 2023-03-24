import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from 'common/config.service';

async function bootstrap() {
  const port = ConfigService.instance.config.port;
  const app = await NestFactory.create(AppModule);

  await app.listen(port);
  console.info(`Server running on port ${port}`);
}
bootstrap();

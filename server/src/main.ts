import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './utils/logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });
  await app.listen(3000);
}
bootstrap();

import { config, NodeEnv } from '@app/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  if (config.nodeEnv === NodeEnv.dev) {
    const options = new DocumentBuilder()
      .setTitle('Easy Prize')
      .setDescription('Easy Prize API description')
      .setVersion(process.env.npm_package_version)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs/swagger', app, document);
  }

  await app.listen(config.port, config.host);
};

bootstrap().then();

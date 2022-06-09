import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';

export function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('lemon bubbles API')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModuleTest } from './app.module.test';

describe('Post (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModuleTest],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/posts (POST)', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'This is a post title',
        body: 'This is a post body',
        userId: 1,
        image: 'https://example.com/image.jpg',
      })
      .expect(201)
      .expect('Hello World!');
  });
});

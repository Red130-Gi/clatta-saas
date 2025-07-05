import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { Tenant } from '../src/tenant/entities/tenant.entity';
import { v4 as uuid } from 'uuid';

describe('StudentController (e2e)', () => {
  let app: INestApplication;
  let jwt: string;
  let createdId: string;
  const tenantId = uuid();

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const connection = app.get(DataSource);
    await connection.getRepository(Tenant).save({ id: tenantId, name: `Tenant ${tenantId}` });

    const jwtService = app.get(JwtService);
    jwt = jwtService.sign({ tenantId, sub: 'e2e-user' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create student', async () => {
    const res = await request(app.getHttpServer())
      .post('/student')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: 'John Doe' })
      .expect(201);

    createdId = res.body.id;
    expect(res.body).toMatchObject({ name: 'John Doe', tenantId });
  });

  it('should list students', async () => {
    const res = await request(app.getHttpServer())
      .get('/student')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get one student', async () => {
    const res = await request(app.getHttpServer())
      .get(`/student/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);

    expect(res.body.id).toBe(createdId);
  });

  it('should update student', async () => {
    await request(app.getHttpServer())
      .patch(`/student/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: 'Jane Doe' })
      .expect(200);

    const res = await request(app.getHttpServer())
      .get(`/student/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    expect(res.body.name).toBe('Jane Doe');
  });

  it('should delete student', async () => {
    await request(app.getHttpServer())
      .delete(`/student/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/student/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(404);
  });
});

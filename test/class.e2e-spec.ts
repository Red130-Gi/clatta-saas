import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { Tenant } from '../src/tenant/entities/tenant.entity';
import { v4 as uuid } from 'uuid';

describe('ClassController (e2e)', () => {
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

    // Insère un tenant pour respecter la contrainte FK
    const connection = app.get(DataSource);
    await connection.getRepository(Tenant).save({ id: tenantId, name: `Tenant ${tenantId}` });

    const jwtService = app.get(JwtService);
    jwt = jwtService.sign({ tenantId, sub: 'e2e-user' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create class', async () => {
    const res = await request(app.getHttpServer())
      .post('/class')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: 'Sixième A' })
      .expect(201);

    createdId = res.body.id;
    expect(res.body).toMatchObject({ name: 'Sixième A', tenantId });
  });

  it('should list classes', async () => {
    const res = await request(app.getHttpServer())
      .get('/class')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get one class', async () => {
    const res = await request(app.getHttpServer())
      .get(`/class/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);

    expect(res.body.id).toBe(createdId);
  });

  it('should update class', async () => {
    await request(app.getHttpServer())
      .patch(`/class/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: 'Sixième B' })
      .expect(200);

    const res = await request(app.getHttpServer())
      .get(`/class/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    expect(res.body.name).toBe('Sixième B');
  });

  it('should delete class', async () => {
    await request(app.getHttpServer())
      .delete(`/class/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/class/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(404);
  });
});

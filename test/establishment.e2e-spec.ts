import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { Tenant } from '../src/tenant/entities/tenant.entity';

describe('EstablishmentController (e2e)', () => {
  let app: INestApplication;
  let jwt: string;
  let createdId: string;
  const tenantId = '11111111-1111-1111-1111-111111111111';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    // Insère un tenant pour respecter la contrainte FK
    const connection = app.get(DataSource);
    await connection.getRepository(Tenant).save({ id: tenantId, name: "Tenant E2E" });

    const jwtService = app.get(JwtService);
    jwt = jwtService.sign({ tenantId, sub: 'e2e-user' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create establishment', async () => {
    const res = await request(app.getHttpServer())
      .post('/establishment')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: 'École E2E' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.tenantId).toBe(tenantId);
    createdId = res.body.id;
  });

  it('should list establishments', async () => {
    const res = await request(app.getHttpServer())
      .get('/establishment')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((e: any) => e.id === createdId)).toBe(true);
  });

  it('should get one establishment', async () => {
    const res = await request(app.getHttpServer())
      .get(`/establishment/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);

    expect(res.body.id).toBe(createdId);
    expect(res.body.tenantId).toBe(tenantId);
  });

  it('should update establishment', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/establishment/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: 'École E2E MAJ' })
      .expect(200);

    expect(res.body.name).toBe('École E2E MAJ');
  });

  it('should delete establishment', async () => {
    await request(app.getHttpServer())
      .delete(`/establishment/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/establishment/${createdId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(404);
  });
});

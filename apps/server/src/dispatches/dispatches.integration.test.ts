import "reflect-metadata";

import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { afterAll, beforeAll, expect, test } from "vitest";

import { AppModule } from "../app.module";

// Requires the docker database: `docker compose up -d db`
let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  app.setGlobalPrefix("rest");
  await app.init();
});

afterAll(async () => {
  await app.close();
});

test("GET /rest/dispatches returns the dispatch list", async () => {
  const res = await request(app.getHttpServer()).get("/rest/dispatches").expect(200);

  expect(Array.isArray(res.body)).toBe(true);
  for (const dispatch of res.body) {
    expect(dispatch).toMatchObject({
      id: expect.any(Number),
      code: expect.any(String),
      truckPlate: expect.any(String),
      material: expect.any(String),
      tons: expect.any(Number),
      date: expect.any(String),
      status: expect.any(String),
    });
  }
});

test("PATCH /rest/dispatches/:id rejects a body with unknown fields", async () => {
  await request(app.getHttpServer())
    .patch("/rest/dispatches/1")
    .send({ campoInventado: true })
    .expect(400);
});

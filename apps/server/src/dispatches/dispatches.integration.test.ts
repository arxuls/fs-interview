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

test("GET /rest/dispatches filters results by status when provided", async () => {
  const res = await request(app.getHttpServer())
    .get("/rest/dispatches")
    .query({ status: "in_transit" })
    .expect(200);

  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
  for (const dispatch of res.body) {
    expect(dispatch.status).toBe("in_transit");
  }
});

test("GET /rest/dispatches rejects an invalid status filter", async () => {
  await request(app.getHttpServer())
    .get("/rest/dispatches")
    .query({ status: "invalid_status" })
    .expect(400);
});

test("GET /rest/dispatches/stats returns totals by status for a date", async () => {
  const res = await request(app.getHttpServer())
    .get("/rest/dispatches/stats")
    .query({ date: "2026-08-25" })
    .expect(200);

  expect(res.body).toEqual({
    pending: 0,
    in_transit: 29.8,
    delivered: 59.5,
    cancelled: 0,
  });
});

test("GET /rest/dispatches/stats returns zero totals for a date without dispatches", async () => {
  const res = await request(app.getHttpServer())
    .get("/rest/dispatches/stats")
    .query({ date: "2026-09-01" })
    .expect(200);

  expect(res.body).toEqual({
    pending: 0,
    in_transit: 0,
    delivered: 0,
    cancelled: 0,
  });
});

test("GET /rest/dispatches/stats rejects an invalid date", async () => {
  await request(app.getHttpServer())
    .get("/rest/dispatches/stats")
    .query({ date: "2026-02-30" })
    .expect(400);
});

test("GET /rest/dispatches/stats rejects dates before the year 2000", async () => {
  await request(app.getHttpServer())
    .get("/rest/dispatches/stats")
    .query({ date: "1999-12-31" })
    .expect(400);
});

test("GET /rest/dispatches/stats rejects years with more than four digits", async () => {
  await request(app.getHttpServer())
    .get("/rest/dispatches/stats")
    .query({ date: "10000-01-01" })
    .expect(400);
});

test("PATCH /rest/dispatches/:id rejects a body with unknown fields", async () => {
  await request(app.getHttpServer())
    .patch("/rest/dispatches/1")
    .send({ campoInventado: true })
    .expect(400);
});

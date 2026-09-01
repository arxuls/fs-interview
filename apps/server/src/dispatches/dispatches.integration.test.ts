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

test("GET /rest/dispatches filtered by status returns the dispatch list for that status", async () => {
  const res = await request(app.getHttpServer())
    .get("/rest/dispatches")
    .query({ status: "delivered" })
    .expect(200);

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

test("GET /rest/dispatches rejects an unknown status", async () => {
  await request(app.getHttpServer())
    .get("/rest/dispatches")
    .query({ status: "flying" })
    .expect(400);
});

test("GET /rest/dispatches/stats returns the four statuses for a date", async () => {
  const res = await request(app.getHttpServer())
    .get("/rest/dispatches/stats")
    .query({ date: "2026-08-25" })
    .expect(200);

  expect(res.body.date).toBe("2026-08-25");
  expect(Object.keys(res.body.totals).sort()).toEqual([
    "cancelled",
    "delivered",
    "in_transit",
    "pending",
  ]);
  for (const tons of Object.values(res.body.totals)) {
    expect(typeof tons).toBe("number");
  }
});

test("GET /rest/dispatches/stats returns zeros for a date without dispatches", async () => {
  const res = await request(app.getHttpServer())
    .get("/rest/dispatches/stats")
    .query({ date: "1900-01-01" })
    .expect(200);

  expect(res.body.totals).toEqual({
    pending: 0,
    in_transit: 0,
    delivered: 0,
    cancelled: 0,
  });
});

test("GET /rest/dispatches/stats rejects an invalid date", async () => {
  await request(app.getHttpServer())
    .get("/rest/dispatches/stats")
    .query({ date: "2026-13-99" })
    .expect(400);
});

test("PATCH /rest/dispatches/:id rejects a body with unknown fields", async () => {
  await request(app.getHttpServer())
    .patch("/rest/dispatches/1")
    .send({ campoInventado: true })
    .expect(400);
});

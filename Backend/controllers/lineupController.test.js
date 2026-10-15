import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import Tournament from "../models/Tournament";
import Entry from "../models/Entry";
import User from "../models/User";
import jwt from "jsonwebtoken";

describe("createLineup", () => {
  let token;
  let user;
  let tournament;

  beforeAll(async () => {
    user = await User.create({
      name: "Jake",
      email: "jake@test.com",
      password: "pass123"
    });

    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    tournament = await Tournament.create({
      name: "Past Tournament",
      startDate: new Date(Date.now() - 10000) // already started
    });

    await Entry.create({ golferId: new mongoose.Types.ObjectId() });
    await Entry.create({ golferId: new mongoose.Types.ObjectId() });
    await Entry.create({ golferId: new mongoose.Types.ObjectId() });
    await Entry.create({ golferId: new mongoose.Types.ObjectId() });
  });

  test("rejects lineup creation after tournament start", async () => {
    const entries = await Entry.find();

    const res = await request(app)
      .post("/api/lineups")
      .set("Authorization", `Bearer ${token}`)
      .send({
        tournamentId: tournament._id,
        entryIds: entries.map(e => e._id)
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/already started/i);
  });
});

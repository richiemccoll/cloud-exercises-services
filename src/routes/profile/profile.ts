import { FastifyInstance } from "fastify";
import getProfile from "./getProfile.js";

export default async function profileRoutes(fastify: FastifyInstance) {
  getProfile(fastify);
}
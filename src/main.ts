import express from "express";
import ViteExpress from "vite-express";
import SuperJSON from "superjson";
import { createUser, enrichUser } from "./user.js";

export type { AuthUser, AuthUserData } from './user.js';

const app = express();

const authUserData = createUser("John Doe");
const authUser = enrichUser(authUserData);

app.get("/get-user", (_, res) => {
	console.log("User says", authUser.getGreeting());

	res.json(SuperJSON.serialize(authUserData));
});

ViteExpress.listen(app, 3000, () =>
	console.log("Server is listening on port 3000..."),
);

import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { pool } from "./db/pool";

import healthRouter from "./routers/health";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, World!");
});

app.use(healthRouter);

const PORT = process.env.PORT || 3000;

async function start() {
	try {
		await pool.connect();
		await pool.query("SELECT 1"); // Test the database connection
		console.log("Connected to the database");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1);
	}
}

start();

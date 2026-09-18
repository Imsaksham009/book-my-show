import { Router } from "express";
import type { Request, Response } from "express";
import { pool } from "../db/pool";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({ status: "ok", uptime: process.uptime() });
});

router.get("/health/ready", async (_req: Request, res: Response) => {
	try {
		const start = Date.now();
		await pool.query("SELECT 1");
		res.status(200).json({
			status: "ready",
			db: { status: "up", latencyMs: Date.now() - start },
		});
	} catch (err) {
		console.error("Readiness check failed:", err);
		res.status(503).json({ status: "not_ready", db: { status: "down" } });
	}
});

export default router;

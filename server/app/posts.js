import { pool } from "../utils/db.js";
import { Router } from "express";

const washRouter = Router();

washRouter.get("/", async (req, res) => {

    const results = await pool.query(`select washing_id,count(*)*10  as total from washing_machines
group by washing_id`)

    return res.json({
        data: results.rows
    });

})

washRouter.post("/", async (req, res) => {
    console.log(req.body)

    await pool.query(`
    INSERT INTO public.washing_machines(
     washing_id)
    VALUES ($1);`, [req.body.timerId])

    return res.json({
        message: `has been updated.`,
    });



});

export default washRouter;
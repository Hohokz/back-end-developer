import { pool } from "../utils/db.js";
import { Router, response } from "express";
import qs from 'qs';
import axios from 'axios';

let dataMessage = qs.stringify({
    'message': 'you have 1 min left'
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://notify-api.line.me/api/notify',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer Ur1WwZeWxA91MfQNXzp7BSoayIfjTgts6KJgqGrU918'
    },
    data: dataMessage
};



const washRouter = Router();

washRouter.get("/", async (req, res) => {

    const results = await pool.query(`select washing_id,count(*)*10 as total from washing_machines group by washing_id`)

    return res.json({
        data: results.rows
    });

})

washRouter.post('/send', async (req, res) => {

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
})

washRouter.post("/", async (req, res) => {
    console.log(req.body)

    await pool.query(`
    INSERT INTO washing_machines(
     washing_id)
    VALUES ($1);`, [req.body.timerId])

    return res.json({
        message: `has been updated.`,
    });





});

export default washRouter;
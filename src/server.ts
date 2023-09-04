import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { userRoutes, orderRoutes, productRoutes } from './handler/handler.js';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})



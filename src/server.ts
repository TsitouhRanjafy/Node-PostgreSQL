import dotenv from 'dotenv'
import express, { Application, urlencoded, Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import { createServer } from 'node:http'
import path from 'node:path'


dotenv.config();
const app: Application = express();
const server = createServer(app);
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'../public'));
app.use(express.json());
app.use(urlencoded({ extended: true }));






app.get('/', (req: Request, res: Response) => {
    const data = {
        name: 'Tsitohaina'
    }
    res.status(StatusCodes.OK).render('index',data)
})

app.get('/about', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).render('about')
})

app.get('/data', (req: Request, res: Response) => {
    const test = {
        titre: 'test',
        items: ['un','deux','trois']
    }
    res.status(StatusCodes.OK).render('data',{ model: test })
})

server.listen(PORT, () => {
    console.log(` server running at http://localhost:${PORT}`);
})
import dotenv from 'dotenv'
import express, { Application, urlencoded, Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import { createServer } from 'node:http'
import path from 'node:path'
import { Pool } from 'pg'
import { createClient } from '@supabase/supabase-js'





dotenv.config();
const app: Application = express();
const server = createServer(app);
const PORT = process.env.PORT || 4000;
const pool = new Pool()

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'../public'));
app.use(express.json());
app.use(urlencoded({ extended: true }));


app.get('/',async (req: Request, res: Response) => {

    const nom = req.query.nom
    if (!nom){
        res.status(StatusCodes.BAD_REQUEST).send("query nom required")
        return
    }
    const { data,error } = await supabase.from('noms').insert([{ nom : nom}])
    if (error){
        console.error("Erreur lors de l'insertion:",error.message)
        return
    } 
    console.log("Nom enregistrer avec succès: ",data);
    res.status(StatusCodes.OK).render('index',{ name: nom })
})

app.get('/about', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).render('about')
})

app.get('/data', async (req: Request, res: Response) => {
    const test = {
        titre: 'test',
        items: ['un','deux','trois']
    }
    let { data: noms,error } = await supabase
        .from('noms')
        .select('*')
    if (error){
        console.error("Erreur lors de récupération des données:",error);
        return
    }
    console.log("+++++++",noms);
    
    res.status(StatusCodes.OK).render('data',{model: noms})
})

server.listen(PORT, () => {
    console.log(` server running at http://localhost:${PORT}`);
})
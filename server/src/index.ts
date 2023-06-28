import path from 'path';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/appRouter';
import morgan from 'morgan';
import { createContext } from './trpc';

(async () => {

const PORT = process.env.PORT; 
 
const app = express();
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use('/trpc', createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
})); 

app.use('/resource/:name', (req, res) => {
    const name = req.params.name;
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.resolve(__dirname, '../resources', name));
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

})();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import calculatorRoutes from "./routes/calculatorRoutes.js";
import seoToolRoutes from './routes/seoToolRoutes.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('MERN Tools Backend is running');
});
// Routes
app.use("/api/calculator", calculatorRoutes);
app.use('/api/seo', seoToolRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
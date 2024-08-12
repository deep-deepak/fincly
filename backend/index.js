const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


// Define API routes
const userRouter = require('./routes/userRoute');
const companyRouter = require('./routes/companyRoute');
const documentRouter = require('./routes/documentRoute');


app.use('/', userRouter);
app.use('/', companyRouter);
app.use('/', documentRouter);
// app listen port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

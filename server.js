const express = require('express');
const PORT = 5000;

const app = express(); //app 생성
const productRoutes = require("./routes");
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://summer:abcd1234@cluster0.ihsow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    }).then(()=> console.log('MongoDB Connected..'))
    .catch(err => console.log(err));

app.use("/api/products",productRoutes); // 해당 경로요청이 오면 productRoute로 가기
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Hello World');
});

app.listen(PORT); //app 실행
console.log(`Running on port ${PORT}`)

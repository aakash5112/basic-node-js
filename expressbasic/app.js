const express= require('express');
const app=express();
app.use(express.json());
app.use(express.static('public'));

// console.log(app);
app.get('/home',(req,res)=>{
    res.send('home page');
})
app.get('/contact',(req,res)=>{
    res.status(200).send('contact page');
})
app.get('/about',(req,res)=>{
    res.send('about page');
})
app.get('/login',(req,res)=>{
    res.send('login page');
})
app.post('/login',(req,res)=>{
    // console.log("req",req);
    // console.log("res",res);
    console.log(req.body);
    res.send('login complete');
})

app.get('/product/shoes',(req,res)=>{
    res.send('data send');
})

app.get('/product/:cat/:id',(req,res)=>{
    if(Number(req.params.id)){
         console.log("req.params",req.params);
    console.log("Product ID:", req.params.id);
    console.log("Product cat:", req.params.pid);
    res.send('Product page');
    }
    res.send("wrong path");

});


app.get('/search', (req, res) => {

    console.log("req.query", req.query);

    res.send(`Searching for: ${req.query.name}`);

});


app.listen(3300,()=>{
    console.log("server is runing");
})
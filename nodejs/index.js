const http=require('http');
const port=3300;

// console.log(http);

const server= http.createServer((req,res)=>{

       // // console.log("Request received");
    // // console.log("Request object:", req);
    // // console.log("URL:", req.url);
    // // console.log("Method:", req.method);
    // // console.log("Headers:", req.headers);

    
    //  res.statusCode=200;
    // res.statusMessage="ok done ji";
    // res.setHeader('content-type','text/plain');
    // res.write("Hello, this is a simple response!");
    // // res.writeHead(200,{'content-type':'text/plain'});
    // res.end('its nodejs');

    // res.writeHead(200,{'content-type':'text/plain'});
    // res.end("hello nodejs");

 if(req.url==='/home' || req.url==='/'){
        res.end('home page');
    }else if(req.url==='/contact'){
        res.end('contact page');
    }else if(req.url==='/about'){
        res.end('about page');
    }else if(req.url==='/login' && req.method==='GET'){
        res.end('login page');
    }else if(req.url==='/login' && req.method==='POST'){
        let body='';
        req.on('data',chunck=>{
            body+=chunck;
        })
        res.on('end',()=>{
            req.end("data submit");
        });
    }
    else{
        res.statusCode=404
        res.end('page not found');
    }

})

server.listen(port,()=>{
    console.log("server runing on port no",port);
})


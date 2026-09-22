const fs=require('fs');

// console.log(fs);

// fs.readFile('text.txt','utf8',(err,data)=>{
//     // console.log(data);
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
    
// })

const input=process.argv[2];
fs.writeFile('text.txt',input,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("sucess");
    }
});

// Create a program that searches a directory for 
// files with a specific extension and copies them to a 
// new directory. (Recusive/Non Recursive)

// fs.appendFile('text.txt','\n hello fs module',(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("sucess");
//     }
// })



// fs.unlink('text.txt',(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("delete");
//     }
// })


// console.log("hello");
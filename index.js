import { createServer } from "node:http";
import path , { extname ,join} from "node:path";
import { readFileSync,existsSync ,createReadStream } from "node:fs"

const server = createServer((req,res)=>{
    // console.log("req",req);
    console.log("req accepting",req.url);


    if (req.url === "/favicon.ico") {
        res.writeHead(204, { "Content-Type": "image/x-icon" });
        return res.end();
    }

    const filePath = join('client' , req.url)

    if (existsSync(filePath)) {
        const ext = extname(filePath);
        let contentType = "text/plain"; // Default Content-Type

        // MIME type mapping
        const mimeTypes = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".svg": "image/svg+xml",
            ".gif": "image/gif",
            ".ico": "image/x-icon",
            ".woff": "font/woff",
            ".woff2": "font/woff2",
            ".ttf": "font/ttf",
            ".otf": "font/otf",
            ".json": "application/json",
        };

        contentType = mimeTypes[ext] || contentType;

        res.writeHead(200, { "Content-Type": contentType });

        // Stream file instead of reading it all at once (better performance)
        createReadStream(filePath).pipe(res);
        return;
    }



    if(req.url === "/home"){
        // res.end(()=>{
        //     readFileSync("../client/index.html")
        // }
        res.writeHead("200",{"Content-Type":"text/html"})
        const data = readFileSync("./client/index.html");
        res.write(data);
        res.end();
    }
    else if(req.url === "/about"){
        res.writeHead("200",{"Content-Type":"text/html"})
        const data = readFileSync("./client/about.html");
        res.write(data);
    }
    else if(req.url === "/contact"){
        res.writeHead("200",{"Content-Type":"text/html"})
        const data = readFileSync("./client/contact.html");
        res.write(data);
    }
    // else if(req.url === "/about"){
    //     res.end("home")
    // }
    else{
        res.writeHead("200",{"Content-Type":"text/html"})
        res.end("<h1>404 <br> Page Not Found</h1>");
        console.log("req not found",req.url);
    }
})


try {
    server.listen(3000,()=>{
        console.log("server is running on 3000");
    });
} catch (error) {
    console.log("error",error);
}
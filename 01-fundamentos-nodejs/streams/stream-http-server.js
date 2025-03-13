import http from 'node:http'
import { Transform } from 'node:stream'


class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString())*-1;

        console.log(transformed);

        const buff = Buffer.from(String(transformed));
        
        callback(null, buff);
    }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer( (req,res) => {
    return req
        .pipe(new InverseNumberStream())
        //.pipe(res); //volta para o cliente
});

server.listen(3334);
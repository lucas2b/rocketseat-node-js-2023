import { Readable, Writable, Transform } from 'node:stream'

class OneToHundred extends Readable{
    index = 1;
    
    _read(){
        const i = this.index++;

        setTimeout(() => {
            if(i>100){
                this.push(null);
            }else{
                const buff = new Buffer.from(String(i));
                this.push(buff);
            }
        } ,1000);
    }
}

class InverseNumberStream extends Transform{
    
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString())*-1;

        const buff = Buffer.from(String(transformed));
        
        callback(null, buff);
    }
}

class MultiplyByTenStream extends Writable{

    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10) ;
        callback();

    }
}

new OneToHundred()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream());
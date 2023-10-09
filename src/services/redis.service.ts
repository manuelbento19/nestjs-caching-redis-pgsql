import {Injectable} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis{
    constructor(){
        super();
        super.on('error',(error)=>{
            console.error('Error',error)
            process.exit(1);
        })
        super.on('connect',()=>{
            console.info("Redis's connected");
        })
    }
}
import { Redis } from "ioredis";
import { config } from "./config.js";
var client = new Redis({
    host: config.redis_host,
    port: config.redis_port,
  });

  var promiser=(resolve,reject)=>{
    return(err,data)=>{
      if(err) reject(err);
      resolve(data);
    }
  }

 var storeUser=(socketID,user)=>{
    return new Promise((resolve,reject)=>{
        client.setex(socketID,config.expire,user,promiser(resolve,reject));
    })
 }

 var getUser=(socketID)=>{
    return new Promise((resolve,reject)=>{
        client.get(socketID,promiser(resolve,reject));
      // test errors here
       //client.get(socketID, 12345,promiser(resolve,reject))
    })
 }

  export {client,storeUser,getUser};
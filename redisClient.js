const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => console.log(`Redis client error: ${err}`));

async function startRedis(){
    if(!client.isOpen){
        await client.connect();
        console.log("Connected to redis");
    }
}

module.exports = {client, startRedis};
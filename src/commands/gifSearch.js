const axios = require('axios');
require('dotenv').config();

module.exports = {
    name: "gif",
    description: 'Searches the great platform that is tenor for a gif the satisfies the query',
    run(msg, args) {
        const url = `https://g.tenor.com/v1/search?q=${args.join('+')}&key=${process.env.TENOR_KEY}&limit=1`;
        
        axios.get(url).then((response) => {
            const { data } = response;
            const gif = data.results[0].itemurl;
            msg.channel.send(gif);
        })
    }
}
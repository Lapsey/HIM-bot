module.exports = {
    name: "uptime",
    description: 'gives you the amount of time that the bot has been running for',
    run(msg, args) {
      const uptimeMs = msg.client.uptime;
      const readableTime = 
        parseMillisecondsIntoReadableTime(uptimeMs);

      msg.reply(readableTime);
    }
}

function parseMillisecondsIntoReadableTime(milliseconds){
  //Get hours from milliseconds
  let hours = milliseconds / (1000*60*60);
  let absoluteHours = Math.floor(hours);
  let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  let minutes = (hours - absoluteHours) * 60;
  let absoluteMinutes = Math.floor(minutes);
  let m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  let seconds = (minutes - absoluteMinutes) * 60;
  let absoluteSeconds = Math.floor(seconds);
  let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


  return h + ':' + m + ':' + s;
}

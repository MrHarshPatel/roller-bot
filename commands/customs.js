const logger = require('../logger.js');


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

exports.run = (client, message, args) => {
    console.log('Creating new custom game...')

    maxPlayers = args[0]
    if(args[0] === undefined){
        maxPlayers = 10
    }

    console.log('Max amount of reactions: ', maxPlayers)
    message.channel.send("Yoooooo @here, customs are starting! React with 👍 to join in! React with ⭐ once everyone's in!").then(gameMessage => {
        gameMessage.react('👍');

        const joinReactionFilter = (reaction, user) => {
            return reaction.emoji.name === '👍' && user.id !== gameMessage.author.id;
        }
        
        const startReactionFilter = (reaction, user) => {
            // Can only be started by person who did !customs command.
            return reaction.emoji.name === '⭐' && user.id === message.author.id;
        }

        let joinReactionCollector = gameMessage.createReactionCollector(joinReactionFilter, {time: 1800000, max: maxPlayers});
        let startReactionCollector = gameMessage.createReactionCollector(startReactionFilter, {time: 1800000});
    
        joinReactionCollector.on('end', collected => {
            console.log('in here!')
            var users = []
            console.log(collected.forEach((reaction => reaction.users.forEach(console.log))));

            collected.forEach((reaction => reaction.users.forEach(user => {
                users.append(user)
            })));

            console.log(users)

            shuffle(users);
    
            let half = Math.floor(users.length / 2)
            
            let teamOne = users.slice(0, half);
            let teamTwo = users.slice(half, users.length);
            
            message.channel.send(`Team One: ${teamOne.join(' ')} \n Team Two: ${teamTwo.join(' ')}`).catch(console.error);
        });

        startReactionCollector.on('collect', (reaction, user) => {
            console.log('starting custom!')
            joinReactionCollector.stop('Starting custom!')
        });
    
    }).catch(console.error);

}
module.exports = (client, message) => {
    const serverMusicQueue = client.queue.get(message.guild.id)

    // Ignore all bots
    if (message.author.bot) return;
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.settings.cmdPrefix) !== 0) return;
    // Our standard argument/command name definition.
    const args = message.content.slice(client.settings.cmdPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
    // Run the command
    if(command == 'play' || command == 'stop'){
        cmd.run(client, message, args, serverMusicQueue)
    }
    else{
        cmd.run(client, message, args);
    }

};

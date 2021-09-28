const organize = (msg) => {
    if (msg.text != '') {
        let chatId = msg.chat.id
        type = msg.chat.type

        if (msg.text.search('/')!= -1) {
            let regexCommand = /(\/\w+ )(.*)/g
            let result = regexCommand.exec(msg.text)
            if(result == null){
                let regexCommand = /(\/\w+)/g
                let result = regexCommand.exec(msg.text)
                let command = result[1].trim().replace('\/', '')
                return { chatId: chatId, command: command, text: '' }
            }
            let command = result[1].trim().replace('\/', '')
            let rest = result[2]

            return { chatId: chatId, command: command, text: rest, type: type  }
        } else {
            return { chatId: chatId, command: '', text: msg.text, type: type  }
        }
    }
    return { chatId: '', command: '', text: '', type: '' }
}

exports.organize = organize

const sendMessage = (bot, id, message) => {
    bot.sendMessage(id, message)
}

exports.sendMessage = sendMessage
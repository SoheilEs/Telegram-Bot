const {Telegraf} = require("telegraf")
const {message} = require("telegraf/filters")
const dotenv = require("dotenv")
dotenv.config()
const bot = new Telegraf(process.env.BOT_TOKEN)


bot.on(message("document"),async(ctx)=>{
    try{
        ctx.sendChatAction("upload_document")
        const fileID = ctx.message.document.file_id
        const link = await bot.telegram.getFileLink(fileID)
        ctx.reply(link,{
            reply_to_message_id: ctx.message.message_id
        })
    }catch(error){
        ctx.reply(error?.message ?? error.description)
    }
})
bot.on(message("photo"),async(ctx)=>{
    try{
        ctx.sendChatAction("upload_photo")
        const photoID = ctx.message.photo[0].file_id
        const link = await bot.telegram.getFileLink(photoID)
        ctx.reply(link,{
            reply_to_message_id: ctx.message.message_id
        })
    }catch(error){
        ctx.reply(error?.message ?? error.description)
    }
})

bot.launch()
const {Telegraf} = require("telegraf")
const {message} = require("telegraf/filters")
const dotenv = require("dotenv")
const { default: axios } = require("axios")
dotenv.config()
const bot = new Telegraf(process.env.BOT_TOKEN)
const API_URL =`https://min-api.cryptocompare.com/data/price?fsyms=BTC&tsyms=USD,EUR`
bot.command("crypto", ctx => {
    bot.telegram.sendMessage(ctx.chat.id,"منوی اصلی",{
        reply_to_message_id: ctx.message.message_id,
        reply_markup:{
            inline_keyboard:[
                [
                    {text:"قیمت رمز ارزها",callback_data:"pricing"},
                ],
                [
                    {text:"CoinList(cryptoCompare)",url:"https://www.cryptocompare.com/coins/list/all/USD/1"},
                   
                ],
              
            ]
        }
    })
})
bot.action("pricing",ctx=>{
    ctx.answerCbQuery()
    ctx.deleteMessage()
    bot.telegram.sendMessage(ctx.chat.id,"لطفا یکی از ارزهای دجیتال زیر  را انتخاب کنید : ",{
        reply_markup:{
            inline_keyboard:[
                [
                    {text:"BTC",callback_data:"BTC"},
                    {text:"ETH",callback_data:"ETH"}
                ],
                [
                    {text:"USDT",callback_data:"USDT"},
                    {text:"BUSD",callback_data:"BUSD"}
                ],
                [
                    {text:"منو اصلی",callback_data:"mainMenu"},
                    
                ],
              
            ]
        }
    })
})
bot.action("mainMenu",ctx=>{
    ctx.answerCbQuery()
    ctx.deleteMessage()
    bot.telegram.sendMessage(ctx.chat.id,"منوی اصلی",{
        reply_markup:{
            inline_keyboard:[
                [
                    {text:"قیمت رمز ارزها",callback_data:"pricing"},
                ],
                [
                    {text:"CoinList(cryptoCompare)",url:"https://www.cryptocompare.com/coins/list/all/USD/1"},
                   
                ],
              
            ]
        }
    })
})
bot.action(["BTC","ETH","USDT","BUSD"],ctx=>{
try{

    const API_URL =`https://min-api.cryptocompare.com/data/price?fsym=${ctx.match}&tsyms=USD&api_key=${process.env.CRYPTO_TOKEN}`
    axios.get(API_URL).then(res=> ctx.reply(`${Object.keys(res.data)[0]}: ${Math.round(Object.values(res.data)[0])}`))

}catch(error){
    ctx.reply(error?.message ?? error?.description)
}
  ctx.answerCbQuery()
})

bot.launch()
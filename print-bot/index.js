const { Telegraf,Markup } = require("telegraf");

const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const { createReadStream } = require("fs");
const bot = new Telegraf(process.env.BOT_TOKEN);

const helpText = `
Help for use this bot:
/start - start the bot
/print - The Print command can send message to print
/cities - Show list of Cities 
/help -  help 
`;
bot.start(async (ctx) => {
  ctx.sendChatAction("typing");
  await ctx.reply("Hello I am Print Bot");
  await ctx.reply(helpText,Markup.keyboard(['/start','/print','/cities','/help']).oneTime().resize());
});

bot.help(async (ctx) => {
  await ctx.reply(helpText);
});
bot.command("print", async (ctx) => {
  ctx.sendChatAction("typing");
  const msg = ctx.message.text;
  const listOfMsg = msg.split(" ");

  let message;
  if (listOfMsg.length === 1) {
    message = "You said print";
  } else {
    message = listOfMsg.splice(1).join(" ");
  }
  await ctx.reply(message);
});
bot.command("cities", async (ctx) => {
  ctx.sendChatAction("typing");
  const cityMessage = `
    List of cities:
    /Tehran - Iran
    /NewYork - USA
    /Germany - Berlin
    /Turkey - Istanbul
    `;
  await ctx.reply(cityMessage);
});
bot.command(["tehran", "Tehran"], async (ctx) => {
  // bot.telegram.sendChatAction(ctx.chat.id,"upload_photo")
  ctx.sendChatAction("upload_photo");
  const tehran = path.join(__dirname, "cities", "tehran.jpeg");
  ctx.sendPhoto(
    {
      source: createReadStream(tehran),
    },
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});
bot.command(["NewYork", "newyork", "Newyork"], async (ctx) => {
  ctx.sendChatAction("upload_photo");
  const newYork = path.join(__dirname, "cities", "nyk.jpeg");
  ctx.sendPhoto(
    {
      source: createReadStream(newYork),
    },
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});
bot.command(["Turkey", "turkey"], async (ctx) => {
  ctx.sendChatAction("upload_photo");
  const istanbul = path.join(__dirname, "cities", "istanbul.jpeg");
  ctx.sendPhoto(
    {
      source: createReadStream(istanbul),
    },
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});
bot.command(["Germany", "germany"], async (ctx) => {
  ctx.sendChatAction("upload_photo");
  const berlin = path.join(__dirname, "cities", "berlin.jpeg");
  ctx.sendPhoto(
    {
      source: createReadStream(berlin),
    },
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});


bot.launch();

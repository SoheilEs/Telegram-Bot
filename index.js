const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// ---------------- Middlewares ---------------------------
bot.use((ctx, next) => {
  const msg = ctx.message.text;
  if (msg === "soheil") return next();
  return ctx.reply("msg is not soheil");
});


// -------------------------------------------Command---------------
bot.command("start", (ctx) => {
  ctx.reply("Hello wellcome my bot");
});
bot.command("help", (ctx) => {
  ctx.reply("For use bot please read help first:");
});
bot.command(["setting", "menu", "tools", "Settings", "settings"], (ctx) => {
  ctx.reply("Hello form settings");
});
bot.command("ctx", (ctx) => {
  const { from, chat, message, botInfo } = ctx;
  console.log(JSON.stringify({ from, chat, message, botInfo }, null, 4));
  ctx.reply("logging....");
});

// ------------------------Hears----------------------------------

bot.hears("salam", (ctx) => {
  ctx.reply("salam khobi ?");
});

bot.hears(/.salam./, (ctx) => {
  ctx.reply("salam khobi ?");
});
bot.hears(["bad", "biadab", "bisharaf"], async (ctx) => {
  await ctx.deleteMessage(ctx.message.message_id);
  await ctx.reply("warring! this kind of words Disallowed");
});

// -------------------- Events Trigger ------------------------------
bot.on("text", async (ctx) => {
  await ctx.reply("you send text for me");
});
bot.on("video", async (ctx) => {
  await ctx.reply("you send video for me");
});
bot.on("sticker", async (ctx) => {
  await ctx.reply("you send stiker for me");
});
bot.on("voice", async (ctx) => {
  await ctx.reply("you send voice for me");
});

bot.on("new_chat_photo", async (ctx) => {
  await ctx.reply("Admin changes Group photo ! Thank you admin");
});
bot.on("new_chat_members", async (ctx) => {
  let username;
  ctx.message.new_chat_members.map(
    (member) => (username = member.username || member.first_name)
  );
  await ctx.reply(`Welcome Dear ${username}`);
});

bot.launch();

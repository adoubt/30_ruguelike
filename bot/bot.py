from aiogram import Bot, Dispatcher, executor, types

API_TOKEN = "YOUR_BOT_TOKEN"
WEB_APP_URL = "https://your-domain.com"  # URL игры

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=["start"])
async def send_game(message: types.Message):
    keyboard = types.InlineKeyboardMarkup()
    keyboard.add(types.InlineKeyboardButton("Играть!", web_app=types.WebAppInfo(url=WEB_APP_URL)))
    await message.answer("Добро пожаловать в рогалик!", reply_markup=keyboard)

if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)

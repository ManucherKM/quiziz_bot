import { Keyboard } from "grammy";

export const again = new Keyboard()
    .text("🔄 Попробовать снова").row()
    .text("🔙 Назад").row()
    .resized();
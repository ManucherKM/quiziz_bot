import { Keyboard } from "grammy";

export const again = new Keyboard()
    .text("🔄 Еще раз").row()
    .text("🔙 Назад").row()
    .resized();
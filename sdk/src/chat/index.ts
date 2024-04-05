import { Base } from "../base";
import ChatBot from "./ChatBot";

export class Chat extends Base {
  chat(): ChatBot {
    return new ChatBot();
  }
}

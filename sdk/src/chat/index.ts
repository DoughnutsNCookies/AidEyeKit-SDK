import { Base } from "../base";

class ChatBot {
  ask(question: string): string {
    console.log(`Question asked: ${question}`);
    return "I don't know";
  }

  guide(response: string): void {
    console.log(`Guiding based on response: ${response}`);
  }
}

export class Chat extends Base {
  chat(): ChatBot {
    return new ChatBot();
  }
}

import io, { Socket } from "socket.io-client";

const namespace = "chat";

class ChatBot {
  private socket: Socket;

  constructor(url: string) {
    this.socket = io(`${url}/${namespace}`);
  }

  ask(question: string): string[] {
    this.socket.emit("chat", question);

    const messages: string[] = [];
    this.socket.on("chat", (message) => {
      console.log(message);
      messages.push(message);
    });
    return messages;
  }

  guide(response: string[]): void {
    console.log(`Guiding based on response: ${response}`);
  }
}

export default ChatBot;

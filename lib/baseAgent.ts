import { rcsClient } from './rcsClient';

export class BaseAgent {
  protected readonly agentId: string = process.env.PINNACLE_AGENT_ID!;
  protected readonly client = rcsClient;
  protected readonly TEST_MODE = process.env.TEST_MODE === 'true';

  async sendMessage(to: string, text: string) {
    return await this.client.messages.rcs.send({
      from: this.agentId,
      to,
      text,
      quickReplies: [],
    });
  }

  async sendButtonOnlyMessage(to: string) {
    return await this.client.messages.rcs.send({
      from: this.agentId,
      to,
      text: 'This agent does not process text messages. Please use the buttons provided to interact.',
      quickReplies: [
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }

  async sendStrictFormatMessage(to: string, formatInstructions: string) {
    return await this.client.messages.rcs.send({
      from: this.agentId,
      to,
      text: formatInstructions,
      quickReplies: [
        {
          type: 'trigger',
          title: '🏠 Main Menu',
          payload: JSON.stringify({ action: 'mainMenu' }),
        },
      ],
      options: { test_mode: this.TEST_MODE },
    });
  }
}

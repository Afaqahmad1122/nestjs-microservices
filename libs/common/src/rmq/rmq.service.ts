import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import type { Channel, Message } from 'amqplib';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Creates configuration options for a RabbitMQ microservice.
   * This ensures all our services use consistent settings.
   *
   * @param queue - The name of the queue to connect to (e.g., 'CATALOG')
   * @param noAck - Whether to automatically acknowledge messages (default: false)
   *                false means we must manually acknowledge messages after processing.
   */
  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBIT_MQ_URI')!],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`)!,
        noAck,
        persistent: true,
      },
    };
  }

  /**
   * Manually acknowledges a message.
   * This tells RabbitMQ "I have successfully processed this message, you can delete it now."
   *
   * @param context - The execution context containing the message details
   */
  ack(context: RmqContext) {
    const channel = context.getChannelRef() as Channel;
    const originalMessage = context.getMessage() as Message;
    channel.ack(originalMessage);
  }
}

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class ApiPrismaService extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> implements OnModuleInit {

  readonly #logger = new Logger(ApiPrismaService.name);

  constructor() {
    super({ log: ['query', 'info', 'warn', 'error'] });
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      this.#logger.log(
        `Params: ${ event.params }`,
        `Duration: ${ event.duration } ms`,
      );
    });
    this.$on('info', (event) => {
      this.#logger.log(`info: ${ event.message }`);
    });
    this.$on('warn', (event) => {
      this.#logger.log(`warn: ${ event.message }`);
    });
    this.$on('error', (event) => {
      this.#logger.log(`error: ${ event.message }`);
    });

    await this.$connect();
  }
}

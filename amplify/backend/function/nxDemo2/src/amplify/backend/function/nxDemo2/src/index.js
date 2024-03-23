import { __awaiter } from "tslib";
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../../../../../apps/api/src/app/app.module';
import * as express from 'express';
import { config } from 'aws-sdk';
const binaryMimeTypes = [];
let cachedServer;
function bootstrapServer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cachedServer) {
            const expressApp = express();
            const nestApp = yield NestFactory.create(AppModule, new ExpressAdapter(expressApp));
            nestApp.use(eventContext());
            config.update({ region: process.env.REGION });
            yield nestApp.init();
            cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
        }
        return cachedServer;
    });
}
export const handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    cachedServer = yield bootstrapServer();
    return proxy(cachedServer, event, context, 'PROMISE').promise;
});
//# sourceMappingURL=index.js.map
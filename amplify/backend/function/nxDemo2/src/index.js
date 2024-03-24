require('module-alias/register');
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const tslib_1 = require("tslib");
const aws_serverless_express_1 = require("aws-serverless-express");
const middleware_1 = require("aws-serverless-express/middleware");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./apps/api/src/app/app.module");
const express = require("express");
const aws_sdk_1 = require("aws-sdk");
const binaryMimeTypes = [];
let cachedServer;
function bootstrapServer() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!cachedServer) {
            const expressApp = express();
            const nestApp = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
            nestApp.use((0, middleware_1.eventContext)());
            aws_sdk_1.config.update({ region: process.env.REGION });
            yield nestApp.init();
            cachedServer = (0, aws_serverless_express_1.createServer)(expressApp, undefined, binaryMimeTypes);
        }
        return cachedServer;
    });
}
const handler = (event, context) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    cachedServer = yield bootstrapServer();
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
});
exports.handler = handler;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    setupSwagger(app);
    await app.listen(3000);
}
function setupSwagger(app) {
    const builder = new swagger_1.DocumentBuilder();
    const config = builder
        .setTitle('petKnow 寵知')
        .setDescription('this is a basic Swagger document.')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const options = {
        explorer: true,
    };
    swagger_1.SwaggerModule.setup('api', app, document, options);
}
bootstrap();
//# sourceMappingURL=main.js.map
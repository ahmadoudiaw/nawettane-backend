"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = Number(process.env.PORT ?? 3000);
    const rawOrigin = process.env.CORS_ORIGIN;
    const corsOrigin = rawOrigin
        ? rawOrigin.split(',').map((o) => o.trim())
        : true;
    app.enableCors({
        origin: corsOrigin,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('NAWETTANE Backend API')
        .setDescription('MVP backend for Nawettane ticketing, scan, and reporting.')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, swaggerDocument);
    await app.listen(port, '0.0.0.0');
    console.log(`NAWETTANE backend listening on http://0.0.0.0:${port}/api`);
}
void bootstrap();
//# sourceMappingURL=main.js.map
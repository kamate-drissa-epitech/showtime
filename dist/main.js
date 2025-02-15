"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.engine('hbs', hbs.engine({
        extname: 'hbs',
        partialsDir: (0, path_1.join)(__dirname, '..', 'views/partials'),
        defaultLayout: false,
    }));
    app.setViewEngine('hbs');
    app.use(cookieParser());
    app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
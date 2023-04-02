"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryModule = void 0;
const common_1 = require("@nestjs/common");
const library_service_1 = require("./library.service");
const library_controller_1 = require("./library.controller");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const library_entity_1 = require("./entities/library.entity");
const config_1 = require("@nestjs/config");
let LibraryModule = class LibraryModule {
};
LibraryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([library_entity_1.Library]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                expandVariables: true
            })
        ],
        controllers: [library_controller_1.LibraryController],
        providers: [library_service_1.LibraryService]
    })
], LibraryModule);
exports.LibraryModule = LibraryModule;
//# sourceMappingURL=library.module.js.map
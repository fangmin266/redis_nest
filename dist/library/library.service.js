"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const library_entity_1 = require("./entities/library.entity");
const cache_manager_1 = require("cache-manager");
let LibraryService = class LibraryService {
    constructor(libraryRepo, httpService, configService, cacheManager) {
        this.libraryRepo = libraryRepo;
        this.httpService = httpService;
        this.configService = configService;
        this.cacheManager = cacheManager;
    }
    async getBooks() {
        const cacheData = await this.cacheManager.get('libraryData');
        if (cacheData !== null) {
            console.log(cacheData, 'cache');
            return cacheData;
        }
        console.log('dbdata');
        return this.libraryRepo.findBy({});
    }
    async getBookId(id) {
        const cacheData = await this.cacheManager.get('libraryData');
        if (cacheData.includes(id) !== null) {
            console.log("cache");
            const filterData = await cacheData.filter(el => el.id.includes(id));
            return filterData;
        }
        console.log("database");
        return await this.libraryRepo.findOneBy({ id });
    }
    async postBooks() {
        const { data, status } = await this.httpService.get(this.configService.get('LIBRARY_ADDRESS')).toPromise();
        if (status === 200) {
            const datas = data.data;
            const libraryData = [];
            datas === null || datas === void 0 ? void 0 : datas.map(data => (libraryData.push({
                bookname: data['도서명'],
                libraryname: data['자료실명'],
                writer: data['저자명'],
                publisher: data['출판사명'],
            })));
            const savedData = await this.libraryRepo.save(libraryData);
            console.log(libraryData, 'libraryData');
            await this.cacheManager.set('libraryData', libraryData);
            return savedData;
        }
    }
    async clearAll() {
        await this.libraryRepo.delete({});
        await this.cacheManager.del('libraryData');
        return 'delete all';
    }
};
LibraryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(library_entity_1.Library)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        config_1.ConfigService, typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object])
], LibraryService);
exports.LibraryService = LibraryService;
//# sourceMappingURL=library.service.js.map
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Library } from './entities/library.entity';
import { Cache } from 'cache-manager';
export declare class LibraryService {
    readonly libraryRepo: Repository<Library>;
    private readonly httpService;
    private readonly configService;
    private cacheManager;
    constructor(libraryRepo: Repository<Library>, httpService: HttpService, configService: ConfigService, cacheManager: Cache);
    getBooks(): Promise<any>;
    getBookId(id: string): Promise<any>;
    postBooks(): Promise<any[]>;
    clearAll(): Promise<string>;
}

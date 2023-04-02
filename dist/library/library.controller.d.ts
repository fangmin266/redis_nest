import { LibraryService } from './library.service';
export declare class LibraryController {
    private readonly libraryService;
    constructor(libraryService: LibraryService);
    postLibraryData(): Promise<any[]>;
    getLibraries(): Promise<any>;
    getLibraryId(id: string): Promise<any>;
    deleteAll(): Promise<string>;
}

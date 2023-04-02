import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  async postLibraryData(){
    return await this.libraryService.postBooks()
  }

  @Get()
  async getLibraries(){
    return await this.libraryService.getBooks();
  }

  @Get(':id')
  async getLibraryId(@Param('id') id:string){
    return await this.libraryService.getBookId(id);
  }


  @Delete()
  async deleteAll() {
    return await this.libraryService.clearAll();
  }
}

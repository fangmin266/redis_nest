import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { Library } from './entities/library.entity';
import {Cache} from 'cache-manager'
import { Cron } from '@nestjs/schedule';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    public readonly libraryRepo: Repository<Library>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
    ){
  }
  async getBooks() {
    const cacheData =  await this.cacheManager.get('libraryData')

    if(cacheData !== null){
      console.log(cacheData,'cache')
      return cacheData
    }
    console.log('dbdata')
    return this.libraryRepo.findBy({})
  }

  async getBookId(id:string) {
    const cacheData =  await this.cacheManager.get('libraryData')

    if(cacheData.includes(id) !== null ){
      console.log("cache")
      const filterData = await cacheData.filter(el => el.id.includes(id))
      return filterData;
    }
    console.log("database")
    return await this.libraryRepo.findOneBy({id})
  }


  async postBooks() {
    const {data,status} = await this.httpService.get(this.configService.get('LIBRARY_ADDRESS')).toPromise()
    
    if(status === 200) {
      const datas = data.data
      const libraryData = [];
      datas?.map(data =>(
        libraryData.push({
          bookname: data['도서명'],
          libraryname:data['자료실명'],
          writer:data['저자명'],
          publisher:data['출판사명'],
        })
      ))
      const savedData =  await this.libraryRepo.save(libraryData)
      console.log(libraryData,'libraryData')
      await this.cacheManager.set('libraryData',libraryData)
      return savedData
    }
  }
  async clearAll() {
    await this.libraryRepo.delete({})
    await this.cacheManager.del('libraryData')
    return 'delete all'
  }

  // 데이터 최신화 
  // @Cron('45 * * * * *')
  // async handleCron() {
  //   console.log("crone active")
  //   await this.clearAll();
  //   await this.postBooks();
  // }
}

import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { In, Repository } from 'typeorm';
import { HomeEntity } from '../shared/home.entity';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(HomeEntity)
    private readonly homeRepository: Repository<HomeEntity>,
  ) {}

  // async saveHome(home: HomeEntity) {
  //   return await this.homeRepository.save(home);
  // }

  // async saveHomes(homes: HomeEntity[]) {
  //   return await this.homeRepository.save(homes);
  // }

  async create(createHomeDto: CreateHomeDto) {
    const createHome = this.homeRepository.create({
      ...createHomeDto,
      image_url: createHomeDto.image_url,
    });
    return await this.saveHome(this.homeRepository.create(createHome));
  }

  findAll() {
    return `This action returns all home`;
  }

  findOne(id: number) {
    return `This action returns a #${id} home`;
  }

  update(id: number, updateHomeDto: UpdateHomeDto) {
    return `This action updates a #${id} home`;
  }

  remove(id: number) {
    return `This action removes a #${id} home`;
  }
}

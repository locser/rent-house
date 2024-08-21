import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class DataSourceService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async checkExistOne<T>(entityClass: new () => T, findOneOptionWhere: FindOptionsWhere<T>) {
    const entity = await this.dataSource.getRepository(entityClass).exists({ where: findOneOptionWhere });

    if (!entity) {
      throw new HttpException(`${entityClass.name} not found`, HttpStatus.BAD_REQUEST);
    }
  }

  async checkAllExist<T>(entityClass: new () => T, findOneOptionWhere: FindOptionsWhere<T>, length: number) {
    const entities = await this.dataSource.getRepository(entityClass).find({ where: findOneOptionWhere });

    if (entities.length !== length) {
      throw new HttpException(`${entityClass.name} not found`, HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  async findOne<T>(entityClass: new () => T, findOneOptionWhere: FindOptionsWhere<T>): Promise<T | null> {
    // const repository: Repository<T> = this.dataSource.getRepository(entityClass);
    // const findOneOptionWhere: FindOptionsWhere<T> = { where: { id: id } };
    const entity = await this.dataSource.getRepository(entityClass).findOne({ where: findOneOptionWhere });
    return entity || null;
  }

  // find many by ids
  async find<T>(entityClass: new () => T, findOneOptionWhere: FindOptionsWhere<T>): Promise<T[]> {
    const repository: Repository<T> = this.dataSource.getRepository(entityClass);

    const foundEntities = await repository.find({
      where: findOneOptionWhere,
    });

    return foundEntities;
  }

  // find many by where condition
  async findManyOptions<T>(entityClass: new () => T, where: FindOptionsWhere<T>): Promise<T[]> {
    const repository: Repository<T> = this.dataSource.getRepository(entityClass);
    const foundEntities = await repository.find({ where: where });
    return foundEntities;
  }

  // save one entity
  async save<T>(entityClass: new () => T, newEntity: T): Promise<T> {
    const repository: Repository<T> = this.dataSource.getRepository(entityClass);
    const savedEntity = await repository.save(newEntity);
    return savedEntity;
  }
}

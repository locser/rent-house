import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WishlistEntity } from './entities/wishlist.entity';
import { UserEntity } from '../user/entities/user.entity';
import { QueryPaginationDTO } from 'src/utils.common/utils.validator.common/query-pagination';
import { Pagination } from 'src/utils.common/utils.pagination.pagination/utils.pagination';
import { DataSourceService } from 'src/database-source/database_source.service';
import { HomeEntity } from '../home/entities/home.entity';
import { BaseListResponseData } from 'src/utils.common/utils.response.common/utils.base-list.response.common';
import { PaginationWishlistUserResponse } from './res/pagination-wishlist-user.res';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(WishlistEntity)
    private selfRepository: Repository<WishlistEntity>,
    private readonly dataSourceService: DataSourceService,
  ) {}

  async create(user: UserEntity, createWishlistDto: Partial<WishlistEntity>): Promise<WishlistEntity> {
    // check if user already has a wishlist
    const wishlist = await this.selfRepository.findOne({ where: { user_id: user.id, home_id: createWishlistDto.home_id } });
    if (wishlist) {
      return;
    }

    const newWishlist = this.selfRepository.create({
      user_id: user.id,
      home_id: createWishlistDto.home_id,
    });

    return this.selfRepository.save(newWishlist);
  }

  async findAll(user: UserEntity, query: QueryPaginationDTO) {
    const { limit = 20, page = 1 } = query;

    const pagination = new Pagination(limit, page);

    const [wishlist, total_record] = await this.selfRepository.findAndCount({
      where: {
        user_id: user.id,
      },
      order: {
        id: 'DESC',
      },
      take: pagination.getLimit(),
      skip: pagination.getOffset(),
    });

    if (!wishlist.length) return [];

    const listHouseId: number[] = wishlist.map((item) => item.home_id);

    const mapHouses = await this.dataSourceService
      .findManyOptions(HomeEntity, {
        id: In(listHouseId),
      })
      .then((result) => {
        result.reduce((acc, cur) => {
          acc[cur.id] = cur;

          return acc;
        }, {});
      });

    const baseListResponse = new BaseListResponseData(
      wishlist.map((item) => {
        new PaginationWishlistUserResponse(item, mapHouses[item.home_id]);
      }),
      pagination.getLimit(),
      total_record,
    );
    return baseListResponse;
  }

  async findOne(user: UserEntity, id: number) {
    const wishlist = await this.selfRepository.findOne({ where: { id: id, user_id: user.id } });
    if (!wishlist) {
      throw new HttpException('Không tìm thấy nội dung', HttpStatus.BAD_REQUEST);
    }

    const house = await this.dataSourceService.findOne(HomeEntity, {
      id: wishlist.home_id,
    });

    return new PaginationWishlistUserResponse(wishlist, house);
  }

  async update(user: UserEntity, id: number, updateData: Partial<WishlistEntity>) {
    return;
  }

  async remove(user: UserEntity, id: number): Promise<void> {
    const wishlist = await this.selfRepository.findOne({ where: { id: id, user_id: user.id } });
    if (!wishlist) {
      throw new NotFoundException('Không tìm thấy nội dung');
    }

    await this.selfRepository.remove(wishlist);

    return;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In, MoreThan, Repository } from 'typeorm';
import { CreateHomeDto } from './dto/create-home.dto';
import { HomeEntity } from './entities/home.entity';

import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { DataSourceService } from 'src/database-source/database_source.service';
import { BOOKING_STATUS } from 'src/utils.common/utils.enum.common/utils.booking.enum';
import { HOME_STATUS } from 'src/utils.common/utils.enum.common/utils.home.enum';
import { Pagination } from 'src/utils.common/utils.pagination.pagination/utils.pagination';
import { BookingEntity } from '../booking/entities/booking.entity';
import { AddressEntity } from '../shared/address.entity';
import { UserEntity } from '../user/entities/user.entity';
import { BodyBookingDto } from './dto/body-booking.dto';
import { TopHomeEntity } from './entities/top-home.entity';
import { CreateServiceDto } from './dto/create-services.dto';
import { ServiceEntity } from './entities/service.entity';
import { BodyAssignServicesDto } from './dto/body-assign-services.dto';

@Injectable()
export class HomeService {
  async listServices() {
    return await this.serviceRepository.find();
  }
  async deleteServices(id: number) {
    await this.serviceRepository.delete({ id: id });
  }

  constructor(
    @InjectRepository(HomeEntity)
    private readonly homeRepository: Repository<HomeEntity>,

    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,

    private readonly dataSourceService: DataSourceService,
  ) {}

  async getTopHome() {
    const topHome = await this.dataSourceService.find(
      TopHomeEntity,
      {
        valid_from_date: MoreThan(new Date()),
      },
      { position: 'DESC' },
    );

    const homes = await this.homeRepository.find({
      where: {
        id: In(topHome.map((item) => item.home_id)),
      },
    });

    return topHome.map((item) => {
      const home = homes.find((home) => home.id === item.home_id);

      return home;
    });
  }

  async create(createHomeDto: CreateHomeDto, user: UserEntity) {
    let address: AddressEntity = new AddressEntity();
    // addresses.id = createHomeDto.address_id;
    address.detail = createHomeDto.detail;
    address.ward_id = createHomeDto.ward_id;
    address.district_id = createHomeDto.district_id;
    address.city_id = createHomeDto.city_id;

    address = await this.dataSourceService.save(AddressEntity, address);

    const newHome = new HomeEntity();

    newHome.id = createHomeDto.id;
    newHome.title = createHomeDto.title;
    newHome.description = createHomeDto.description;
    newHome.address_id = createHomeDto.address_id;
    newHome.deposit = createHomeDto.deposit;
    newHome.price = createHomeDto.price;
    newHome.rating = createHomeDto.rating;
    newHome.type = createHomeDto.type;
    newHome.gender = createHomeDto.gender;
    newHome.max_number_people = createHomeDto.max_number_people;
    newHome.status = createHomeDto.status;
    newHome.services = createHomeDto.services;
    newHome.latitude = createHomeDto.latitude;
    newHome.longitude = createHomeDto.longitude;
    newHome.image_url = createHomeDto.image_url;
    newHome.deposit_amount = createHomeDto.deposit_amount;
    newHome.withdrawal_period = createHomeDto.withdrawal_period;
    newHome.owner_id = user.id;

    return await this.save(newHome);
  }

  // find with pagination
  async findPagination(query: Pagination) {
    return await this.homeRepository.find({
      where: {},
      order: { id: 'DESC' },
      take: query.getLimit(),
      skip: query.getOffset(),
    });
  }

  async getDetail(id: number) {
    return await this.homeRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateHome(id: number, homeDto: CreateHomeDto) {
    const newHome: HomeEntity = await this.findOne(id);
    if (!newHome) {
      throw new HttpException('Home not found', HttpStatus.NOT_FOUND);
    }

    const address = await this.dataSourceService.findOne(AddressEntity, {
      id: homeDto.address_id,
    });

    // addresses.id = createHomeDto.address_id;
    address.detail = homeDto.detail;
    address.ward_id = homeDto.ward_id;
    address.district_id = homeDto.district_id;
    address.city_id = homeDto.city_id;

    await this.dataSourceService.save(AddressEntity, address);

    newHome.title = homeDto.title;
    newHome.description = homeDto.description;
    newHome.address_id = homeDto.address_id;
    newHome.deposit = homeDto.deposit;
    newHome.price = homeDto.price;
    newHome.rating = homeDto.rating;
    newHome.type = homeDto.type;
    newHome.gender = homeDto.gender;
    newHome.max_number_people = homeDto.max_number_people;
    newHome.status = homeDto.status;
    newHome.services = homeDto.services;
    newHome.latitude = homeDto.latitude;
    newHome.longitude = homeDto.longitude;
    newHome.image_url = homeDto.image_url;
    newHome.deposit_amount = homeDto.deposit_amount;
    newHome.withdrawal_period = homeDto.withdrawal_period;

    await this.save(newHome);

    return newHome;
  }

  async booking(id: number, user: UserEntity, body: BodyBookingDto) {
    const home = await this.findOne(id);

    if (!home || home.status === HOME_STATUS.REMOVE) {
      throw new HttpException('Không tìm thấy phòng này', HttpStatus.NOT_FOUND);
    }

    if (home.status === HOME_STATUS.RENT) {
      throw new HttpException('Phòng đã được đặt trước đó', HttpStatus.BAD_REQUEST);
    }

    const newBooking = new BookingEntity();

    newBooking.home_id = id;
    newBooking.user_booking_id = user.id;
    // newBooking.start_date = new Date();
    // newBooking.end_date = new Date();
    newBooking.status = BOOKING_STATUS.SCHEDULED;
    newBooking.note = 'Booking by user';
    newBooking.booking_date = body?.booking_date ? new Date(moment().format('YYYY-MM-DD HH:mm') || '') : new Date();

    await this.dataSourceService.save(BookingEntity, newBooking);

    return newBooking;
  }

  async updateServices(id: number, body: any) {
    const service = await this.serviceRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!service) {
      throw new HttpException('Dịch vụ không tồn tại!', HttpStatus.BAD_REQUEST);
    }

    // check name of service if exist throw error

    const service_exist = await this.dataSourceService.findOne(ServiceEntity, {
      name: body.name,
    });

    if (service_exist && service_exist.id !== service.id) {
      throw new HttpException('Dịch vụ này đã có trong hệ thống!', HttpStatus.BAD_REQUEST);
    }

    service.name = body.name;
    service.price = body.price;
    service.type = body.type;
    service.description = body.description;

    return await this.dataSourceService.save(ServiceEntity, service);
  }
  async assignServices(id: number, body: BodyAssignServicesDto) {
    // check body service_ids is all exist
    const services = await this.dataSourceService.find(ServiceEntity, {
      id: In(body.service_ids),
    });

    if (services.length !== body.service_ids.length) {
      throw new HttpException('Dịch vụ không tồn tại!', HttpStatus.BAD_REQUEST);
    }

    return await this.homeRepository.update(
      { id: id },
      {
        services: body.service_ids,
      },
    );
  }
  async createService(body: CreateServiceDto) {
    //check name of service if exist return false
    const service = await this.dataSourceService.findOne(ServiceEntity, {
      name: body.name,
    });

    if (service) {
      throw new HttpException('Dịch vụ này đã có trong hệ thống!', HttpStatus.BAD_REQUEST);
    }

    let newService = this.serviceRepository.create({
      price: body.price,
      type: body.type,
      name: body.name,
      description: body.description,
    });
    newService = await this.serviceRepository.save(newService);

    return newService;
  }

  async findOne(id: number) {
    return await this.homeRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number, userId: number) {
    const home = await this.findOne(id);

    if (!home || home?.owner_id !== userId) {
      throw new HttpException('Bạn không có quyền truy cập dữ liệu này!', HttpStatus.BAD_REQUEST);
    }

    home.status = HOME_STATUS.REMOVE;

    return await this.save(home);
  }

  //
  async save(home: HomeEntity) {
    return await this.homeRepository.save(home);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSourceService } from 'src/database-source/database_source.service';
import { USER_STATUS } from 'src/utils.common/utils.enum.common/utils.user.enum';
import { DataSource, Repository } from 'typeorm';
import { AddressEntity } from '../shared/address.entity';
import { RequestWithUser } from '../shared/request-with-user.response';
import { BodyUpdateUserAddressDto } from './dto/body-update-user-address.dto';
import { BlockEntity } from './entities/block.entity';
import { UserEntity } from './entities/user.entity';
import { UserProfileResponse } from './response/user-profile.response';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,

    @InjectRepository(BlockEntity)
    private readonly blockUsersRepository: Repository<BlockEntity>,

    private readonly dataSourceService: DataSourceService,

    // @InjectRepository(UserToken.name)
    // private readonly userTokenRepository: Repository<UserToken>,

    // @InjectRepository(Conversation.name)
    // private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async updateUser(req: RequestWithUser, body: Partial<UserEntity>) {
    const { password, phone, status, role, ...updateData } = body;

    const userUpdated = await this.usersRepository.update({ id: req.user.id }, { ...updateData });

    if (!userUpdated) {
      throw new HttpException('Update that bai', HttpStatus.BAD_REQUEST);
    }

    return userUpdated;
  }

  async getProfile(user_id: number, target_id: number) {
    const hasBlocked = await this.blockUsersRepository.findOne({
      where: {
        user_id: user_id,
        blocked_user_id: target_id,
      },
    });

    if (hasBlocked) {
      throw new HttpException('Không thể xem thông tin người dùng này vì đã chặn', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersRepository.findBy({ id: target_id });

    if (!user) {
      throw new HttpException('User không tồn tại', HttpStatus.NOT_FOUND);
    }

    return new UserProfileResponse({
      ...user,
    });
  }

  async removeAccount(user_id: number) {
    await this.usersRepository.update({ id: user_id }, { status: USER_STATUS.REMOVE });

    // await this.userTokenRepository.deleteMany({
    //   user_id: user_id,
    // });

    // return new BaseResponse(200, 'OK', 'Xóa tài khoản thành công');
  }

  async updateAddress(req: UserEntity, body: BodyUpdateUserAddressDto) {
    // check địa chỉ đã tồn tại chưua

    // const address = await this.dataSourceService.findOne(AddressEntity, {
    //   where: {
    //     address: body.address,
    //   },
    // })

    const newAddress = this.dataSource.getRepository(AddressEntity).create({
      city_id: body.city_id,
      ward_id: body.ward_id,
      district_id: body.district_id,
      detail: body.detail,
    });

    await this.usersRepository.update(
      {
        id: req.id,
      },
      {
        address: newAddress.id,
      },
    );
    // await this.usersRepository
  }
  // async findUserByPhone(user_id: number, phone: number) {
  //   const listBlockUser = await this.blockUsersRepository.find({
  //     user_id: user_id,
  //   });

  //   console.log('UserService ~ findUserByPhone ~ listBlockUser:', listBlockUser);

  //   const user = await this.usersRepository
  //     .findOne({
  //       status: USER_STATUS.ACTIVE,
  //       phone: phone,
  //       _id: {
  //         $nin: listBlockUser.map((item) => new Types.ObjectId(item.user_block_id)),
  //       },
  //     })
  //     .lean();
  //   // console.log('UserService ~ findUserByPhone ~ user:', user);

  //   if (!user) {
  //     throw new HttpException( tìm thấy user', 404, 'Không);
  //   }

  //   const contact_type = await this.friendRepository
  //     .findOne({
  //       user_id: user_id,
  //       user_friend_id: user._id.tonumber(),
  //     })
  //     .lean();

  //   // console.log('UserService ~ findUserByPhone ~ contact_type:', contact_type);

  //   return new BaseResponse(200, 'OK', {
  //     user: new UserProfileResponse({
  //       ...user,
  //       contact_type: contact_type?.type || 0,
  //     }),
  //   });
  // }

  // async searchUser(user_id: number, query: any) {
  //   // if (query.length < 3) {
  //   //   throw new HttpException( khóa tìm kiếm p, 400, 'Từhải lớn hơn 3 ký tự');
  //   // }

  //   const { limit, key_search } = query;

  //   // Rest of the code...

  //   const [friends, conversationPersons] = await Promise.all([
  //     this.friendRepository.find({
  //       user_id: user_id,
  //     }),
  //     this.conversationRepository
  //       .find(
  //         {
  //           members: {
  //             $elemMatch: { $eq: user_id },
  //           },
  //           type: CONVERSATION_TYPE.PERSONAL,
  //         },
  //         { members: 1, _id: 1, name: 1 },
  //       )
  //       .exec(),
  //   ]);
  //   console.log('UserService ~ searchUser ~ conversationPersons:', conversationPersons);

  //   const listUserIds = [...friends.map((f) => f.user_friend_id), ...conversationPersons.flatMap((item) => item.members)];

  //   const listUserObjectIds = listUserIds.map((id) => new Types.ObjectId(id));

  //   const regex = new RegExp(keySearchNormalized, 'i');

  //   const users = await this.usersRepository
  //     .find({
  //       $or: [
  //         {
  //           normalize: {
  //             $regex: regex,
  //           },
  //         },
  //         {
  //           nick_name: keySearchNormalized,
  //         },
  //       ],
  //       status: USER_STATUS.ACTIVE,
  //       _id: {
  //         $in: listUserObjectIds,
  //         $ne: user_id,
  //       },
  //     })
  //     .limit(limit)
  //     .exec();

  //   console.log('assssssssssss');

  //   return Promise.all(
  //     users.map(async (user) => {
  //       const contact_type = await this.friendRepository
  //         .findOne({
  //           user_id: user_id,
  //           user_friend_id: user._id.tonumber(),
  //         })
  //         .lean();

  //       return new UserProfileResponse({
  //         ...user.toObject(),
  //         contact_type: contact_type?.type || 0,
  //       });
  //     }),
  //   );
  // }

  async listBlockUser(user_id: number) {
    const listBlockUser = await this.blockUsersRepository.find({
      where: {
        user_id: user_id,
      },
    });

    return {
      status: HttpStatus.OK,
      message: 'OK',
      data: listBlockUser.map((item) => item.blocked_user_id),
    };
  }

  async removeBlockUser(_id: number, target_id: number) {
    const result = await this.blockUsersRepository.delete({
      user_id: _id,
      blocked_user_id: target_id,
    });

    if (result.affected !== 0) {
      return {
        status: HttpStatus.OK,
        message: 'OK',
        data: null,
      };
    } else throw new HttpException('Không thể bỏ chặn', HttpStatus.BAD_REQUEST);
  }

  async blockUser(user_id: number, target_id: number) {
    if (user_id === target_id) {
      throw new HttpException('Không thể chặn chính mình', HttpStatus.BAD_REQUEST);
    }

    const hasBlocked = await this.blockUsersRepository.findOne({
      where: {
        user_id: user_id,
        blocked_user_id: target_id,
      },
    });

    if (hasBlocked) {
      throw new HttpException('Người dùng này đã bị chặn', HttpStatus.BAD_REQUEST);
    }

    const targetUser = await this.usersRepository.findBy({ id: target_id });

    if (!targetUser) {
      throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND);
    }

    // block user
    await this.blockUsersRepository.save({
      user_id: user_id,
      user_block_id: target_id,
    });

    return {
      status: HttpStatus.OK,
      message: 'OK',
      data: null,
    };
  }
}

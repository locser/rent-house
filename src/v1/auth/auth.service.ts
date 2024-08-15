import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment-timezone';
import { USER_STATUS } from 'src/utils.common/utils.enum.common/utils.user.enum';
import { Repository } from 'typeorm';
import { UserEntity } from '../shared';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/user-sign-in.dto';
import { SignUpDto } from './dto/user-sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,

    // @Injectable(UserToken.name)
    // private readonly userTokenRepository: Model<UserToken>,

    private jwtService: JwtService,
  ) {}

  async checkTokenActive(userId: number, token: string) {
    const userToken = await this.usersRepository.findOne({
      where: {
        id: userId,
        // token: token,
        // expired_at: { $gt: +moment() },
      },
    });

    if (!userToken) return false;

    return true;
  }

  async signIn(body: LoginDto) {
    try {
      const hasUser = await this.getAuthenticatedUser(
        {
          email: body.email,
          status: USER_STATUS.ACTIVE,
        },
        body.password,
      );

      if (!hasUser) return new HttpException('ERROR', HttpStatus.BAD_REQUEST);

      // const exis = await this.usersRepository.findOne({
      //   where: {
      //     id: hasUser.id,
      //   },
      // });
      // console.log('locser ~ signIn ~ existToken:', existToken);

      let access_token;

      if (!hasUser.access_token) {
        const payload = {
          id: hasUser.id,
          role: hasUser.role,
          full_name: hasUser.full_name,
          avatar: hasUser.avatar,
          create_at: +moment(),
        };

        access_token = await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET,
        });

        await this.usersRepository.update(
          {
            id: hasUser.id,
          },
          {
            id: hasUser.id,
            access_token: access_token,
            // expired_at: +moment() + Number(process.env.TIME_TO_LIVE_TOKEN),
          },
        );

        console.log('locser ~ signIn ~ access_token:', access_token);
      } else {
        // access_token = existToken.access_token;
        access_token = hasUser.access_token;
      }

      return {
        id: hasUser.id,
        full_name: hasUser.full_name,
        avatar: hasUser.avatar,
        access_token: access_token,
      };
    } catch (error) {
      console.log('AuthService ~ signIn ~ error:', error);
      return new HttpException('Thông tin đăng nhập không chính xác', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPlainContentWithHashedContent(plainText: string, hashedText: string) {
    const is_matching = await bcrypt.compare(plainText, hashedText);
    if (!is_matching) {
      throw new HttpException('Mật khẩu không chính xác!! 1', HttpStatus.UNAUTHORIZED);
    }
  }

  // async logout(userId: string) {
  //   await this.usersRepository.delete({
  //     user_id: userId,
  //   });

  //   return userId;
  // }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: signUpDto.email,
      },
    });

    if (user) {
      throw new HttpException('Địa chỉ đã được sử dụng', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 5);

    let newUser = this.usersRepository.create({
      full_name: signUpDto.full_name,
      email: signUpDto.email,
      password: hashedPassword,
    });

    newUser = await this.usersRepository.save(newUser);
    // instead of the user object
    return newUser;
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { old_password, new_password } = changePasswordDto;

    if (old_password == new_password) {
      throw new HttpException('Mật khẩu mới không được trùng mật khẩu cũ', HttpStatus.BAD_REQUEST);
    }

    // const hasAccess = await this.getAuthenticatedUser({ id: id }, old_password);

    // if (hasAccess) {
    //   const userUpdated = await this.usersRepository.update(
    //     {
    //       id: id,
    //     },
    //     {
    //       password: await bcrypt.hash(changePasswordDto.new_password, 5),
    //     },
    //   );

    // const payload = {
    //   id: userUpdated.id,
    //   role: userUpdated.role,
    //   full_name: userUpdated.full_name,
    //   avatar: userUpdated.avatar,
    //   create_at: +moment(),
    // };

    // const access_token = await this.jwtService.signAsync(payload, {
    //   secret: process.env.JWT_SECRET,
    // });

    // await this.usersRepository.updateOne(
    //   {
    //     id: new (userUpdated.id),
    //   },
    //   {
    //     token: access_token,
    //     expired_at: +moment() + Number(process.env.TIME_TO_LIVE_TOKEN),
    //   },
    // );

    // return new HttpException( 'Đổi mật khẩu thành công!', {
    // });

    return new HttpException('Mật khẩu không chính xác', HttpStatus.BAD_REQUEST);
  }

  async getAuthenticatedUser(filter: object, password: string): Promise<UserEntity> {
    // get user
    const user = await this.usersRepository.findOne({
      where: filter,
    });

    if (!user) {
      throw new HttpException(`Không tìm thấy user với số điện thoại này ${filter['phone']}`, HttpStatus.NOT_FOUND);
    }
    // check password
    await this.verifyPlainContentWithHashedContent(password, user.password);

    return user;
  }

  async getUserById(id: number, token: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user.access_token !== token) return true;

    return false;
  }

  async resetPassword(body: Partial<UserEntity>) {
    const { phone, password } = body;

    const user = await this.usersRepository.findOne({ where: { email: phone } });

    if (!user) {
      throw new HttpException('Không tìm thấy user', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.update(
      { id: user.id },
      {
        password: await bcrypt.hash(password, 5),
      },
    );

    return new HttpException('ERROR', HttpStatus.BAD_REQUEST);
  }
}

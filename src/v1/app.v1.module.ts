import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { BookingModule } from './booking/booking.module';
import { WishlistModule } from './wishlist/wishlist.module';

let routes: Routes = [
  {
    path: '/v1',
    children: [UserModule, AuthModule, HomeModule, AdminModule, BookingModule],
  },
];

@Module({
  imports: [RouterModule.register(routes), UserModule, AuthModule, HomeModule, AdminModule, BookingModule, WishlistModule],
  controllers: [],
  providers: [],
})
export class AppV1Module implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}

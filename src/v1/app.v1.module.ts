import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { ReviewModule } from 'src/v1/review/review.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { HomeModule } from './home/home.module';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';
import { WishlistModule } from './wishlist/wishlist.module';

let routes: Routes = [
  {
    path: '/v1',
    children: [UserModule, AuthModule, HomeModule, AdminModule, BookingModule, ReviewModule, ReportModule, WishlistModule],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    UserModule,
    AuthModule,
    HomeModule,
    AdminModule,
    BookingModule,
    ReviewModule,
    ReportModule,
    WishlistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppV1Module implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}

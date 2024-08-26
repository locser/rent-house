import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from 'src/v1/review/review.module';
import { ReportModule } from './report/report.module';

let routes: Routes = [
  {
    path: '/v1',
    children: [UserModule, AuthModule, HomeModule, AdminModule, BookingModule, ReviewModule, ReportModule],
  },
];

@Module({
  imports: [RouterModule.register(routes), UserModule, AuthModule, HomeModule, AdminModule, BookingModule, ReviewModule, ReportModule],
  controllers: [],
  providers: [],
})
export class AppV1Module implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}

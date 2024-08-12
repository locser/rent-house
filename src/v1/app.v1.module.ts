import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { UserModule } from './user/user.module';

//
let routes: Routes = [
  {
    path: '/v1',
    children: [UserModule],
  },
];

@Module({
  imports: [RouterModule.register(routes), UserModule],
  controllers: [],
  providers: [],
})
export class AppV1Module implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}

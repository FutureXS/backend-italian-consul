import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { ApplicantsModule } from './applicants/applicants.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ApplicantsModule,
    // MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
})
export class AppModule {}

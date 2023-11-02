import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApplicantsModule } from './applicants/applicants.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from './roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { RelativesModule } from './relatives/relatives.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ApplicantsModule,
    MongooseModule.forRoot(
      'mongodb+srv://victor:banco2010@cluster0.mdupn.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'consul',
      },
    ),
    RelativesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

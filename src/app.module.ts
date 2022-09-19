import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticateModule } from './modules/authenticate/authenticate.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { GeolocalizationModule } from './services/geolocalization/geolocalization.module';
import { UploadModule } from './services/upload/upload.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'term228687535',
      database: 'mobilar',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UserModule,
    AuthenticateModule,
    AddressModule,
    GeolocalizationModule,
    UploadModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

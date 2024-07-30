import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './auth/register/register.module';
import { LoginModule } from './auth/login/login.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './dash/admin/admin.module';
import { LogoutModule } from './auth/logout/logout.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { User, UserSchema } from './schema/User.schema';
import { Event, EventSchema } from './event/schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kamate:kamate@cluster0.qhe2kdu.mongodb.net/?retryWrites=true&w=majority&dbname=showtime',
    ),
    RegisterModule,
    LoginModule,
    AdminModule,
    LogoutModule,
    UserModule,
    EventModule,
    TicketModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

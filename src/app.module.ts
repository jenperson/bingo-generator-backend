import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BingoController } from './bingo/bingo.controller';
import { BingoService } from './bingo/bingo.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, BingoController],
  providers: [BingoService],
})
export class AppModule {}

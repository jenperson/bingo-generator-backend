import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { BingoService } from './bingo.service';

export class GenerateBingoDto {
  prompt: string;
}

@Controller('generate-bingo')
export class BingoController {
  constructor(private readonly bingoService: BingoService) {}

  @Post()
  async generateBingo(@Body() body: GenerateBingoDto) {
    const { prompt } = body;

    if (!prompt) {
      throw new HttpException('Prompt is required', HttpStatus.BAD_REQUEST);
    }

    return await this.bingoService.generateBingo(prompt);
  }
}

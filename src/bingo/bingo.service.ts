import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BingoService {
  private readonly modelUrl: string | undefined;

  constructor(private configService: ConfigService) {
    this.modelUrl = this.configService.get<string>('MODEL_URL');
  }

  async generateBingo(prompt: string) {
    if (!this.modelUrl) {
      throw new HttpException(
        'MODEL_URL not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const response = await fetch(`${this.modelUrl}/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate 24 unique bingo square ideas for: ${prompt}. Return as JSON array.`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Model API returned ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating bingo:', error);
      throw new HttpException(
        {
          error: 'Failed to generate bingo squares',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

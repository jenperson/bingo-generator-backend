import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BingoService {
  private readonly modelUrl: string | undefined;
  private readonly modelName: string | undefined;

  constructor(private configService: ConfigService) {
    this.modelUrl = this.configService.get<string>('MODEL_URL');
    this.modelName = this.configService.get<string>('MODEL_NAME');
  }

  async generateBingo(prompt: string) {
    if (!this.modelUrl) {
      throw new HttpException(
        'MODEL_URL not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const url = `${this.modelUrl}v1/chat/completions`;
      const payload = {
        model: this.modelName || 'meta-llama/Llama-3.1-8B-Instruct',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates bingo square ideas. You must respond with ONLY a valid JSON array of strings, nothing else. No explanations, no markdown, just the raw JSON array.',
          },
          {
            role: 'user',
            content: `Generate exactly 24 unique, specific, and actionable bingo square ideas for someone working on: ${prompt}. Each idea should be a short phrase describing a concrete action or task. Return ONLY a JSON array of 24 strings, for example: ["idea 1", "idea 2", "idea 3"]`,
          },
        ],
        temperature: 0.7,
      };
      
      console.log('Request URL:', url);
      console.log('Request payload:', JSON.stringify(payload, null, 2));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response body:', responseText);

      if (!response.ok) {
        throw new Error(`Model API returned ${response.status}: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      
      // Extract the content from vLLM's response format
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('No content in response');
      }
      
      // Parse the content as JSON array
      const bingoIdeas = JSON.parse(content);
      
      return bingoIdeas;
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

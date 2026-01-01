import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInfo() {
    return {
      message: 'Welcome to the Bingo Backend API',
      routes: {
        'GET /': 'API information',
        'GET /health': 'Health check',
        'POST /generate-bingo': 'Generate bingo squares (body: { prompt: string })',
      },
    };
  }

  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}

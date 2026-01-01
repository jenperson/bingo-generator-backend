# Bingo Backend

A Node.js backend application built with NestJS and TypeScript.

## Features

- NestJS framework with TypeScript
- Dependency injection and modular architecture
- CORS enabled
- Environment variable configuration with @nestjs/config
- Development server with hot reload

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

### Development

Run the development server with hot reload:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Build

Compile TypeScript to JavaScript:
```bash
npm run build
```

### Production

Run the compiled application:
```bash
npm start
```

## API Endpoints

- `GET /` - Welcome message with routes
- `GET /health` - Health check endpoint
- `POST /generate-bingo` - Generate bingo squares (body: `{ "prompt": "string" }`)

## Project Structure

```
bingo-backend/
├── src/
│   ├── bingo/
│   │   ├── bingo.controller.ts  # Bingo endpoint controller
│   │   └── bingo.service.ts     # Bingo generation service
│   ├── app.controller.ts        # Root & health endpoints
│   ├── app.module.ts            # Root module
│   └── main.ts                  # Application entry point
├── dist/                        # Compiled JavaScript (generated)
├── .env.example                 # Example environment variables
├── .gitignore
├── nest-cli.json                # NestJS CLI configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Architecture

This application follows NestJS best practices:
- **Controllers** - Handle HTTP requests and responses
- **Services** - Contain business logic
- **Modules** - Organize the application structure
- **Dependency Injection** - Manage dependencies automatically

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run start:debug` - Start with debugging enabled
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage

## License

[Apache 2.0](LICENSE)


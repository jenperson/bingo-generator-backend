# Bingo Backend

A Node.js backend application built with NestJS and TypeScript. This backend provides an API for generating custom bingo cards using AI-powered suggestions. It accompanies the [Bingo Generator Frontend](https://github.com/jenperson/bingo-generator).

The project can be run locally or easily [deployed on Koyeb](#deploy-to-koyeb).

## Features

- NestJS framework with TypeScript
- AI-powered bingo square generation using vLLM
- Dependency injection and modular architecture
- CORS enabled for frontend integration
- Environment variable configuration with @nestjs/config
- Development server with hot reload

## Getting Started
### Prerequisites

- Node.js (v22 or higher)
- npm or yarn
- A vLLM-compatible LLM endpoint (for production use)6 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
   - `MODEL_URL` - Your vLLM endpoint URL (e.g., `https://your-model.koyeb.app/`)
   - `MODEL_NAME` - The model name (e.g., `meta-llama/Llama-3.1-8B-Instruct`)
   - `PORT` - Server port (default: 3000)bash
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

## API Endpoints

### `GET /`
Returns API information and available routes.

**Response:**
```json
{
  "message": "Welcome to the Bingo Backend API",
  "routes": {
    "GET /": "API information",
    "GET /health": "Health check",
    "POST /generate-bingo": "Generate bingo squares (body: { prompt: string })"
  }
}
```

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

### `POST /generate-bingo`
Generate 24 unique bingo square ideas based on a prompt.

**Request body:**
```json
{
  "prompt": "software development"
}
```

**Response:**
```json
[
  "Write unit tests",
  "Review a pull request",
  "Refactor legacy code",
  ...
## Deploy to Koyeb

Deploy all three components in this order for the complete application:

1. [Deploy the LLM Model](#1-deploy-the-model-on-koyeb)
2. [Deploy the Backend API](#2-deploy-the-backend-on-koyeb)
3. [Deploy the Frontend](#3-deploy-the-frontend-on-koyeb)

### 1. Deploy the Model on Koyeb

First, deploy a vLLM-compatible model. [Llama 3.1 8B Instruct](https://app.koyeb.com/one-clicks/llama-3-1-8b-instruct/deploy) works well for this use case.

[![Deploy Llama 3.1 8B Instruct to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/one-clicks/llama-3-1-8b-instruct/deploy)

**After deployment:**
- Note the public URL (e.g., `https://<app-name>.koyeb.app/`)
- You'll need this URL for the backend deployment

**Alternative models:**
Browse [Available One-Click Deploy Models](https://www.koyeb.com/deploy/category/model) for other options.

### 2. Deploy the Backend on Koyeb

Deploy the backend API with the model URL from step 1.

[![Deploy the Bingo Backend to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=bingo-generator-backend&type=git&repository=jenperson%2Fbingo-generator-backend&branch=main&instance_type=small&regions=par&env%5BMODEL_NAME%5D=meta-llama%2FLlama-3.1-8B-Instruct&env%5BMODEL_URL%5D=YOUR_MODEL_URL%2F&ports=3000%3Bhttp%3B%2F&hc_protocol%5B3000%5D=tcp&hc_grace_period%5B3000%5D=5&hc_interval%5B3000%5D=30&hc_restart_limit%5B3000%5D=3&hc_timeout%5B3000%5D=5&hc_path%5B3000%5D=%2F&hc_method%5B3000%5D=get)

**Required environment variables:**
- `MODEL_URL`: Your model URL from step 1 (e.g., `https://<model-app-name>.koyeb.app/`)
- `MODEL_NAME`: `meta-llama/Llama-3.1-8B-Instruct` (or your chosen model)

**After deployment:**
- Note the backend URL (e.g., `https://<backend-app-name>.koyeb.app/`)
- You'll need this URL for the frontend deployment

### 3. Deploy the Frontend on Koyeb

Finally, deploy the frontend with the backend URL from step 2.

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=bingo-generator&type=git&repository=jenperson%2Fbingo-generator&branch=main&instance_type=small&regions=par&env%5BVITE_API_ENDPOINT%5D=YOUR_ENDPOINT)

**Required environment variable:**
- `VITE_API_ENDPOINT`: Your backend URL from step 2 (e.g., `https://<backend-app-name>.koyeb.app/`)

**After deployment:**
Your complete bingo generator application is now live!
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run start:debug` - Start with debugging enabled
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage

## Deploy app to Koyeb

To deploy the app to Koyeb, you can deploy any or all of these three compnents:
- LLM
- Backend API using NestJS
- Frontend using React and Vite

### Deploy the Frontend on Koyeb

The frontend application requires a backend URL as an environment variable, so it's a good idea to [deploy the backend app first](#deploy-the-backend-on-koyeb). Once the backend is deployed, you will have what you need to deploy the frontend.

Use the following button to deploy the frontend:

**When deploying, go to the Environment variables and files section and provide the environment variable value for VITE_API_ENDPOINT**
VITE_API_ENDPOINT: https://<app-name>.koyeb.app/ (replace <app-name> with the value from your *backend* project)

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=bingo-generator&type=git&repository=jenperson%2Fbingo-generator&branch=main&instance_type=small&regions=par&env%5BVITE_API_ENDPOINT%5D=YOUR_ENDPOINT)

### Deploy the Model on Koyeb

To deploy a model on Koyeb, choose a model from the [Available One-Click Deploy Models](https://www.koyeb.com/deploy/category/model). You can also deploy any model that runs on vLLM; you'll just have to set up some configuration yourself.

[Llama 3.1 8B Instruct](https://app.koyeb.com/one-clicks/llama-3-1-8b-instruct/deploy) works well for this use case. Click the following button to deploy the model:

[![Deploy Llama 3.1 8B Instruct to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/one-clicks/llama-3-1-8b-instruct/deploy)

Once deployed, use the provided public URL **ie https://<app-name>.koyeb.app/** to access the model.

### Deploy the Backend on Koyeb

To deploy the backend on Koyeb, you need to provide a model URL for the LLM you will be using. 

Click the following button deploy the backend:

**When deploying, go to the Environment variables and files section and provide the environment variable value for MODEL_URL and MODEL_NAME.**
MODEL_URL: https://<app-name>.koyeb.app/ (replace <app-name> with the value from your project)
MODEL_NAME: meta-llama/Llama-3.1-8B-Instruct (change if you use an alternative model)

[![Deploy the Bingo Backend to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=bingo-generator-backend&type=git&repository=jenperson%2Fbingo-generator-backend&branch=main&instance_type=small&regions=par&env%5BMODEL_NAME%5D=meta-llama%2FLlama-3.1-8B-Instruct&env%5BMODEL_URL%5D=YOUR_MODEL_URL%2F&ports=3000%3Bhttp%3B%2F&hc_protocol%5B3000%5D=tcp&hc_grace_period%5B3000%5D=5&hc_interval%5B3000%5D=30&hc_restart_limit%5B3000%5D=3&hc_timeout%5B3000%5D=5&hc_path%5B3000%5D=%2F&hc_method%5B3000%5D=get)

With the backend deployed, take note of the the URL of the backend, and then [deploy the frontend](#deploy-the-frontend-on-koyeb).

## License

[Apache 2.0](LICENSE)


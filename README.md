# React Project Structure Boilerplate

- Problem with webpack setup
  - _npm run eslint_ listing some errors. fix them
  - _npm run prettier_ check if this is working
  - _npm run build_ check if this is working
- Webpack 5 Setup

  - webpack 4 pollyfills
  - typescript
  - babel
  - loaders
    - scss loaders
  - prettier
  - eslint
    - auto import
    - auto remove unused imports (not working right now)
  - lint-staged
  - commitzen
  - husky
    - pre-commit
      - npm run lint
    - pre-push
      - npm run build

- Redux Setup
- Routing Setup

  - Public and Private routes
  - Layout and Non-Layout routes

- Authentication Setup

- Custom font setup
- Themeing Setup
- Components Setup
  - Animations folder
- Hooks Setup
- Containers setup
- Pages setup with common messages pages

- Data Grid with server side pagination setup
- Data Grid with client side pagination setup
- Download and Upload Setup with progress bar
- Working Configuation with Mock server

- Socket Setup
- Webrtc Setup

## How to use it ?

- create a folder `.env` in root directory
- create a file inside that folder `.env/development.env`.
- copy all the content of `.env.example` to the `development.env`.
- `npm install`
- run `npm run dev`

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

- Redux Setup (:heavy_check_mark:)
- Authentication Setup (:heavy_check_mark:)
- Routing Setup (:heavy_check_mark:)
  - Public and Private routes (:heavy_check_mark:)
  - Layout and Non-Layout routes (:heavy_check_mark:)
- Route and Sidebar Permission Setup (:heavy_check_mark:)

- Custom font setup (:heavy_check_mark:)
- Themeing Setup (:heavy_check_mark:)
- Components Setup (:heavy_check_mark:)
  - Animations folder (:heavy_check_mark:)
- Hooks Setup (:heavy_check_mark:)
- Containers setup (:heavy_check_mark:)

- Notification Setup (:heavy_check_mark:)
- Working Configuation with Mock server (:heavy_check_mark:)
- Form CRUD (:heavy_check_mark:)
- List PAGINATION: (:heavy_check_mark:)
- Download and Upload Setup with progress bar (:heavy_check_mark:)
- Data Grid with client side pagination setup (:heavy_check_mark: in storybook In Pagination component)
- React Design Patterns Examples for reference (:heavy_check_mark:)
- Pages setup with common messages pages (WORK IN PROGRESS)
- SORTING, SEARCHING, FILTERING
- Data Grid with server side pagination setup
- Table download as csv
- Socket Setup
- Webrtc Setup
- Page Animation on Route Change like my portfolio
- Give a look to React project Structure saves of pocket
- Steps for proper production build deployment in custom server with ssl

## How to use it ?

- create a folder `.env` in root directory
- create a file inside that folder `.env/development.env`.
- copy all the content of `.env.example` to the `development.env`.
- `npm install`
- run `npm run dev`

## 👶 Getting Started

Required Node and Npm versions:

```
"node": ">=15.14.0",
"npm": ">=7.8.0"
```

Install same node version as used in `.nvmrc` and install npm packages:

```
nvm use
npm install // use `--legacy-peer-deps` if needed
```

Copy environment variables (ask for secrets):

```
cp .env.example .env.local
```

### 👨‍💻 Develop

To start the project in development mode:

```
npm run dev
```

### 🏗 Production build and start

Install dependencies:

```
npm install --production --no-optional
```

This will create an optimized production build:

```
npm run build
```

Use this command to run your application on the server (set `NEXT_PUBLIC_APP_ENV`)

```
npm run start:prod // Prod environment
```

### 🔎 Code quality

## Linting

You can run the following commands to lint your code.

```
npm run lint
```

## Testing

Run this command to execute your jest tests.

```
npm run test:unit
npm run test:unit:update // Update snapshots (if used)
```

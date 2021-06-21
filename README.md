# Jupda API

> Let's pick up coins with "Jupda(줍다)"!

Hello, block chain developer🧑🏻‍💻 and bitcoin Investor🤑.

This project is information API for altCoin ICO, IDO, IFO.

With the latest information, I wish you a stable, high-yielding investment📈.

## Getting Start

```
npm install

# Start dev mode.
npm run start:dev

# Unit Test
npm run test

# E2E Test
npm run test:e2e
```

**The E2E test initializes the existing database. I recommend you to test it localhost.**

## ENV

Example (.env)

```
# APP
APP_ENV=dev
APP_URL=http://localhost

#JWT AUTH
JWT_SECRET_KEY=

#DATABASE
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_DATABASE=
```

for E2E test Example (.env.testing)

```
TEST_DB_USERNAME=
TEST_DB_PASSWORD=
TEST_DB_DATABASE=
```

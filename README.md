# DevCamper API

> Backend API for DevCamper application, which is a bootcamp directory website

## Install Dependencies

```
yarn
```

## Run App

```
# Run in dev mode
yarn dev

# Run in prod mode
yarn start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# to import all data
node seeder -i

# to delete all data
node seeder -d
```

## .env file

Replace the sample.env file in the config folder to config.env and replace the values with your own values.

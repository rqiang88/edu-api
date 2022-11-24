export default () => ({
  db: {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    // entities: ['dist/entities/**/*.entity.js'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['src/subscribers/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
      subscribersDir: 'src/subscribers'
    }
  },
  redis: {
    host: 'localhost',
    port: 6379
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
});

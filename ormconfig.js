const { InternalServerErrorException } = require('@nestjs/common');
let connectionOptions = require('typeorm');
const dotenv = require('dotenv');
dotenv.config();

try {
  connectionOptions = {
    type: process.env.DATABASE_TYPE,
    url: process.env.DATABASE_URL,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/**/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    synchronize: false,
  };
} catch (erro) {
  console.log(erro);
  throw new InternalServerErrorException(
    erro,
    'Erro ao se conectar com o banco de dados!',
  );
}

module.exports = connectionOptions;

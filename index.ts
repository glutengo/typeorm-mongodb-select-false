import { Foo } from './foo';
import {createConnection} from 'typeorm';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

async function run() {
  const mongod = await MongoMemoryServer.create();
  const ormconfig: MongoConnectionOptions = {
    name: 'default',
    type: 'mongodb',
    host: 'localhost',
    port: await mongod.getPort(),
    database: await mongod.getDbName(),
    entities: [Foo],
    useUnifiedTopology: true
  };
  const connection = await createConnection(ormconfig);
  const repository = await connection.getMongoRepository(Foo);
  const foo = new Foo();
  foo.bar = 'bar';
  foo.hidden = 'hidden';
  const id = (await repository.save(foo)).id;
  const selectedFoo = await repository.findOne(id);
  console.log(selectedFoo);
  await connection.close();
  return mongod.stop();
}

run();

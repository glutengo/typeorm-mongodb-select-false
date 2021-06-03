import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('foo')
export class Foo {
  @ObjectIdColumn({ name: '_id' })
  id?: string;

  @Column({nullable: true})
  bar?: string;

  @Column({nullable: true, select: false})
  hidden?: string;
}

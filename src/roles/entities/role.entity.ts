import { User } from '../../users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    altName: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => User, (users) => users.role)
    users: User[];
}

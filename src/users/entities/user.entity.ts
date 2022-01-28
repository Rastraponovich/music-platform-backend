import { Comment } from 'src/comments/entities/comment.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Song } from 'src/songs/entities/song.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    roleId: number;
    @ManyToOne(() => Role, (roles) => roles.users)
    role: Role;

    @OneToMany(() => Song, (songs) => songs.user)
    songs: Song[];

    @OneToMany(() => Comment, (comments) => comments.user)
    comments: Comment[];
}

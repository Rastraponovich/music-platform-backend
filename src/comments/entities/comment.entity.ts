import { Song } from '../../songs/entities/song.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    author: string;

    @Column({ nullable: false })
    text: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    songId: number;
    @ManyToOne(() => Song, (songs) => songs.comments)
    song: Song;

    @Column()
    userId: number;
    @ManyToOne(() => User, (user) => user.comments)
    user: User;
}

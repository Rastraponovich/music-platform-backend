import { Comment } from '../../comments/entities/comment.entity';
import { Song } from '../../songs/entities/song.entity';
import { User } from '../../users/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'playlists' })
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Comment, (comments) => comments.song)
    comments: Comment[];

    @Column()
    creatorId: number;
    @ManyToOne(() => User, (user) => user.playlists)
    @JoinColumn()
    creator: User;

    @ManyToMany(() => Song, (songs) => songs.playlists, { cascade: true })
    @JoinTable()
    songs: Song[];
}

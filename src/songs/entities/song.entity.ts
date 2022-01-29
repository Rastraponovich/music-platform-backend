import { Comment } from '../../comments/entities/comment.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { User } from '../../users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'songs', orderBy: { id: 'ASC' } })
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    artist: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    path: string;

    @Column({ nullable: true, default: 'nocover.png' })
    cover: string;

    @OneToMany(() => Comment, (comments) => comments.song)
    comments: Comment[];

    @Column()
    userId: number;
    @ManyToOne(() => User, (user) => user.songs)
    user: User;

    @ManyToMany(() => Playlist, (playlists) => playlists.songs)
    playlists: Playlist[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

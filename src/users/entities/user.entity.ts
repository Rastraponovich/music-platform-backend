import { Comment } from '../../comments/entities/comment.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Role } from '../../roles/entities/role.entity';
import { Song } from '../../songs/entities/song.entity';
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

    @OneToMany(() => Playlist, (playlists) => playlists.creator)
    playlists: Playlist[];
}

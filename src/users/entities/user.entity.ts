import { Comment } from '../../comments/entities/comment.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { Role } from '../../roles/entities/role.entity';
import { Song } from '../../songs/entities/song.entity';
import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    @Index({ unique: true })
    email: string;

    @Column({ nullable: false, select: false })
    @IsNotEmpty()
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

import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'songs' })
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

    @OneToMany(() => Comment, (comments) => comments.song)
    comments: Comment[];

    @Column()
    userId: number;
    @ManyToOne(() => User, (user) => user.songs)
    user: User;
}

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    artist: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean = true;

    @IsOptional()
    @IsString()
    cover: string;

    @IsOptional()
    @IsString()
    path: string;

    @IsNotEmpty()
    userId: number;
}

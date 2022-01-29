import { QueryParams } from 'src/common/interfaces/query.interface';

export type MultiFiles = { image: Express.Multer.File[]; music: Express.Multer.File[] };

export class SongQueryParams extends QueryParams {
    readonly artist?: string;
}

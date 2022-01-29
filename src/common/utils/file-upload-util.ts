import { Request } from 'express';
import { extname } from 'path';
import { v4 as UUID } from 'uuid';

export const editFileName = (req: Request, file: Express.Multer.File, callback) => {
    const fileExtName = extname(file.originalname);

    callback(null, `${UUID()}${fileExtName}`);
};

export const imageFileFilter = (req: Request, file: Express.Multer.File, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const musicFileFilter = (req: Request, file: Express.Multer.File, callback) => {
    if (file.mimetype !== 'audio/mpeg' || !file.originalname.match(/\.(mp3)$/))
        return callback(new Error('Only music files are allowed!'), false);

    callback(null, true);
};

export const destinationResolve = (req, file: Express.Multer.File, callback) => {
    const destination = file.mimetype === 'audio/mpeg' ? './files/music' : './files/images';

    callback(null, destination);
};

export const multiFilter = (req: Request, file: Express.Multer.File, callback) => {
    if (file.fieldname === 'music_url') {
        if (file.mimetype !== 'audio/mpeg' || !file.originalname.match(/\.(mp3)$/))
            return callback(new Error('Only music files are allowed!'), false);
    }

    if (file.fieldname === 'image_url') {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
        }
    }

    callback(null, true);
};

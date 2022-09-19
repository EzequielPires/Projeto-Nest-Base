import { readFile, unlink } from 'fs';
import { promisify } from 'util';
import * as sharp from 'sharp';
import { Injectable } from '@nestjs/common';

const readFileAsyc = promisify(readFile);

@Injectable()
export class CompressImageUseCase {
    constructor() {}

    async execute(file: Express.Multer.File) {
        const [name,] = file.filename.split('.');
        const imageFile = await readFileAsyc(file.path);
        const imageSharpe = sharp(imageFile);
        await imageSharpe
            .metadata()
            .then(function (metadata) {
                return imageSharpe
                    .resize(metadata.width > 1920 ? 1920 : null)
                    .webp({ quality: 80 })
                    .toFile(__dirname + `/../../../../storage/${name}.webp`);
            })
            .then(() => {
                file.path != `storage/${name}.webp` ? unlink(file.path, (err) => { }) : null
            })
            .catch();
        const newFile = await readFileAsyc(`storage/${name}.webp`);

        return `storage/${name}.webp`;
    }
}
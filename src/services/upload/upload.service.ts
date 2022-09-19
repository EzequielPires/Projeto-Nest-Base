import { Injectable } from '@nestjs/common';
import { CompressImageUseCase } from './useCases/CompressImageUseCase';

@Injectable()
export class UploadService {
    constructor(
        private compressImageUseCase: CompressImageUseCase
    ) {}

    async compress(file: Express.Multer.File) {
        return this.compressImageUseCase.execute(file); 
    }
}
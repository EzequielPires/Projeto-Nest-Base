import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { CompressImageUseCase } from "./useCases/CompressImageUseCase";

@Module({
    imports: [],
    controllers: [
        UploadController
    ],
    providers: [
        UploadService,
        CompressImageUseCase
    ]
})
export class UploadModule {}
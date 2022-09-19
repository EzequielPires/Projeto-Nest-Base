import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName } from "src/helpers/EditNameFile";
import { UploadService } from "./upload.service";

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) {}

    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: './storage/temp',
            filename: editFileName
        })
    }))
    @Post('image')
    async upload(@UploadedFile() file: Express.Multer.File) {
        return {
            message: "Upload realizado com sucesso!",
            path: await this.uploadService.compress(file)
        };
    }
}
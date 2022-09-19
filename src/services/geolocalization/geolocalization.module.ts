import { Module } from "@nestjs/common";
import { GeolocalizationController } from "./geolocalization.controller";
import { GeolocalizationService } from "./geolocalization.service";
import { AutocompleteUseCase } from "./useCases/AutocompleteUseCase";
import { FindByZipcodeUseCase } from "./useCases/FindByZipcodeUseCase";

@Module({
    imports: [],
    controllers: [GeolocalizationController],
    providers: [
        GeolocalizationService,
        FindByZipcodeUseCase,
        AutocompleteUseCase
    ]
})
export class GeolocalizationModule {}
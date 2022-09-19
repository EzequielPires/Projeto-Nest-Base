import { Controller, Get, Param } from "@nestjs/common";
import { GeolocalizationService } from "./geolocalization.service";

@Controller('geolocalization')
export class GeolocalizationController {
    constructor(private geolocalizationService: GeolocalizationService) {}

    @Get('zipcode/:cep')
    findByZipcode(@Param('cep') cep: string) {
        return this.geolocalizationService.findByZipcode(cep);
    }
    
    @Get('autocomplete/:input')
    autocomplete(@Param('input') input: string) {
        return this.geolocalizationService.autocomplete(input);
    }
}
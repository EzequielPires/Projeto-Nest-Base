import { Injectable } from "@nestjs/common";
import { AutocompleteUseCase } from "./useCases/AutocompleteUseCase";
import { FindByZipcodeUseCase } from "./useCases/FindByZipcodeUseCase";

@Injectable()
export class GeolocalizationService {
    constructor(
        private autocompleteUseCase: AutocompleteUseCase,
        private findByZipcodeUseCase: FindByZipcodeUseCase
    ) {}

    async autocomplete(input: string) {
        return await this.autocompleteUseCase.execute(input);
    }

    async findByZipcode(zipcode: string) {
        return await this.findByZipcodeUseCase.execute(zipcode);
    }
}
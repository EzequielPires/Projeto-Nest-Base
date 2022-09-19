import { Client } from "@googlemaps/google-maps-services-js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AutocompleteUseCase {
    client: Client;
    constructor() {
        this.client = new Client();
    }

    async execute(input: string) {
        const geocode: any = await this.client.placeAutocomplete({
            params: {
                input: input,
                key: "AIzaSyCftL2A0NVvDaaQjrteYUn618ZJJe8_kg0",
                language: 'pt_BR',  
            },
        })
            .then(res => res.data)
            .catch((e) => {
                console.log(e.response.data.error_message);
            });

        return geocode.predictions;
    }
}
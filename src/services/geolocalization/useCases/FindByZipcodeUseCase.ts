import { Client } from "@googlemaps/google-maps-services-js";
import { Injectable } from "@nestjs/common";
import { Address } from "src/modules/address/entities/address.entity";

@Injectable()
export class FindByZipcodeUseCase {
    client: Client;
    address: Address;
    constructor() {
        this.client = new Client();
        this.address = new Address();
    }

    async execute(zipcode: string) {
        const geocode: any = await this.client.geocode({
            params: {
                address: zipcode,
                key: "AIzaSyCftL2A0NVvDaaQjrteYUn618ZJJe8_kg0",
                language: 'pt_BR'
            },

        })
            .then(res => res.data)
            .catch((e) => {
                console.log(e.response.data.error_message);
            });

        if (geocode.status === 'OK') {
            geocode?.results[0]?.address_components?.forEach(element => {
                const isZipcode = element.types.find(item => item === 'postal_code');
                const isRoute = element.types.find(item => item === 'route');
                const isDistrict = element.types.find(item => item === 'sublocality_level_1');
                const isCity = element.types.find(item => item === 'administrative_area_level_2');
                const isState = element.types.find(item => item === 'administrative_area_level_1');
                const isNation = element.types.find(item => item === 'country');
    
                { isZipcode === 'postal_code' ? this.address.zipcode = element.long_name : null };
                { isRoute === 'route' ? this.address.route = element.long_name : null };
                { isDistrict === 'sublocality_level_1' ? this.address.district = element.long_name : null };
                { isCity === 'administrative_area_level_2' ? this.address.city = element.long_name : null };
                { isState === 'administrative_area_level_1' ? this.address.state = element.long_name : null };
                { isNation === 'country' ? this.address.nation = element.long_name : null };
            });
            this.address.location = geocode.results[0].geometry.location;
            this.address.formatted_address = geocode.results[0].formatted_address;
            this.address.place_id = geocode.results[0].place_id;
        } else {
            return {
                error: 'Address not found'
            }
        }

        return this.address;
    }
}
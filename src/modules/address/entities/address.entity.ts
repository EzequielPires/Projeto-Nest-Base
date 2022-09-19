import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type Location = {
    lat: number;
    lng: number;
}

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nation: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    district: string;

    @Column()
    route: string;

    @Column()
    zipcode: string;

    @Column()
    place_id: string;

    @Column()
    formatted_address: string;

    @Column({type: 'simple-json'})
    location: Location;
}

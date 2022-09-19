import { hashSync } from "bcrypt";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email', 'idGoogle'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    cellPhone: string;

    @Column({nullable: true})
    avatar: string;

    @Column({nullable: true})
    cpf: string;

    @Column({default: false})
    isGoogleAuth: boolean;

    @Column({nullable: true, unique: true})
    idGoogle: string;
    
    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}
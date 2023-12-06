import { AutoMap } from "@nartc/automapper";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Currency } from "./Currency";
import { Bank } from "./Bank";

@Entity({name: "accounts"})
export class Account {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> Bank)
    @JoinColumn({name: 'bankId', })
    @AutoMap()
    bank: Bank

    @AutoMap()
    @Column({type: 'int', nullable: true })
    bankId: number

    @AutoMap()
    @Column({type:'varchar', length:255 })
    accountNumber: string

    @ManyToOne(()=> Currency)
    @JoinColumn({name: 'currencyId'})
    @AutoMap()
    currency: Currency

    @AutoMap()
    @Column({type: 'int'})
    currencyId: number

    @AutoMap()
    @Column({type:'varchar', length:255 })
    accountName: string

}
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Library {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @Column()
    public bookname: string;

    @Column()
    public libraryname: string;

    @Column()
    public writer: string;

    @Column()
    public publisher: string;
}

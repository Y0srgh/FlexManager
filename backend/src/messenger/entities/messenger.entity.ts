import { ManyToOne,JoinColumn,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn } from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";
@Entity()
export class Messenger {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    // @ManyToOne(() => User)
    // @JoinColumn()
    // sender: User;
  
    // @ManyToOne(() => User)
    // @JoinColumn()
    // recipient: User;
    @Column()
    roomId : string;
    
    @Column()
    senderId: string;
    @Column()
    recipientId: string;
    @Column()
    content: string;
  
    @CreateDateColumn()
    createdAt: Date;
}

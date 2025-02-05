import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn ,OneToOne, JoinColumn, ManyToOne, } from 'typeorm';

@Entity('siteSubscriptions')
export class OneTimePayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({default : ""})
  stripeCustomerId: string;

  @Column({default : ""})
  stripePaymentId: string;

  @Column()
  priceId: string;
  @Column({default : null})
  Plan: string;
  
  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(()=> UserEntity,(user) => user.oneTimePayment,{
    nullable:false,
  })
  @JoinColumn({name : 'userId' })
  user : UserEntity;

  @UpdateDateColumn()
  updatedAt: Date;
}

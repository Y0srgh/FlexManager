import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn ,OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { TimestampEntity } from 'src/Generics/timestamp.entities';
@Entity('siteSubscriptions')
export class siteSubscriptions {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({default : ""})
  stripeCustomerId: string;

  @Column({default : ""})
  stripeSubscriptionId: string;

  @Column()
  priceId: string;
  @Column({default : "FREETRIAL"})
  Plan: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(()=> UserEntity,(user) => user.siteSubscription,{
    nullable:false,
  })
  @JoinColumn({name : 'userId' })
  user : UserEntity;

  @UpdateDateColumn()
  updatedAt: Date;
  getDaysSinceSubscription(): number {
    const today = new Date();
    const diffTime = today.getTime() - this.updatedAt.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }
  CheckSubscription(): void{
    if (this.getDaysSinceSubscription() >=30){
      this.Plan="FREETRIAL"
      this.isActive=false
    }
  }

}

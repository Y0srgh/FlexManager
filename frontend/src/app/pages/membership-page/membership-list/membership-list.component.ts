import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsModalComponent } from './details-dialog/details-modal/details-modal.component';
import { MembershipService } from 'src/app/services/membership.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membership',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.css']
})
export class MemberShipComponent implements OnInit {
  subscriptions:any = [];
  selectedSubscription:any

  imagesMap: { [key: number]: string } = {
    1: "assets/bodybuilding.jpg",
    2: "assets/cardio.jpeg",
    3: "assets/swiming.jpeg",
    4: "assets/fullAccees.jpeg",
    5: "assets/weekendonly.jpeg",
    6: "assets/morning.jpeg",
    7: "none"
  };

  constructor(private memberShipService: MembershipService,
    private dialog: MatDialog , private router:Router
  ) {}

  ngOnInit(): void {
    this.memberShipService.getMemberships().subscribe(
      (data) => {
        this.subscriptions = data.map(item => ({
      ...item,
      image: this.imagesMap[item.id] !== "none" ? this.imagesMap[item.id] : null
    }));;
        console.log(this.subscriptions)
      },
      (error) => {
        console.error('Erreur lors du chargement des abonnements', error);
      }
    );
  }
  openModal(subscription:any){

    this.dialog.open(DetailsModalComponent, {
      data:subscription,
      minWidth:'500px'
    });
  }
  OnclickPay(){
    this.router.navigate(["/payment"]);
  }

}

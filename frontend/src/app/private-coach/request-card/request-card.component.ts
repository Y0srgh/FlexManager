import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent {
  @Input() name: string = 'Rayen';
  @Input() time: string = '5:00 PM, Jan 12';
  @Input() imageUrl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_699OIlro1Us8yuRGDpgO1q1Tj2dIIeJQA&s';

  onAccept() {
    console.log('Request accepted');
  }

  onRefuse() {
    console.log('Request refused');
  }
}

  

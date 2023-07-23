import {Component, OnInit} from '@angular/core';
import {SubscribersService} from "../../services/subscribers.service";

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subscribersArray: Array<any> = [];

  constructor(private subscriberService: SubscribersService) {
  }

  ngOnInit(): void {
    this.subscriberService.loadData().subscribe(value => {
      this.subscribersArray = value;
    })
  }

  onDelete(id: number) {
    this.subscriberService.deleteData(id);
  }

}

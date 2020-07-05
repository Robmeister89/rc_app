import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  listItems = ['item1', 'item2', 'item3'];

  listTitle: string;

  getList(item: string){
    // do something to grab items from firebase
    this.listItems = ['item1', 'item2', 'item3'];
  }

}

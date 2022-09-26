
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalSearchService } from '../service/searchDataPassService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(private dataSearch: GlobalSearchService) {}
  ngOnInit(): void {}

  //search logic
  // @Input() name: string | undefined;

  public onInput(event: any) {
    this.dataSearch.searchTerm.next(event.target.value);
  } 
}

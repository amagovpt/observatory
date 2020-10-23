import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ListTags } from '../models/list-tags';

@Component({
  selector: 'app-observatory-numbers',
  templateUrl: './observatory-numbers.component.html',
  styleUrls: ['./observatory-numbers.component.scss']
})
export class ObservatoryNumbersComponent implements OnInit {

  listTags: ListTags;

  constructor(private readonly data: DataService) { }

  ngOnInit(): void {
    this.listTags = this.data.getListTags();
  }
}

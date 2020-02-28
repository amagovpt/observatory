import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ListTags } from '../models/list-tags';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listTags: ListTags;

  constructor(private readonly data: DataService) { }

  ngOnInit(): void {
    this.listTags = this.data.getListTags();
  }
}

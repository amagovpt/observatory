import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ListTags } from '../models/list-tags';

@Component({
  selector: 'app-directories',
  templateUrl: './directories.component.html',
  styleUrls: ['./directories.component.scss']
})
export class DirectoriesComponent implements OnInit {

  listTags: ListTags;

  constructor(private readonly data: DataService) { }

  ngOnInit(): void {
    this.listTags = this.data.getListTags();
  }
}

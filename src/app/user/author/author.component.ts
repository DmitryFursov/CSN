import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  @Input() user:User
  
  constructor() { }

  ngOnInit(): void {
  }

}

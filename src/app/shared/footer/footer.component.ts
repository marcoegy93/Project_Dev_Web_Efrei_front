import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  data : Date = new Date();
  date: {year: number, month: number};
  constructor() { }

  ngOnInit(): void {
  }

}

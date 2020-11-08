import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createtest',
  templateUrl: './createtest.component.html',
  styleUrls: ['./createtest.component.scss']
})

export class CreatetestComponent implements OnInit {
  questionBlockShow: boolean;
  testName: string;

  constructor() { }

  ngOnInit(): void {
    
  }


}

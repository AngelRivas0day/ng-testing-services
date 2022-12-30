import {Component, OnInit} from '@angular/core';
import {Calculator} from "./calculator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-testing-services';

  ngOnInit() {
	  const calculator = new Calculator();
	  const rta = calculator.multitply(5 , 2);
	  const rta2 = calculator.divide(1, 1);
  }
}

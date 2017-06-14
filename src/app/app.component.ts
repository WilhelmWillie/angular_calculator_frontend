import { Component } from '@angular/core';

import { MathService } from './math.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public num1 = 0;
  public num2 = 0;
  private result = 0;
  private operation;

  constructor(private mathService : MathService) {}

  add() {
    this.operation = "ADD";

    this.mathService.addNumbers(this.num1, this.num2)
                    .then((data) => {
                      console.log(data);
                      this.result = data.result;
                    });
  }

  subtract() {
    this.operation = "SUBTRACT";

    this.mathService.subtractNumbers(this.num1, this.num2)
                    .then((data) => {
                      this.result = data.result;
                    });
  }

  multiply() {
    this.operation = "MULTIPLY";

    this.mathService.multiplyNumbers(this.num1, this.num2)
                    .then((data) => {
                      this.result = data.result;
                    });
  }

  divide() {
    this.operation = "DIVIDE";

    this.mathService.divideNumbers(this.num1, this.num2)
                    .then((data) => {
                      this.result = data.result;
                    });
  }
}

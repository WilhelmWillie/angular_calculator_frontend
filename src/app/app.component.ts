import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private num1 = 0;
  private num2 = 0;
  private result = 0;
  private operation;

  add() {
    this.operation = "ADD";
    this.result = this.num1 + this.num2;
  }

  subtract() {
    this.operation = "SUBTRACT";
    this.result = this.num1 - this.num2;
  }

  multiply() {
    this.operation = "MULTIPLY";
    this.result = this.num1 * this.num2;
  }

  divide() {
    this.operation = "DIVIDE";
    this.result = this.num1 / this.num2;
  }
}

import { Component, OnInit, HostListener } from '@angular/core';
import { AnalyticalService } from '../analytical.service';

declare var $: any;

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements OnInit {

  analyticalMethods: any[];
  height: number;
  constructor(private analyticalService: AnalyticalService) {
    setTimeout(() => this.heightCalculation(), 200);
  }

  ngOnInit() {
    this.analyticalService.updateStorage.subscribe(() => {
      this.analyticalMethods = this.getAnalyticalMethods();
    });
    this.analyticalMethods = this.getAnalyticalMethods();
    this.createAnalyticalMethod();
  }

  heightCalculation() {
    const cheight = $('.container').height();
    this.height = (cheight - 149 - 34);
  }

  getAnalyticalMethods() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
   }
    return keys;
  }

  editAnalyticalMethod(method: any) {
    this.analyticalService.editMethodData(method);
  }

  createAnalyticalMethod() {
    this.analyticalService.createMethodData();
  }

}

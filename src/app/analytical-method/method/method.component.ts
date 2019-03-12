import { Component, OnInit, HostListener } from '@angular/core';
import { AnalyticalService } from '../analytical.service';

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements OnInit {

  analyticalMethods:any[];
  constructor(private analyticalService: AnalyticalService) {

  }

  // @HostListener('click')
  // click(){
  //   this.analyticalService.toggle();
  // }

  ngOnInit() {
    this.analyticalMethods = this.getAnalyticalMethods();
    this.createAnalyticalMethod();
  }

  getAnalyticalMethods(){
    return [
      'AMX11/11CH/001',
      'AMX11/11CH/002',
      'AMX11/11CH/003'
    ]
  }

  editAnalyticalMethod(method: any){
    this.analyticalService.editMethodData(method)
  }

  createAnalyticalMethod(){
    this.analyticalService.createMethodData();
  }

}

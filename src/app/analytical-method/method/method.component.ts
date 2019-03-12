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
    this.analyticalService.updateStorage.subscribe(()=>{
      this.analyticalMethods = this.getAnalyticalMethods();
    })
    this.analyticalMethods = this.getAnalyticalMethods();
    this.createAnalyticalMethod();
  }

  getAnalyticalMethods(){
    let keys = [];
    for (let i=0; i<localStorage.length; i++){
      keys.push(localStorage.key(i));
   }
    return keys;
  }

  editAnalyticalMethod(method: any){
    this.analyticalService.editMethodData(method)
  }

  createAnalyticalMethod(){
    this.analyticalService.createMethodData();
  }

}

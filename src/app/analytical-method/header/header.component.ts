import { Component, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { AnalyticalService } from '../analytical.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private analyticalService: AnalyticalService) { }
  analyticalMethods: any[];
  selectedOption: string;
  ngOnInit() {
    this.analyticalService.updateStorage.subscribe(() => {
      this.analyticalMethods = this.getAnalyticalMethods();
    });
    this.analyticalMethods = this.getAnalyticalMethods();
  }

  getAnalyticalMethods() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
   }
    return keys;
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.analyticalService.editMethodData(this.selectedOption);
  }

}

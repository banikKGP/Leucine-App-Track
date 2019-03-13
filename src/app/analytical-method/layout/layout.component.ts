import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @ViewChild('header') header: ElementRef;
  @ViewChild('header') footer: ElementRef;
  height: any;
  constructor() {
    setTimeout(() => this.heightCalculation(), 200);
  }

  ngOnInit() {
  }
  heightCalculation() {
    const winHeight = $(window).height();
    this.height = (winHeight - 90);
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { MethodComponent } from './method/method.component';
import { FormComponent } from './form/form.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [HeaderComponent, LayoutComponent, FooterComponent, MethodComponent, FormComponent],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TypeaheadModule.forRoot(),
    FormsModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class AnalyticalMethodModule { }

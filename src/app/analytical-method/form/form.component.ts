import { Component, OnInit } from '@angular/core';
import { AnalyticalService } from '../analytical.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  Substances: any[] = [
    'API',
    'Cleaning Agent',
    'Bioburden',
    'Endotoxin'
  ];
  isSwabCollapsed: boolean;
  isRinseCollapsed: boolean;
  rinseConfigure: String;
  swabConfigure: String;
  tLimitChecked: boolean;
  selectedSubstance: string;
  rinseLimitChecked: boolean;
  swabLimitChecked: boolean;
  curMethodData: any;
  
  constructor(private analyticalService: AnalyticalService) { }

  ngOnInit() {
    this.isSwabCollapsed = true;
    this.rinseConfigure = 'Configure'
    this.isRinseCollapsed = true;
    this.swabConfigure = 'Configure';
    this.tLimitChecked = true;
    this.selectedSubstance = this.Substances[0];
    this.rinseLimitChecked = true
    this.swabLimitChecked = true;
    this.resetData();
    this.analyticalService.edit.subscribe(method => {
      this.curMethodData = this.getAnalyticalMethod(method);
    })
    this.analyticalService.create.subscribe(() => {
      this.resetData();
    })
  }

  resetData(){
    this.curMethodData = {
      "analyticalMethodId": undefined,
      "residueType": undefined,
      "LOD": undefined,
      "LOQ": undefined,
      "reason": undefined,
      "usedMethod": undefined,
      "tLimit": undefined,
      "TNTC": undefined,
      "TFTC": undefined,
      "SwabSample": {
        "usedMethod": undefined,
        "solventName": undefined,
        "solventQuantity": undefined,
        "defaultRecovery": undefined
      },
      "RinseSample": {
        "usedMethod": undefined,
        "defaultRecovery": undefined
      }
    };
  }

  toggleRinse(){
    this.isRinseCollapsed = !this.isRinseCollapsed
    if(this.isRinseCollapsed) this.rinseConfigure = 'Configure'
    else this.rinseConfigure = 'Remove'
  }

  toggleSwab(){
    this.isSwabCollapsed = !this.isSwabCollapsed
    if(this.isSwabCollapsed) this.swabConfigure = 'Configure'
    else this.swabConfigure = 'Remove'
  }
  
  getAnalyticalMethod(method){
    return {
      "analyticalMethodId": method,
      "residueType": 1,
      "LOD": 10,
      "LOQ": 15,
      "reason": "reason 1",
      "usedMethod": undefined,
      "tLimit": undefined,
      "TNTC": undefined,
      "TFTC": undefined,
      "SwabSample": {
        "usedMethod": "Swab XYZ Method",
        "solventName": "XYZ Solvent",
        "solventQuantity": 70,
        "defaultRecovery": 10
      },
      "RinseSample": {
        "usedMethod": "Rinse XYZ Method",
        "defaultRecovery": 27
      }
    }
  }

}

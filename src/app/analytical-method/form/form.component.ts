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
  isCreate: boolean;
  isMocAdded: boolean;
  mocCount: number;

  constructor(private analyticalService: AnalyticalService) { }

  ngOnInit() {
    this.resetForm();
    this.resetData();
    this.analyticalService.edit.subscribe(method => {
      this.isCreate = false
      this.curMethodData = this.getAnalyticalMethod(method);
      this.selectedSubstance = this.curMethodData.residueType;
      console.log(this.selectedSubstance);
    })
    this.analyticalService.create.subscribe(() => {
      this.isCreate = true;
      this.resetData();
    })
  }

  resetForm() {
    this.isCreate = true;
    this.isSwabCollapsed = true;
    this.rinseConfigure = 'Configure'
    this.isRinseCollapsed = true;
    this.swabConfigure = 'Configure';
    this.tLimitChecked = true;
    this.selectedSubstance = this.Substances[0];
    this.rinseLimitChecked = true
    this.swabLimitChecked = true;
    this.isMocAdded = false;
    this.mocCount = 0;
  }

  resetData() {
    this.curMethodData = {
      "analyticalMethodId": undefined,
      "residueType": undefined,
      "LOD": undefined,
      "LOQ": undefined,
      "reason": undefined,
      "usedMethod": undefined,
      "tLimit": true,
      "TNTC": undefined,
      "TFTC": undefined,
      "SwabSample": {
        "usedMethod": undefined,
        "solventName": undefined,
        "solventQuantity": undefined,
        "defaultRecovery": undefined,
        "isSwabRecovery": true,
        "swabRecovery": undefined,
        "moc": [
        ]
      },
      "RinseSample": {
        "usedMethod": undefined,
        "defaultRecovery": undefined,
        "rinseSolventVolume": undefined,
        "isRinseRecovery":true,
        "rinseRecovery": undefined,
        "moc": [
        ]
      }
    };
  }

  toggleRinse() {
    this.isRinseCollapsed = !this.isRinseCollapsed
    if (this.isRinseCollapsed) {
      this.rinseConfigure = 'Configure';
      this.curMethodData.RinseSample = {
        "usedMethod": undefined,
        "defaultRecovery": undefined,
        "rinseSolventVolume": undefined,
        "isRinseRecovery":true,
        "rinseRecovery": undefined,
        "moc": [
        ]
      }
    }
    else this.rinseConfigure = 'Remove';
  }

  toggleSwab() {
    this.isSwabCollapsed = !this.isSwabCollapsed;
    this.isMocAdded = false;
    if (this.isSwabCollapsed){
      this.swabConfigure = 'Configure';
      this.curMethodData.SwabSample = {
        "usedMethod": undefined,
        "solventName": undefined,
        "solventQuantity": undefined,
        "defaultRecovery": undefined,
        "isSwabRecovery": true,
        "swabRecovery": undefined,
        "moc": [
        ]
      }
    }
    else this.swabConfigure = 'Remove'
  }

  getAnalyticalMethod(method) {
    return JSON.parse(localStorage.getItem(method));
  }

  save() {
    localStorage.setItem(this.curMethodData.analyticalMethodId, JSON.stringify(this.curMethodData));
    this.resetData();
    this.resetForm();
    this.analyticalService.updateLocalStorage();
  }

  cancel() {
    this.resetForm();
    this.resetData();
  }

  selectResidue(substance){
    this.selectedSubstance = substance; 
    this.curMethodData.residueType = substance;
  }

  addMOC(){
    this.isMocAdded = true;
    this.curMethodData.SwabSample.moc.push({
      "mocType": undefined,
      "recovery": undefined
    })
  }

  removeMOC(moc){
    if(this.curMethodData.SwabSample.moc.includes(moc)){
      this.curMethodData.SwabSample.moc.splice(moc,1);
    }
    if(!this.curMethodData.SwabSample.moc.length) this.isMocAdded = false;
  }

}

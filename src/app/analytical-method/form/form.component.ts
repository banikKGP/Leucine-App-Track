import { Component, OnInit } from '@angular/core';
import { AnalyticalService } from '../analytical.service';

declare var $: any;

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
  MOCList: any[] = [
    'Stainless Steel',
    'Glass',
    'Teflon',
    'Plastic'
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
  isRinseMocAdded: boolean;
  mocCount: number;
  swabMoc: String;
  height: number;

  constructor(private analyticalService: AnalyticalService) {
    setTimeout(() => this.heightCalculation(), 200);
   }

  ngOnInit() {
    this.resetForm();
    this.resetData();
    this.analyticalService.edit.subscribe(method => {
      this.isCreate = false;
      this.curMethodData = this.getAnalyticalMethod(method);
      this.selectedSubstance = this.curMethodData.residueType;
      console.log(this.selectedSubstance);
    });
    this.analyticalService.create.subscribe(() => {
      this.isCreate = true;
      this.resetData();
    });
  }

  heightCalculation() {
    const cheight = $('.container').height();
    this.height = (cheight - 149);
  }

  resetForm() {
    this.isCreate = true;
    this.isSwabCollapsed = true;
    this.rinseConfigure = 'Configure';
    this.isRinseCollapsed = true;
    this.swabConfigure = 'Configure';
    this.tLimitChecked = true;
    this.selectedSubstance = this.Substances[0];
    this.rinseLimitChecked = true;
    this.swabLimitChecked = true;
    this.isMocAdded = false;
    this.isRinseMocAdded = false;
    this.mocCount = 0;
    this.swabMoc = this.MOCList[0];
  }

  resetData() {
    this.curMethodData = {
      'analyticalMethodId': undefined,
      'residueType': this.Substances[0],
      'LOD': undefined,
      'LOQ': undefined,
      'reason': undefined,
      'usedMethod': undefined,
      'tLimit': true,
      'TNTC': undefined,
      'TFTC': undefined,
      'SwabSample': {
        'usedMethod': undefined,
        'solventName': undefined,
        'solventQuantity': undefined,
        'defaultRecovery': undefined,
        'isSwabRecovery': true,
        'swabRecovery': undefined,
        'moc': [
        ]
      },
      'RinseSample': {
        'usedMethod': undefined,
        'defaultRecovery': undefined,
        'rinseSolventVolume': undefined,
        'isRinseRecovery': true,
        'rinseRecovery': undefined,
        'moc': [
        ]
      }
    };
  }

  toggleRinse() {
    this.isRinseCollapsed = !this.isRinseCollapsed;
    this.isRinseMocAdded = false;
    if (this.isRinseCollapsed) {
      this.rinseConfigure = 'Configure';
      this.curMethodData.RinseSample = {
        'usedMethod': undefined,
        'defaultRecovery': undefined,
        'rinseSolventVolume': undefined,
        'isRinseRecovery': true,
        'rinseRecovery': undefined,
        'moc': [
        ]
      };
    } else { this.rinseConfigure = 'Remove'; }
  }

  toggleSwab() {
    this.isSwabCollapsed = !this.isSwabCollapsed;
    this.isMocAdded = false;
    if (this.isSwabCollapsed) {
      this.swabConfigure = 'Configure';
      this.curMethodData.SwabSample = {
        'usedMethod': undefined,
        'solventName': undefined,
        'solventQuantity': undefined,
        'defaultRecovery': undefined,
        'isSwabRecovery': true,
        'swabRecovery': undefined,
        'moc': [
        ]
      };
    } else { this.swabConfigure = 'Remove'; }
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

  selectResidue(substance) {
    this.selectedSubstance = substance;
    this.curMethodData.residueType = substance;
  }

  addMOC() {
    this.isMocAdded = true;
    // this.swabMoc = this.MOCList[0];
    this.curMethodData.SwabSample.moc.push({
      'mocType': this.MOCList[0],
      'recovery': undefined
    });
  }

  addRinseMOC() {
    this.isRinseMocAdded = true;
    // this.swabMoc = this.MOCList[0];
    this.curMethodData.RinseSample.moc.push({
      'mocType': this.MOCList[0],
      'recovery': undefined
    });
  }

  removeMOC(moc, idx) {
    if (this.curMethodData.SwabSample.moc.includes(moc)) {
      this.curMethodData.SwabSample.moc.splice(idx, 1);
    }
    if (!this.curMethodData.SwabSample.moc.length) { this.isMocAdded = false; }
  }

  removeRinseMOC(moc, idx) {
    if (this.curMethodData.RinseSample.moc.includes(moc)) {
      this.curMethodData.RinseSample.moc.splice(idx, 1);
    }
    if (!this.curMethodData.RinseSample.moc.length) { this.isRinseMocAdded = false; }
  }

  selectMocType(moc, idx) {
    this.curMethodData.SwabSample.moc[idx].mocType = moc;
  }

  selectRinseMocType(moc, idx) {
    this.curMethodData.RinseSample.moc[idx].mocType = moc;
  }

}

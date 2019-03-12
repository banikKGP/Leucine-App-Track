import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticalService {
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();
  constructor() { }

  editMethodData(method){
    this.edit.emit(method);
  }
  createMethodData(){
    this.create.emit();
  }
}

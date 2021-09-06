import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
@Component({
  selector: 'app-file-render-component',
  templateUrl: './file-render-component.component.html',
  styleUrls: ['./file-render-component.component.scss']
})
export class FileRenderComponentComponent extends DefaultEditor     {
  @Output() open: EventEmitter<any> = new EventEmitter();
  @ViewChild('fileInput') fileInputVariable: any;
 @ViewChild('name') name: ElementRef;
 

  constructor() {
    super()
   }
   


 
updateValue(e: any) {
  this.cell.newValue = this.fileInputVariable.nativeElement.files;
  
  this.open.emit(this.cell.newValue);
}

}

import { Component, OnInit } from '@angular/core';
import { parse } from 'papaparse'

@Component({
  selector: 'app-box-numbers',
  templateUrl: './box-numbers.component.html',
  styleUrls: ['./box-numbers.component.scss']
})
export class BoxNumbersComponent implements OnInit {
  public files: File[] = [];
  public boxNumbers: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  public onSelect = (event: any) => {
    this.files.push(...event.addedFiles);
  }

  public onRemove =(event: any) => {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadFile = () => {
    this.boxNumbers = [];
    if (this.files[0]) {
      parse(this.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          for (let box of result.data) {
            const  variable = box as string
            const variableValue: string = Object.values(variable)[0]
            if(variableValue.includes('201')){
              const newBoxNumber: string = variableValue.substring(3);
              this.boxNumbers.push(newBoxNumber);
            } else {
              this.boxNumbers.push(variableValue);
            }
          }
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { parse } from 'papaparse'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-serial-numbers',
  templateUrl: './serial-numbers.component.html',
  styleUrls: ['./serial-numbers.component.scss']
})
export class SerialNumbersComponent implements OnInit {
  public files: File[] = [];
  public serialNumbers: any = [];
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
    this.serialNumbers = [];
    if (this.files[0]) {
      parse(this.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          for (let serial of result.data) {
            const  variable: any = serial as string
            console.log(variable)
            this.serialNumbers.push(variable)
            // this.serialNumbers.push({value:variable.value, name: variable.name.trim()});
          }
        }
      });
    }
  }

}

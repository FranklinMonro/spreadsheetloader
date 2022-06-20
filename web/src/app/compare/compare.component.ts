import { Component, OnInit } from '@angular/core';
import { parse } from 'papaparse'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  public files: File[] = [];
  public serialNumbers: string[] = [];
  public serialList1: any[] = [];
  public serialList2: any[] = [];
  public compareObject: any[] = []
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
    let serialIncoming: any[] = [];
    let count = 0;
    if (this.files[0]) {
      parse(this.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          for (let serial of result.data) {
            count++;
            const  variable: string = serial as string;
            serialIncoming.push(Object.values(variable)[0]);
            if (count === result.data.length) {
              this.addToArrays(serialIncoming);
            }
          }
        }
      });
    }
  }

  private addToArrays = (serials: string[]):void => {
    if (this.serialList1.length === 0) {
      for (let serial1 of serials) {
        this.serialList1.push(serial1);
      }
      
    } else {
      for (let serial2 of serials) {
        this.serialList2.push(serial2);
      }
    }
  }

  public compareSerialLists = async():Promise<void> => {
    let count = 0;
    console.log(this.serialList1)
    console.log(this.serialList2)
    for (let serial1 of this.serialList1) {
      count++;
      const result = await this.compareWithList2(serial1);
      this.compareObject.push(result)
    }
  }

  public compareWithList2 = (serial1: string) => {
    return new Promise((resolve, reject) => {
      const inList2 = this.serialList2.includes(serial1);
      if (inList2 === true) {
        resolve({
          serialNumber: serial1,
          compare: 'In Both List'
        });
      } else {
        resolve({
          serialNumber: serial1,
          compare: 'Only in list of 2021-08-25'
        });
      }
    })
  }

  

  public exportExcel = ():void => {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.compareObject);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Compare.xlsx');
  }
}

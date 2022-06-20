import { Component, OnInit } from '@angular/core';
import { parse } from 'papaparse'
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-response-timer',
  templateUrl: './response-timer.component.html',
  styleUrls: ['./response-timer.component.scss']
})
export class ResponseTimerComponent implements OnInit {
  public fileNameDate!: string;
  constructor() { }
  public files: File[] = [];
  ngOnInit(): void {
  }

  public onSelect = (event: any) => {
    this.files.push(...event.addedFiles);
  }

  public onRemove =(event: any) => {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadFile = () => {
    const restTime: any = [];
    if (this.files[0]) {
      parse(this.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          const splitFileName = file!.name.split('-');
          this.fileNameDate = `${splitFileName[1]}-${splitFileName[2]}-${splitFileName[3].split('.')[0]}`
          for (let respTime of result.data) {
            const  variable = respTime as string;
            const respString: string = Object.values(variable)[0];
            if (!respString.includes('OPTIONS') && !respString.includes('HEAD')) {
              const splitrespString = respString.split(' ');
              const respDate = splitrespString[0];
              const respREST = splitrespString[3];
              const respURLBeforeSplit = splitrespString[5];
              const respURLSplit = splitrespString[5].split('/');
              const respURLSplit1 = respURLSplit[1]
              const respURLSplit2 = respURLSplit[2]
              const respTime = splitrespString[7];
              let url1;
              if (respURLSplit1.match(".*\\d.*")) {
                url1 = respURLSplit1.split('?')[0]
              } else {
                url1 = respURLSplit1
              }
              let url2 = '';
              if (respURLSplit2 !== undefined && respURLSplit2 !== '') {
                if (!respURLSplit2.match(".*\\d.*")) {
                  url2 = respURLSplit2;
                }
              }
              let respURL;
              if (url2 !== '') {
                respURL = `/${url1}/${url2}`
              } else {
                respURL = `/${url1}`
              }
              restTime.push({
                date: respDate,
                rest: respREST,
                url: respURL,
                time: parseFloat(respTime),
              });
            }
          }
          this.combineCalls(restTime)
        }
      });
    }
  }

  public combineCalls = (restTime: any[]): void => {
    const combineRESTCalls = [];
    for (const call of restTime) {
      if (combineRESTCalls.length === 0) {
        combineRESTCalls.push({
                              date: new Date(call.date),
                              rest: call.rest,
                              url: call.url,
                              time: call.time,
                              count: 1
                          });
      } else {
        const index = combineRESTCalls.findIndex(x => x.rest === call.rest && x.url === call.url);
        if (index === -1) {
          combineRESTCalls.push({
                                date: new Date(call.date),
                                rest: call.rest,
                                url: call.url,
                                time: call.time,
                                count: 1
                            });
        } else {
          combineRESTCalls[index]['time'] = combineRESTCalls[index]['time'] + call.time;
          combineRESTCalls[index]['count'] = combineRESTCalls[index]['count'] + 1;
        }
      }
    }
    this.createAverage(combineRESTCalls);
  }

  public createAverage = (combinedCalls: any[]): void => {
    const avgCombinedCalls = [];
    for (const call of combinedCalls) {
      call['average'] = call['time'] / call['count'];
      avgCombinedCalls.push(call);
    }
    this.createXLSX(avgCombinedCalls);
  }

  public createXLSX = (avgCalls: any[]): void => {
    console.log(avgCalls);
    const sheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(avgCalls);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Response Time');
    XLSX.writeFile(workbook, `response_time_${this.fileNameDate}.xlsx`);
  }
}

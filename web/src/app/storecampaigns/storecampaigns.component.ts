import { Component, OnInit } from '@angular/core';
import { type } from 'os';
import { parse } from 'papaparse'

@Component({
  selector: 'app-storecampaigns',
  templateUrl: './storecampaigns.component.html',
  styleUrls: ['./storecampaigns.component.scss']
})
export class StorecampaignsComponent implements OnInit {
  public files: File[] = [];
  public storeNames: any = [];
  public storeNameObject: any = [];
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
    const storeNames:any = [];
    let count = 0;
    if (this.files[0]) {
      parse(this.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
            let storeNameArray: any = [];
            for (let store of result.data) {
              count++;
              const  variable = store as any
              variable['StoreName'] = variable['StoreName'].replace(/\s/g,'')
              //variable['StoreName'] = variable['StoreName'].replace(/\"/g,'')
              // variable['StoreName'] = variable['StoreName'].replace(/\,/g,'')
              
              //storeNameArray.push(variable['store']);
              storeNameArray.push(variable);
              //storeNames.push(...Object.values(variable))
              
              if (count === result.data.length) {
                //storeNameArray = storeNameArray.sort(function(a: any, b:any) {return Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0]))})
                //storeNameArray = storeNameArray.sort(new Intl.Collator('en',{numeric:true, sensitivity:'accent'}).compare)
                storeNameArray.sort(function (a: any, b: any) {return Number(a.StoreName.split('-')[0]) - Number(b.StoreName.split('-')[0])} )
                console.log(storeNameArray)
                // for (const store of storeNameArray) {
                //   this.storeNameObject.push({
                //     "value": store.StoreName,
                //     "name": store.StoreName
                //   })
                // }
                this.storeNameObject = storeNameArray;
              }
            }
        }
      });
    }
  }
}

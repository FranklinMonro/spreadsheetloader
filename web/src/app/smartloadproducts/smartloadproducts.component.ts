import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-smartloadproducts',
  templateUrl: './smartloadproducts.component.html',
  styleUrls: ['./smartloadproducts.component.scss']
})
export class SmartloadproductsComponent implements OnInit {
  public productString!: string;
  public allProductString!: string;
  constructor() { }

  ngOnInit(): void {
  }

  public createJSONforExcelFileSingle = () => {
    const jsonProducts = JSON.parse(this.productString);
    const productTypes = jsonProducts.response.productTypes;
    const excelJSON = [];
    for (const product of productTypes) {
      excelJSON.push(...product.products)
    }
    const productDetails: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelJSON);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, productDetails, 'Products');
    XLSX.writeFile(workbook, 'cellC_products.xlsx');
  }

  public createJSONforExcelFileAll = () => {
    const jsonProducts = JSON.parse(this.allProductString).response.networks;
    const excelJSON = [];
    for (const networkProducts of jsonProducts) {
      for (const product of networkProducts.productTypes) {
        excelJSON.push(...product.products)
      }
    }
    const productDetails: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelJSON);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, productDetails, 'Products');
    XLSX.writeFile(workbook, 'allNetworkds_products.xlsx');
  }

}

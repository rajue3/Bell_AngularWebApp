import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/test.product.service';
// import { TableModule } from 'primeng/table';
// import { CommonModule } from '@angular/common';
// import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-update-mrp',
  //standalone: true,
  templateUrl: './update-mrp.component.html',
  styleUrl: './update-mrp.component.css',
  //imports: [TableModule, InputTextModule, CommonModule],
  providers: [ProductService]
})
  
export class UpdateMRPComponent implements OnInit {
    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsMini().then((data:any) => {
            this.products = data;
        });
    }
    UpdateEditedRows() {
      console.log ('Updated Products: ',this.products);
    }
    CancelEditedRows() {
      this.productService.getProductsMini().then((data:any) => {
        this.products = data;
      });
    }
}
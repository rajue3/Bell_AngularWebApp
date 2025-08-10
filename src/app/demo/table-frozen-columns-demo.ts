import { Component, OnInit } from '@angular/core';
//import { Customer } from '@domain/customer';
import { CustomerService } from 'src/app/services/customerservicedemo';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: number;
}

@Component({
    selector: 'table-frozen-columns-demo',
    templateUrl: 'table-frozen-columns-demo.html',
    standalone: true,
    imports: [TableModule, ToggleButtonModule, FormsModule],
    providers: [CustomerService],
    styles: [
        `:host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }
        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }`
    ],
})
export class TableFrozenColumnsDemo implements OnInit{
    balanceFrozen: boolean = false;

    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
}
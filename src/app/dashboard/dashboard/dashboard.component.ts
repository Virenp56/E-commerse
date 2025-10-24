import { Component } from '@angular/core';
import { ECommerceService } from 'src/app/e-commerce.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isFilterVisible = false;
  products: any[] = [];
  constructor(private eCommerceService: ECommerceService) {}
  ngOnInit() {
    this.loadProducts();
  }
  handleToggle() {
    this.isFilterVisible = !this.isFilterVisible;
  }
  loadProducts() {
    this.eCommerceService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }
}

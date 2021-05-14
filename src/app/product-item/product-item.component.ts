import { Component, Input, OnInit } from '@angular/core';
import { Phone } from '../models/Phone';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Phone;
  constructor(private service: ProductService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.service.addToCart(this.product)
  }
}

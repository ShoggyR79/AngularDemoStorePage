import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private service: ProductService) { }

  cart = [];
  total = 0;

  ngOnInit(): void {
    this.service.totalObj.subscribe((val) => {
      this.total = val.total;
    })
    this.service.cartObj.subscribe((val) => {
      this.cart = val.cartArr;
    })
    this.service.retriveStore();
  }

  changeAmount(id: number, isAdd: boolean) {
    this.service.changeValue(id, isAdd);
  }
  deleteItem(id: number) {
    this.service.deleteFromCart(id);
  }


}

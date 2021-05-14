import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/CartItem';
import { Phone } from '../models/Phone';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  smartPhones: Phone[] = [
    {
      id: 1,
      name: 'Oppo R1',
      image: 'https://cdn.tgdd.vn/Products/Images/42/182153/oppo-f9-red-1.jpg',
      description: 'Sản phẩm của china',
      price: 450,
      invetory: 10,
      rating: 3
    },
    {
      id: 2,
      name: 'Samsung Galaxy Note 9',
      image: 'https://lh3.googleusercontent.com/proxy/gtCsa_LOI2tE_I7X2MZbByULTXjg5WTkjYgHMNaA0WwD6IqODpHMvkH0eN0ztt7DBQRdczSZlANEIdCqpNM5_IHmJSLf6Ib5Oi_IfDhcIrTagzPkVmIllvkma-n8e_lAUZTES0gimtE3M9yj8Xx1',
      description: 'Sản phẩm của Hàn Quốc',
      price: 200,
      invetory: 15,
      rating: 5
    }, {
      id: 3,
      name: 'Iphone XS',
      image: 'http://product.hstatic.net/1000384805/product/dien_thoai_apple_iphone_xs_e5e6be36dd5d4baa9ea8fd28b6170389_grande.jpg',
      description: 'Sản phẩm của US',
      price: 600,
      invetory: 20,
      rating: 4
    }
  ];

  totalObj = new BehaviorSubject({ total: 0 })
  cartObj = new BehaviorSubject({ cartArr: [] })
  cart: CartItem[] = [];
  getProduct() {
    return this.smartPhones;
  }

  updateTotal() {
    let newTotal = 0;
    for (let i = 0; i < this.cart.length; i++) {
      newTotal += (this.cart[i].amount * this.cart[i].price)
    }
    this.totalObj.next({ total: newTotal });
  }
  addToCart(phone: Phone) {

    //check first to see if exist in cart already;
    let index = this.cart.findIndex((item) => phone.id == item.id);
    if (index == -1) {

      this.cart.push({
        id: phone.id,
        img: phone.image,
        name: phone.name,
        price: phone.price,
        amount: 1,
      })
    } else {
      this.cart[index].amount++;
    }
    this.cartObj.next({ cartArr: this.cart })
    this.updateTotal();
    this.setStore();

  }

  changeValue(itemId: number, isAdd: boolean) {
    let index = this.cart.findIndex((item) => itemId == item.id);
    if (isAdd) {
      this.cart[index].amount++;
    }
    else {
      if (this.cart[index].amount > 0) {
        this.cart[index].amount--;
      }
    }
    this.cartObj.next({ cartArr: this.cart })

    this.updateTotal();
    this.setStore();


  }

  deleteFromCart(itemId: number) {
    let index = this.cart.findIndex((item) => itemId == item.id);
    if (index != -1) {
      this.cart.splice(index, 1);
    }
    this.updateTotal();
    this.setStore();
    this.cartObj.next({ cartArr: this.cart })


  }


  setStore() {
    localStorage.setItem("store", JSON.stringify(this.cart));
  }
  retriveStore() {
    this.cart = JSON.parse(localStorage.getItem("store"))
    this.cartObj.next({ cartArr: this.cart })

    console.log(this.cart);
  }
  constructor() { }
}

import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-product-update',
  templateUrl: './product-product-update.component.html',
  styleUrls: ['./product-product-update.component.css']
})
export class ProductProductUpdateComponent implements OnInit {

  product: Product

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Alterado com sucesso!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}

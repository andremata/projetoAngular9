import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Product } from '../product.model';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

product: Product

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage("Excluido com sucesso!")
      this.router.navigate(["/products"])
    })
  }

  cancel(): void {
    this.router.navigate(["/products"])
  }
}

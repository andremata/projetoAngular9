import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' /*padrão de projeto Singleton, uma unica instancia desta classe sera criada em todo o projeto*/
})

export class ProductService {

  urlEndPoint = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.urlEndPoint, product)
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlEndPoint)
  }

  readById(id: number): Observable<Product> {
    const url = `${this.urlEndPoint}/${id}`
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    const url = `${this.urlEndPoint}/${product.id}`
    return this.http.put<Product>(url, product)
  }

  delete(id: number): Observable<Product> {
    const url = `${this.urlEndPoint}/${id}`
    return this.http.delete<Product>(url)
  }
}

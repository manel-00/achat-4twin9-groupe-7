import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly API_URL = 'http://localhost:8089/SpringMVC/produit';

  constructor(private httpClient: HttpClient) {}
  getAllProducts() {
    console.log('[ProductService] Fetching all products...');
    return this.httpClient.get(`${this.API_URL}/retrieve-all-produits`);
  }
  getProduit(id: number) {
    console.log('[ProductService] Fetching product with ID:', id);
    return this.httpClient.get(`${this.API_URL}/retrieve-produit/${id}`);
  }
  addProduct(product: any) {
    console.log('[ProductService] Adding product:', product);
    return this.httpClient.post(`${this.API_URL}/add-produit`, product);
  }
  editProduct(product: any) {
    console.log('[ProductService] Editing product:', product);
    return this.httpClient.put(`${this.API_URL}/modify-produit`, product);
  }
  deleteProduct(idProduct: any) {
    console.log('[ProductService] Deleting product with ID:', idProduct);
    return this.httpClient.delete(
      `${this.API_URL}/remove-produit/${idProduct}`
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../shared/Model/Product';
import { ProductService } from '../shared/Service/Product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  listProducts: any;
  form: boolean = false;
  product!: Product;
  closeResult!: string;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log('[ProductsComponent] Component initialized');
    console.log('[ProductsComponent] Fetching products from service...');
    this.getAllProducts();

    this.product = {
      idProduit: null,
      codeProduit: null,
      libelleProduit: null,
      prix: null,
      dateCreation: null,
      dateDerniereModification: null,
    };
    console.log('[ProductsComponent] Product initialized:', this.product);
  }

  getAllProducts() {
    console.log('[ProductsComponent] Getting all products');
    this.productService.getAllProducts().subscribe(
      (res) => {
        this.listProducts = res;
        console.log('[ProductsComponent] Products loaded:', this.listProducts);
      },
      (error) => {
        console.error('[ProductsComponent] Error loading products:', error);
      }
    );
  }

  addProduct(p: any) {
    console.log('Adding product:', p); // Log the product being added
    this.productService.addProduct(p).subscribe(
      () => {
        console.log('Product added successfully:', p); // Log success message
        this.getAllProducts();
        this.form = false;
      },
      (error) => {
        console.error('Error adding product:', error); // Log error if any
      }
    );
  }

  editProduct(product: Product) {
    console.log('[ProductsComponent] Editing product:', product);
    this.productService.editProduct(product).subscribe(
      () => {
        console.log(
          '[ProductsComponent] Product edited successfully:',
          product
        );
      },
      (error) => {
        console.error('[ProductsComponent] Error editing product:', error);
      }
    );
  }

  deleteProduct(idProduct: any) {
    console.log('[ProductsComponent] Deleting product with ID:', idProduct);
    this.productService.deleteProduct(idProduct).subscribe(
      () => {
        console.log(
          '[ProductsComponent] Product deleted successfully:',
          idProduct
        );
        this.getAllProducts();
      },
      (error) => {
        console.error('[ProductsComponent] Error deleting product:', error);
      }
    );
  }

  open(content: any, action: any) {
    if (action != null) this.product = action;
    else this.product = new Product();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.form = false;
  }
}

import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../shared/Model/Product';
import {ProductService} from '../shared/Service/Product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listProducts: any;
  form: boolean = false;
  product!: Product;
  closeResult!: string;

  constructor(private productService: ProductService, private modalService: NgbModal) {
    console.log('ProductsComponent initialized');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.getAllProducts();

    this.product = {
      idProduit: null,
      codeProduit: null,
      libelleProduit: null,
      prix: null,
      dateCreation: null,
      dateDerniereModification: null
    };
    console.log('Initial product object:', this.product);
  }

  getAllProducts() {
    console.log('Fetching all products...');
    this.productService.getAllProducts().subscribe(
      res => {
        this.listProducts = res;
        console.log('Products fetched successfully:', this.listProducts);
      },
      err => {
        console.error('Error fetching products:', err);
      }
    );
  }

  addProduct(p: any) {
    console.log('Adding product:', p);
    this.productService.addProduct(p).subscribe(
      () => {
        console.log('Product added successfully');
        this.getAllProducts();
        this.form = false;
      },
      err => {
        console.error('Error adding product:', err);
      }
    );
  }

  editProduct(product: Product) {
    console.log('Editing product:', product);
    this.productService.editProduct(product).subscribe(
      () => {
        console.log('Product edited successfully');
      },
      err => {
        console.error('Error editing product:', err);
      }
    );
  }

  deleteProduct(idProduct: any) {
    console.log('Deleting product with ID:', idProduct);
    this.productService.deleteProduct(idProduct).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.getAllProducts();
      },
      err => {
        console.error('Error deleting product:', err);
      }
    );
  }

  open(content: any, action: any) {
    console.log('Opening modal...');
    if (action != null) {
      this.product = action;
      console.log('Editing existing product:', this.product);
    } else {
      this.product = new Product();
      console.log('Creating new product');
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log('Modal dismissed:', this.closeResult);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log('Modal dismissed by pressing ESC');
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log('Modal dismissed by clicking on a backdrop');
      return 'by clicking on a backdrop';
    } else {
      console.log('Modal dismissed with reason:', reason);
      return `with: ${reason}`;
    }
  }

  cancel() {
    console.log('Cancel action triggered');
    this.form = false;
  }
}

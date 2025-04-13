import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from '../shared/Service/Product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return produit par ID', () => {
    const mockProduit = {
      idProduit: 1,
      codeProduit: 'P001',
      libelleProduit: 'Product 1',
      prix: 100,
      dateCreation: '2025-04-14',
      dateDerniereModification: '2025-04-14',
    };

    service.getProduit(1).subscribe((produit) => {
      expect(produit).toBeTruthy();
      expect(produit).toEqual(mockProduit);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/produit/retrieve-produit/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduit);
  });
});
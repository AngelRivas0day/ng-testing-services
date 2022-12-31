import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product.model";

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

	products: Product[] = [];

	constructor(
		private productService: ProductService,
	) {
	}

	ngOnInit(): void {
		this.getAllProducts();
	}

	getAllProducts(): void {
		this.productService.getAllSimple()
			.subscribe((data) => {
				this.products = data;
			});
	}

}

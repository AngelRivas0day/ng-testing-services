import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {MiligramReviewComponent} from "./components/miligram-review/miligram-review.component";

const routes: Routes = [
	{
		path: 'products',
		component: ProductsComponent,
	},
	{
		path: 'miligram-preview',
		component: MiligramReviewComponent,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}

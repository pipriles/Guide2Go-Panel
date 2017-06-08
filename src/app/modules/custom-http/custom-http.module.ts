import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { HttpUtil } from '../../services';

/**
 * Cada request debe hacerse responsable
 * de poner sus headers
 */
export const CustomHeaders = { 
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*'
};

export function authHttpFactory(http: Http, opts: RequestOptions) {
	let conf = new AuthConfig({
		// options...
	});
	return new AuthHttp(conf, http, opts);
}

@NgModule({
	imports: [ HttpModule ],
	providers: [
		HttpUtil,
		{
			provide: AuthHttp,
			useFactory: authHttpFactory,
			deps: [Http, RequestOptions]
		}
	]
})
export class CustomHttpModule { }

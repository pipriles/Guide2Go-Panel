import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';

import { HttpUtil } from '../http-util/http-util.service';

const CustomHeaders = { 
	'Access-Control-Allow-Origin': '*'
};

@Injectable()
export class AudiosService {

  apiRoute: string;
  _headers: Object;

	constructor(
		private authHttp: AuthHttp,
		private httpUtil: HttpUtil) {
		this.apiRoute = `${this.httpUtil.apiUrl}/audio`;
		this._headers = CustomHeaders;
	}

	create(body: {}) {
		let url = this.apiRoute;
		let opt = this.getOptions();

		console.log('Uploading...');
		console.log(url);
		console.log(body);
		return this.authHttp.post(url, body, opt)
			.map((resp: Response) => resp.json());
	}

	getHeaders() {
		return new Headers(this._headers);
	}

	getOptions() {
		return new RequestOptions({ 
			headers: this.getHeaders()
		});
	}

}
 

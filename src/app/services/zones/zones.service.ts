import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';

import { HttpUtil } from '../http-util/http-util.service';

@Injectable()
export class ZonesService {

	zoneRoute: string;

  constructor(
		private http: Http,
		private authHttp: AuthHttp,
		private httpUtil: HttpUtil
	) {
		this.zoneRoute = `${this.httpUtil.apiUrl}/zona`;
	}

	/**
	 * Se trae ese poco e' zonas
	 * del servidor
	 */
	get() {
		let url = this.zoneRoute;
		let opt = this.httpUtil.getOptions();

		return this.authHttp.get(url, opt)
			.map((resp: Response) => resp.json());
	}

	create(body: {}) {
		let url = this.zoneRoute;
		let opt = this.httpUtil.getOptions();

		return this.authHttp.post(url, body, opt)
			.map((resp: Response) => resp.json().data);
	}

}

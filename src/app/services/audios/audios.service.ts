import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';

import { HttpUtil } from '../http-util/http-util.service';

@Injectable()
export class AudiosService {

  apiRoute: string;

	constructor(private authHttp: AuthHttp,private httpUtil: HttpUtil) {
		this.apiRoute = `${this.httpUtil.apiUrl}/audio`;
	}

	create(body: {}) {
		let url = this.apiRoute;
		let opt = this.httpUtil.getOptions();

		return this.authHttp.post(url, body, opt)
			.map((resp: Response) => resp.json());
	}

}
 
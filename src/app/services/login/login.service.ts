import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

// Path explicito para evitar conflictos
import { HttpUtil } from '../http-util/http-util.service';

@Injectable()
export class LoginService {

	constructor(private http: Http, private httpUtil: HttpUtil) {}

	/**
	 * data.email
	 * data.password
	 */
	auth(data: {}) {
		let url = `${this.httpUtil.apiUrl}/login`;
		let opt = this.httpUtil.getOptions();

		return this.http.post(url, data, opt)
			.map((resp) => this.getToken(resp));
	}

	private getToken(resp: Response) {
		let body = resp.json();
		console.debug(body);
		return body.token;
	}

}

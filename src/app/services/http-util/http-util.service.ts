import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

/**
 * Cada request debe hacerse responsable
 * de poner sus headers
 */
const CustomHeaders = { 
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*'
};

@Injectable()
export class HttpUtil {

	_headers: Object;

	constructor() {
		this._headers = CustomHeaders;
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

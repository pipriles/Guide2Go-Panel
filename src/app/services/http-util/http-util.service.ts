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
	apiUrl: string;

	constructor() {
		this._headers = CustomHeaders;
		this.apiUrl = "http://digitalcook.info:8000/api";
		// this.apiUrl = "http://127.0.0.1:8000/api";
		// Deberia agregar tambien las rutas?
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

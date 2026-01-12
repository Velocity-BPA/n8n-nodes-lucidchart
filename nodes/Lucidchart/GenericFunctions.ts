/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

const BASE_URL = 'https://api.lucid.co';

/**
 * Makes an authenticated request to the Lucidchart API
 */
export async function lucidchartApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
	options: {
		returnFullResponse?: boolean;
		encoding?: 'arraybuffer' | null;
	} = {},
): Promise<IDataObject | IDataObject[] | Buffer> {
	const credentials = await this.getCredentials('lucidchartApi');

	const token = credentials.authenticationType === 'apiKey'
		? credentials.apiKey
		: credentials.accessToken;

	const requestOptions: IHttpRequestOptions = {
		method,
		url: `${BASE_URL}${endpoint}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Lucid-Api-Version': '1',
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		json: true,
	};

	if (body && Object.keys(body).length > 0) {
		requestOptions.body = body;
	}

	if (query && Object.keys(query).length > 0) {
		requestOptions.qs = query;
	}

	if (options.encoding !== undefined) {
		requestOptions.encoding = options.encoding === null ? undefined : options.encoding;
		requestOptions.json = false;
		if (requestOptions.headers) {
			delete requestOptions.headers.Accept;
		}
	}

	if (options.returnFullResponse) {
		requestOptions.returnFullResponse = true;
	}

	try {
		const response = await this.helpers.httpRequest(requestOptions);
		return response as IDataObject | IDataObject[] | Buffer;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: extractErrorMessage(error as JsonObject),
		});
	}
}

/**
 * Makes an authenticated request and handles pagination
 */
export async function lucidchartApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
	dataKey?: string,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let cursor: string | undefined;

	do {
		const qs: IDataObject = { ...query };
		if (cursor) {
			qs.cursor = cursor;
		}

		const response = await lucidchartApiRequest.call(
			this,
			method,
			endpoint,
			body,
			qs,
		) as IDataObject;

		let items: IDataObject[];
		if (dataKey && response[dataKey]) {
			items = response[dataKey] as IDataObject[];
		} else if (response.results) {
			items = response.results as IDataObject[];
		} else if (response.data) {
			items = response.data as IDataObject[];
		} else if (Array.isArray(response)) {
			items = response;
		} else {
			items = [];
		}

		returnData.push(...items);

		cursor = (response.nextCursor || response.cursor) as string | undefined;

	} while (cursor);

	return returnData;
}

/**
 * Extracts error message from API error response
 */
function extractErrorMessage(error: JsonObject): string {
	if (error.error && typeof error.error === 'object') {
		const errorObj = error.error as JsonObject;
		if (errorObj.message) {
			return `${errorObj.code || 'Error'}: ${errorObj.message}`;
		}
	}
	if (error.message) {
		return error.message as string;
	}
	return 'An unknown error occurred';
}

/**
 * Validates and formats document ID
 */
export function validateDocumentId(documentId: string): string {
	const trimmed = documentId.trim();
	if (!trimmed) {
		throw new Error('Document ID cannot be empty');
	}
	return trimmed;
}

/**
 * Validates and formats folder ID
 */
export function validateFolderId(folderId: string): string {
	const trimmed = folderId.trim();
	if (!trimmed) {
		throw new Error('Folder ID cannot be empty');
	}
	return trimmed;
}

/**
 * Validates and formats user ID
 */
export function validateUserId(userId: string): string {
	const trimmed = userId.trim();
	if (!trimmed) {
		throw new Error('User ID cannot be empty');
	}
	return trimmed;
}

/**
 * Validates and formats team ID
 */
export function validateTeamId(teamId: string): string {
	const trimmed = teamId.trim();
	if (!trimmed) {
		throw new Error('Team ID cannot be empty');
	}
	return trimmed;
}

/**
 * Formats role for API requests
 */
export function formatRole(role: string): string {
	const validRoles = ['view', 'edit', 'editshare'];
	const lowerRole = role.toLowerCase();
	if (!validRoles.includes(lowerRole)) {
		throw new Error(`Invalid role: ${role}. Must be one of: ${validRoles.join(', ')}`);
	}
	return lowerRole;
}

/**
 * Formats export format for API requests
 */
export function formatExportFormat(format: string): string {
	const validFormats = ['pdf', 'png', 'svg'];
	const lowerFormat = format.toLowerCase();
	if (!validFormats.includes(lowerFormat)) {
		throw new Error(`Invalid export format: ${format}. Must be one of: ${validFormats.join(', ')}`);
	}
	return lowerFormat;
}

/**
 * Formats product type for API requests
 */
export function formatProduct(product: string): string {
	const validProducts = ['lucidchart', 'lucidspark'];
	const lowerProduct = product.toLowerCase();
	if (!validProducts.includes(lowerProduct)) {
		throw new Error(`Invalid product: ${product}. Must be one of: ${validProducts.join(', ')}`);
	}
	return lowerProduct;
}

/**
 * Builds query parameters from additional fields
 */
export function buildQueryParams(additionalFields: IDataObject): IDataObject {
	const query: IDataObject = {};

	for (const [key, value] of Object.entries(additionalFields)) {
		if (value !== undefined && value !== null && value !== '') {
			query[key] = value;
		}
	}

	return query;
}

/**
 * Handles rate limiting with exponential backoff
 */
export async function handleRateLimit(
	fn: () => Promise<IDataObject>,
	maxRetries = 5,
	initialDelay = 1000,
	maxDelay = 120000,
): Promise<IDataObject> {
	let delay = initialDelay;
	let lastError: Error | undefined;

	for (let attempt = 0; attempt < maxRetries; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error as Error;
			const errorMessage = (error as Error).message || '';

			if (errorMessage.includes('429') || errorMessage.includes('RATE_LIMITED')) {
				await new Promise((resolve) => setTimeout(resolve, delay));
				delay = Math.min(delay * 2, maxDelay);
			} else {
				throw error;
			}
		}
	}

	throw lastError || new Error('Max retries exceeded');
}

/**
 * Logs licensing notice (once per node load)
 */
let licensingNoticeLogged = false;

export function logLicensingNotice(context: IExecuteFunctions): void {
	if (!licensingNoticeLogged) {
		context.logger.warn(
			'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
			'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
			'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.',
		);
		licensingNoticeLogged = true;
	}
}

/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';

export class LucidchartApi implements ICredentialType {
	name = 'lucidchartApi';
	displayName = 'Lucidchart API';
	documentationUrl = 'https://developer.lucid.co/rest-api/v1/';
	properties: INodeProperties[] = [
		{
			displayName: 'Authentication Type',
			name: 'authenticationType',
			type: 'options',
			options: [
				{
					name: 'API Key',
					value: 'apiKey',
				},
				{
					name: 'OAuth2',
					value: 'oAuth2',
				},
			],
			default: 'apiKey',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			displayOptions: {
				show: {
					authenticationType: ['apiKey'],
				},
			},
			required: true,
			description: 'The API key for Lucidchart API authentication',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					authenticationType: ['oAuth2'],
				},
			},
			required: true,
			description: 'OAuth2 Client ID from Lucid Developer Portal',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			displayOptions: {
				show: {
					authenticationType: ['oAuth2'],
				},
			},
			required: true,
			description: 'OAuth2 Client Secret from Lucid Developer Portal',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			displayOptions: {
				show: {
					authenticationType: ['oAuth2'],
				},
			},
			required: true,
			description: 'OAuth2 Access Token',
		},
		{
			displayName: 'Refresh Token',
			name: 'refreshToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			displayOptions: {
				show: {
					authenticationType: ['oAuth2'],
				},
			},
			description: 'OAuth2 Refresh Token for automatic token refresh',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Lucid-Api-Version': '1',
			},
		},
	};

	async preAuthentication(
		this: IHttpRequestHelper,
		credentials: ICredentialDataDecryptedObject,
	): Promise<ICredentialDataDecryptedObject> {
		const token = credentials.authenticationType === 'apiKey'
			? credentials.apiKey
			: credentials.accessToken;
		
		return {
			headers: {
				Authorization: `Bearer ${token}`,
				'Lucid-Api-Version': '1',
			},
		};
	}

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.lucid.co',
			url: '/users/me',
			method: 'GET',
			headers: {
				'Lucid-Api-Version': '1',
			},
		},
	};
}

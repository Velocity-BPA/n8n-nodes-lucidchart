/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const embeddingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['embedding'],
			},
		},
		options: [
			{
				name: 'Change Embed Version',
				value: 'changeEmbedVersion',
				description: 'Update embed to different version',
				action: 'Change embed version',
			},
			{
				name: 'Create',
				value: 'createEmbed',
				description: 'Create a new embed',
				action: 'Create an embed',
			},
			{
				name: 'Delete',
				value: 'deleteEmbed',
				description: 'Delete an embed',
				action: 'Delete an embed',
			},
			{
				name: 'Generate Session Token',
				value: 'generateEmbedSessionToken',
				description: 'Generate embed session token',
				action: 'Generate embed session token',
			},
			{
				name: 'Get',
				value: 'getEmbed',
				description: 'Get embed information',
				action: 'Get an embed',
			},
			{
				name: 'Get Document',
				value: 'getEmbedDocument',
				description: 'Get embedded document',
				action: 'Get embed document',
			},
			{
				name: 'Get Viewer',
				value: 'getEmbedViewer',
				description: 'Get embed viewer URL',
				action: 'Get embed viewer',
			},
		],
		default: 'getEmbed',
	},
];

export const embeddingFields: INodeProperties[] = [
	// ----------------------------------
	//         Common: Document ID (for most operations)
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['embedding'],
				operation: [
					'createEmbed',
					'getEmbedDocument',
				],
			},
		},
		description: 'ID of the document',
	},

	// ----------------------------------
	//         Common: Embed ID (for operations on existing embeds)
	// ----------------------------------
	{
		displayName: 'Embed ID',
		name: 'embedId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['embedding'],
				operation: [
					'getEmbed',
					'deleteEmbed',
					'changeEmbedVersion',
					'generateEmbedSessionToken',
					'getEmbedViewer',
				],
			},
		},
		description: 'ID of the embed',
	},

	// ----------------------------------
	//         createEmbed
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['embedding'],
				operation: ['createEmbed'],
			},
		},
		options: [
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 600,
				description: 'Height of the embed in pixels',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'Specific page to embed',
			},
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 800,
				description: 'Width of the embed in pixels',
			},
		],
	},

	// ----------------------------------
	//         changeEmbedVersion
	// ----------------------------------
	{
		displayName: 'Version ID',
		name: 'versionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['embedding'],
				operation: ['changeEmbedVersion'],
			},
		},
		description: 'ID of the version to update the embed to',
	},

	// ----------------------------------
	//         generateEmbedSessionToken
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['embedding'],
				operation: ['generateEmbedSessionToken'],
			},
		},
		options: [
			{
				displayName: 'Expiration (Seconds)',
				name: 'expirationSeconds',
				type: 'number',
				default: 3600,
				description: 'Token expiration time in seconds',
			},
		],
	},

	// ----------------------------------
	//         getEmbedViewer
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['embedding'],
				operation: ['getEmbedViewer'],
			},
		},
		options: [
			{
				displayName: 'Include Controls',
				name: 'includeControls',
				type: 'boolean',
				default: true,
				description: 'Whether to include viewer controls',
			},
		],
	},
];

/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Copy',
				value: 'copy',
				description: 'Duplicate an existing document',
				action: 'Copy a document',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new document',
				action: 'Create a document',
			},
			{
				name: 'Export',
				value: 'export',
				description: 'Export document as PDF/PNG/SVG',
				action: 'Export a document',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get document metadata',
				action: 'Get a document',
			},
			{
				name: 'Get Contents',
				value: 'getContents',
				description: 'Get document contents as JSON',
				action: 'Get document contents',
			},
			{
				name: 'Import',
				value: 'import',
				description: 'Import document from .lucid file',
				action: 'Import a document',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for documents',
				action: 'Search documents',
			},
			{
				name: 'Trash',
				value: 'trash',
				description: 'Move document to trash',
				action: 'Trash a document',
			},
		],
		default: 'get',
	},
];

export const documentFields: INodeProperties[] = [
	// ----------------------------------
	//         document: create
	// ----------------------------------
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create'],
			},
		},
		description: 'Title of the new document',
	},
	{
		displayName: 'Product',
		name: 'product',
		type: 'options',
		required: true,
		options: [
			{
				name: 'Lucidchart',
				value: 'lucidchart',
			},
			{
				name: 'Lucidspark',
				value: 'lucidspark',
			},
		],
		default: 'lucidchart',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create'],
			},
		},
		description: 'Lucid product type for the document',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'ID of the folder to create the document in',
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				description: 'ID of the template to create the document from',
			},
		],
	},

	// ----------------------------------
	//         document: copy
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['copy'],
			},
		},
		description: 'ID of the document to copy',
	},
	{
		displayName: 'New Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['copy'],
			},
		},
		description: 'Title for the copied document',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['copy'],
			},
		},
		options: [
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'ID of the folder to copy the document to',
			},
			{
				displayName: 'Product',
				name: 'product',
				type: 'options',
				options: [
					{
						name: 'Lucidchart',
						value: 'lucidchart',
					},
					{
						name: 'Lucidspark',
						value: 'lucidspark',
					},
				],
				default: 'lucidchart',
				description: 'Product type for the copied document',
			},
		],
	},

	// ----------------------------------
	//         document: import
	// ----------------------------------
	{
		displayName: 'Input Binary Field',
		name: 'binaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['import'],
			},
		},
		description: 'Name of the binary property containing the .lucid file to import',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['import'],
			},
		},
		description: 'Title for the imported document',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['import'],
			},
		},
		options: [
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'ID of the folder to import the document to',
			},
		],
	},

	// ----------------------------------
	//         document: get
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		description: 'ID of the document to retrieve',
	},

	// ----------------------------------
	//         document: export
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['export'],
			},
		},
		description: 'ID of the document to export',
	},
	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		required: true,
		options: [
			{
				name: 'PDF',
				value: 'pdf',
			},
			{
				name: 'PNG',
				value: 'png',
			},
			{
				name: 'SVG',
				value: 'svg',
			},
		],
		default: 'pdf',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['export'],
			},
		},
		description: 'Export format for the document',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['export'],
			},
		},
		description: 'Name of the binary property to store the exported file',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['export'],
			},
		},
		options: [
			{
				displayName: 'Crop',
				name: 'crop',
				type: 'boolean',
				default: false,
				description: 'Whether to crop the export to content',
			},
			{
				displayName: 'Page Index',
				name: 'pageIndex',
				type: 'number',
				default: 0,
				description: 'Index of the page to export (0-based)',
			},
			{
				displayName: 'Scale',
				name: 'scale',
				type: 'number',
				default: 1,
				description: 'Scale factor for the export',
			},
		],
	},

	// ----------------------------------
	//         document: getContents
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['getContents'],
			},
		},
		description: 'ID of the document to get contents from',
	},

	// ----------------------------------
	//         document: trash
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['trash'],
			},
		},
		description: 'ID of the document to move to trash',
	},

	// ----------------------------------
	//         document: search
	// ----------------------------------
	{
		displayName: 'Search Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['search'],
			},
		},
		description: 'Search query to find documents',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['search'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['search'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Product',
				name: 'product',
				type: 'options',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Lucidchart',
						value: 'lucidchart',
					},
					{
						name: 'Lucidspark',
						value: 'lucidspark',
					},
				],
				default: '',
				description: 'Filter by product type',
			},
		],
	},
];

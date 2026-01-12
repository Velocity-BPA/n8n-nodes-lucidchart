/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const folderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['folder'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new folder',
				action: 'Create a folder',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get folder metadata',
				action: 'Get a folder',
			},
			{
				name: 'List Contents',
				value: 'listContents',
				description: 'List folder contents',
				action: 'List folder contents',
			},
			{
				name: 'List Root',
				value: 'listRoot',
				description: 'List root folder contents',
				action: 'List root folder contents',
			},
			{
				name: 'Restore',
				value: 'restore',
				description: 'Restore folder from trash',
				action: 'Restore a folder',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for folders',
				action: 'Search folders',
			},
			{
				name: 'Trash',
				value: 'trash',
				description: 'Move folder to trash',
				action: 'Trash a folder',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update folder name',
				action: 'Update a folder',
			},
		],
		default: 'get',
	},
];

export const folderFields: INodeProperties[] = [
	// ----------------------------------
	//         folder: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['create'],
			},
		},
		description: 'Name of the new folder',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Parent Folder ID',
				name: 'parentFolderId',
				type: 'string',
				default: '',
				description: 'ID of the parent folder (leave empty for root)',
			},
		],
	},

	// ----------------------------------
	//         folder: get
	// ----------------------------------
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['get'],
			},
		},
		description: 'ID of the folder to retrieve',
	},

	// ----------------------------------
	//         folder: update
	// ----------------------------------
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['update'],
			},
		},
		description: 'ID of the folder to update',
	},
	{
		displayName: 'New Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['update'],
			},
		},
		description: 'New name for the folder',
	},

	// ----------------------------------
	//         folder: trash
	// ----------------------------------
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['trash'],
			},
		},
		description: 'ID of the folder to move to trash',
	},

	// ----------------------------------
	//         folder: restore
	// ----------------------------------
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['restore'],
			},
		},
		description: 'ID of the folder to restore from trash',
	},

	// ----------------------------------
	//         folder: listContents
	// ----------------------------------
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['listContents'],
			},
		},
		description: 'ID of the folder to list contents from',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['listContents'],
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
				resource: ['folder'],
				operation: ['listContents'],
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
				resource: ['folder'],
				operation: ['listContents'],
			},
		},
		options: [
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'Filter expression for contents',
			},
		],
	},

	// ----------------------------------
	//         folder: listRoot
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['listRoot'],
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
				resource: ['folder'],
				operation: ['listRoot'],
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
				resource: ['folder'],
				operation: ['listRoot'],
			},
		},
		options: [
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'Filter expression for contents',
			},
		],
	},

	// ----------------------------------
	//         folder: search
	// ----------------------------------
	{
		displayName: 'Search Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folder'],
				operation: ['search'],
			},
		},
		description: 'Search query to find folders',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['folder'],
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
				resource: ['folder'],
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
];

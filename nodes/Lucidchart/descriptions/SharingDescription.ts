/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const sharingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sharing'],
			},
		},
		options: [
			{
				name: 'Accept Share Link',
				value: 'acceptShareLink',
				description: 'Accept a share link invitation',
				action: 'Accept a share link',
			},
			{
				name: 'Create Document Share Link',
				value: 'createDocumentShareLink',
				description: 'Create a share link for a document',
				action: 'Create document share link',
			},
			{
				name: 'Create Folder Share Link',
				value: 'createFolderShareLink',
				description: 'Create a share link for a folder',
				action: 'Create folder share link',
			},
			{
				name: 'Delete Document Share Link',
				value: 'deleteDocumentShareLink',
				description: 'Revoke a document share link',
				action: 'Delete document share link',
			},
			{
				name: 'Delete Folder Share Link',
				value: 'deleteFolderShareLink',
				description: 'Revoke a folder share link',
				action: 'Delete folder share link',
			},
			{
				name: 'Get Document Share Link',
				value: 'getDocumentShareLink',
				description: 'Get document share link info',
				action: 'Get document share link',
			},
			{
				name: 'Get Folder Share Link',
				value: 'getFolderShareLink',
				description: 'Get folder share link info',
				action: 'Get folder share link',
			},
			{
				name: 'Update Document Share Link',
				value: 'updateDocumentShareLink',
				description: 'Update document share link settings',
				action: 'Update document share link',
			},
			{
				name: 'Update Folder Share Link',
				value: 'updateFolderShareLink',
				description: 'Update folder share link settings',
				action: 'Update folder share link',
			},
		],
		default: 'getDocumentShareLink',
	},
];

export const sharingFields: INodeProperties[] = [
	// ----------------------------------
	//         Document Share Link Operations
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['sharing'],
				operation: [
					'getDocumentShareLink',
					'createDocumentShareLink',
					'updateDocumentShareLink',
					'deleteDocumentShareLink',
				],
			},
		},
		description: 'ID of the document',
	},

	// ----------------------------------
	//         createDocumentShareLink
	// ----------------------------------
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		required: true,
		options: [
			{
				name: 'View',
				value: 'view',
			},
			{
				name: 'Edit',
				value: 'edit',
			},
			{
				name: 'Edit & Share',
				value: 'editshare',
			},
		],
		default: 'view',
		displayOptions: {
			show: {
				resource: ['sharing'],
				operation: ['createDocumentShareLink'],
			},
		},
		description: 'Permission level for the share link',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['sharing'],
				operation: ['createDocumentShareLink'],
			},
		},
		options: [
			{
				displayName: 'Expiration',
				name: 'expiration',
				type: 'dateTime',
				default: '',
				description: 'Expiration date for the share link',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Password to protect the share link',
			},
		],
	},

	// ----------------------------------
	//         updateDocumentShareLink
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['sharing'],
				operation: ['updateDocumentShareLink'],
			},
		},
		options: [
			{
				displayName: 'Expiration',
				name: 'expiration',
				type: 'dateTime',
				default: '',
				description: 'New expiration date for the share link',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'New password for the share link',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
				options: [
					{
						name: 'View',
						value: 'view',
					},
					{
						name: 'Edit',
						value: 'edit',
					},
					{
						name: 'Edit & Share',
						value: 'editshare',
					},
				],
				default: 'view',
				description: 'New permission level for the share link',
			},
		],
	},

	// ----------------------------------
	//         Folder Share Link Operations
	// ----------------------------------
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['sharing'],
				operation: [
					'getFolderShareLink',
					'createFolderShareLink',
					'updateFolderShareLink',
					'deleteFolderShareLink',
				],
			},
		},
		description: 'ID of the folder',
	},

	// ----------------------------------
	//         createFolderShareLink
	// ----------------------------------
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		required: true,
		options: [
			{
				name: 'View',
				value: 'view',
			},
			{
				name: 'Edit',
				value: 'edit',
			},
			{
				name: 'Edit & Share',
				value: 'editshare',
			},
		],
		default: 'view',
		displayOptions: {
			show: {
				resource: ['sharing'],
				operation: ['createFolderShareLink'],
			},
		},
		description: 'Permission level for the share link',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['sharing'],
				operation: ['createFolderShareLink'],
			},
		},
		options: [
			{
				displayName: 'Expiration',
				name: 'expiration',
				type: 'dateTime',
				default: '',
				description: 'Expiration date for the share link',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Password to protect the share link',
			},
		],
	},

	// ----------------------------------
	//         updateFolderShareLink
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['sharing'],
				operation: ['updateFolderShareLink'],
			},
		},
		options: [
			{
				displayName: 'Expiration',
				name: 'expiration',
				type: 'dateTime',
				default: '',
				description: 'New expiration date for the share link',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'New password for the share link',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
				options: [
					{
						name: 'View',
						value: 'view',
					},
					{
						name: 'Edit',
						value: 'edit',
					},
					{
						name: 'Edit & Share',
						value: 'editshare',
					},
				],
				default: 'view',
				description: 'New permission level for the share link',
			},
		],
	},

	// ----------------------------------
	//         acceptShareLink
	// ----------------------------------
	{
		displayName: 'Share Link',
		name: 'shareLink',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['sharing'],
				operation: ['acceptShareLink'],
			},
		},
		description: 'The share link URL to accept',
	},
];

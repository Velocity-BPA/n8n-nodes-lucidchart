/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const auditLogOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['auditLog'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get audit logs',
				action: 'Get audit logs',
			},
			{
				name: 'Query',
				value: 'query',
				description: 'Query audit logs with filters',
				action: 'Query audit logs',
			},
		],
		default: 'get',
	},
];

export const auditLogFields: INodeProperties[] = [
	// ----------------------------------
	//         auditLog: get
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['auditLog'],
				operation: ['get'],
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
				resource: ['auditLog'],
				operation: ['get'],
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
				resource: ['auditLog'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'End of date range',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Start of date range',
			},
		],
	},

	// ----------------------------------
	//         auditLog: query
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['auditLog'],
				operation: ['query'],
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
				resource: ['auditLog'],
				operation: ['query'],
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
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['auditLog'],
				operation: ['query'],
			},
		},
		options: [
			{
				displayName: 'Actor ID',
				name: 'actorId',
				type: 'string',
				default: '',
				description: 'Filter by actor (user who performed the action)',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'End of date range',
			},
			{
				displayName: 'Event Type',
				name: 'eventType',
				type: 'options',
				options: [
					{
						name: 'Administration',
						value: 'administration',
					},
					{
						name: 'Content',
						value: 'content',
					},
					{
						name: 'Login',
						value: 'login',
					},
					{
						name: 'Team',
						value: 'team',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: '',
				description: 'Filter by event type',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Start of date range',
			},
			{
				displayName: 'Target ID',
				name: 'targetId',
				type: 'string',
				default: '',
				description: 'Filter by target (object affected by the action)',
			},
		],
	},
];

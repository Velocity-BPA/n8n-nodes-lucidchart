/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const teamOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['team'],
			},
		},
		options: [
			{
				name: 'Add Users',
				value: 'addUsers',
				description: 'Add users to a team',
				action: 'Add users to a team',
			},
			{
				name: 'Archive',
				value: 'archive',
				description: 'Archive a team',
				action: 'Archive a team',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new team',
				action: 'Create a team',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get team by ID',
				action: 'Get a team',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many teams',
				action: 'Get many teams',
			},
			{
				name: 'List Users',
				value: 'listUsers',
				description: 'List team members',
				action: 'List team users',
			},
			{
				name: 'Remove Users',
				value: 'removeUsers',
				description: 'Remove users from a team',
				action: 'Remove users from a team',
			},
			{
				name: 'Restore',
				value: 'restore',
				description: 'Restore an archived team',
				action: 'Restore a team',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update team settings',
				action: 'Update a team',
			},
		],
		default: 'get',
	},
];

export const teamFields: INodeProperties[] = [
	// ----------------------------------
	//         team: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['create'],
			},
		},
		description: 'Name of the new team',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the team',
			},
		],
	},

	// ----------------------------------
	//         team: get
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['get'],
			},
		},
		description: 'ID of the team to retrieve',
	},

	// ----------------------------------
	//         team: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['getAll'],
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
				resource: ['team'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         team: update
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['update'],
			},
		},
		description: 'ID of the team to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New name for the team',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'New description for the team',
			},
		],
	},

	// ----------------------------------
	//         team: addUsers
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['addUsers'],
			},
		},
		description: 'ID of the team to add users to',
	},
	{
		displayName: 'User IDs',
		name: 'userIds',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['addUsers'],
			},
		},
		description: 'Comma-separated list of user IDs to add to the team',
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		options: [
			{
				name: 'Member',
				value: 'member',
			},
			{
				name: 'Admin',
				value: 'admin',
			},
		],
		default: 'member',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['addUsers'],
			},
		},
		description: 'Role for the users in the team',
	},

	// ----------------------------------
	//         team: removeUsers
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['removeUsers'],
			},
		},
		description: 'ID of the team to remove users from',
	},
	{
		displayName: 'User IDs',
		name: 'userIds',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['removeUsers'],
			},
		},
		description: 'Comma-separated list of user IDs to remove from the team',
	},

	// ----------------------------------
	//         team: listUsers
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['listUsers'],
			},
		},
		description: 'ID of the team to list users from',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['listUsers'],
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
				resource: ['team'],
				operation: ['listUsers'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         team: archive
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['archive'],
			},
		},
		description: 'ID of the team to archive',
	},

	// ----------------------------------
	//         team: restore
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['restore'],
			},
		},
		description: 'ID of the team to restore',
	},
];

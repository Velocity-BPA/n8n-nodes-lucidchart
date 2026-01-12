/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const documentCollaborationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['documentCollaboration'],
			},
		},
		options: [
			{
				name: 'Add Team Collaborator',
				value: 'addTeamCollaborator',
				description: 'Add team as document collaborator',
				action: 'Add team collaborator to document',
			},
			{
				name: 'Add User Collaborator',
				value: 'addUserCollaborator',
				description: 'Add user as document collaborator',
				action: 'Add user collaborator to document',
			},
			{
				name: 'Get Team Collaborator',
				value: 'getTeamCollaborator',
				description: 'Get team collaborator info',
				action: 'Get team collaborator from document',
			},
			{
				name: 'Get User Collaborators',
				value: 'getUserCollaborators',
				description: 'Get document user collaborators',
				action: 'Get user collaborators from document',
			},
			{
				name: 'Remove Team Collaborator',
				value: 'removeTeamCollaborator',
				description: 'Remove team from document',
				action: 'Remove team collaborator from document',
			},
			{
				name: 'Remove User Collaborator',
				value: 'removeUserCollaborator',
				description: 'Remove user from document',
				action: 'Remove user collaborator from document',
			},
			{
				name: 'Update User Collaborator',
				value: 'updateUserCollaborator',
				description: 'Update user permissions on document',
				action: 'Update user collaborator on document',
			},
		],
		default: 'getUserCollaborators',
	},
];

export const documentCollaborationFields: INodeProperties[] = [
	// ----------------------------------
	//         Common: Document ID
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['documentCollaboration'],
			},
		},
		description: 'ID of the document',
	},

	// ----------------------------------
	//         getUserCollaborators
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['documentCollaboration'],
				operation: ['getUserCollaborators'],
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
				resource: ['documentCollaboration'],
				operation: ['getUserCollaborators'],
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
	//         addUserCollaborator
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['documentCollaboration'],
				operation: ['addUserCollaborator'],
			},
		},
		description: 'ID of the user to add as collaborator',
	},
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
				resource: ['documentCollaboration'],
				operation: ['addUserCollaborator'],
			},
		},
		description: 'Permission role for the user',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['documentCollaboration'],
				operation: ['addUserCollaborator'],
			},
		},
		options: [
			{
				displayName: 'Notify',
				name: 'notify',
				type: 'boolean',
				default: true,
				description: 'Whether to send a notification to the user',
			},
		],
	},

	// ----------------------------------
	//         updateUserCollaborator
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['documentCollaboration'],
				operation: ['updateUserCollaborator'],
			},
		},
		description: 'ID of the user to update',
	},
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
				resource: ['documentCollaboration'],
				operation: ['updateUserCollaborator'],
			},
		},
		description: 'New permission role for the user',
	},

	// ----------------------------------
	//         removeUserCollaborator
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['documentCollaboration'],
				operation: ['removeUserCollaborator'],
			},
		},
		description: 'ID of the user to remove',
	},

	// ----------------------------------
	//         getTeamCollaborator
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['documentCollaboration'],
				operation: ['getTeamCollaborator'],
			},
		},
		description: 'ID of the team',
	},

	// ----------------------------------
	//         addTeamCollaborator
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['documentCollaboration'],
				operation: ['addTeamCollaborator'],
			},
		},
		description: 'ID of the team to add as collaborator',
	},
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
				resource: ['documentCollaboration'],
				operation: ['addTeamCollaborator'],
			},
		},
		description: 'Permission role for the team',
	},

	// ----------------------------------
	//         removeTeamCollaborator
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['documentCollaboration'],
				operation: ['removeTeamCollaborator'],
			},
		},
		description: 'ID of the team to remove',
	},
];

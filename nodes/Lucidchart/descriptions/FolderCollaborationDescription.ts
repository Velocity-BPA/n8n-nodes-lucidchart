/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const folderCollaborationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['folderCollaboration'],
			},
		},
		options: [
			{
				name: 'Add Group Collaborator',
				value: 'addGroupCollaborator',
				description: 'Add group as folder collaborator',
				action: 'Add group collaborator to folder',
			},
			{
				name: 'Add Team Collaborator',
				value: 'addTeamCollaborator',
				description: 'Add team as folder collaborator',
				action: 'Add team collaborator to folder',
			},
			{
				name: 'Add User Collaborator',
				value: 'addUserCollaborator',
				description: 'Add user as folder collaborator',
				action: 'Add user collaborator to folder',
			},
			{
				name: 'Get Group Collaborators',
				value: 'getGroupCollaborators',
				description: 'Get folder group collaborators',
				action: 'Get group collaborators from folder',
			},
			{
				name: 'Get Team Collaborator',
				value: 'getTeamCollaborator',
				description: 'Get team collaborator info',
				action: 'Get team collaborator from folder',
			},
			{
				name: 'Get User Collaborators',
				value: 'getUserCollaborators',
				description: 'Get folder user collaborators',
				action: 'Get user collaborators from folder',
			},
			{
				name: 'Remove Group Collaborator',
				value: 'removeGroupCollaborator',
				description: 'Remove group from folder',
				action: 'Remove group collaborator from folder',
			},
			{
				name: 'Remove Team Collaborator',
				value: 'removeTeamCollaborator',
				description: 'Remove team from folder',
				action: 'Remove team collaborator from folder',
			},
			{
				name: 'Remove User Collaborator',
				value: 'removeUserCollaborator',
				description: 'Remove user from folder',
				action: 'Remove user collaborator from folder',
			},
			{
				name: 'Update User Collaborator',
				value: 'updateUserCollaborator',
				description: 'Update user permissions on folder',
				action: 'Update user collaborator on folder',
			},
		],
		default: 'getUserCollaborators',
	},
];

export const folderCollaborationFields: INodeProperties[] = [
	// ----------------------------------
	//         Common: Folder ID
	// ----------------------------------
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folderCollaboration'],
			},
		},
		description: 'ID of the folder',
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
				resource: ['folderCollaboration'],
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
				resource: ['folderCollaboration'],
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
				resource: ['folderCollaboration'],
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
				resource: ['folderCollaboration'],
				operation: ['addUserCollaborator'],
			},
		},
		description: 'Permission role for the user',
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
				resource: ['folderCollaboration'],
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
				resource: ['folderCollaboration'],
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
				resource: ['folderCollaboration'],
				operation: ['removeUserCollaborator'],
			},
		},
		description: 'ID of the user to remove',
	},

	// ----------------------------------
	//         getGroupCollaborators
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['folderCollaboration'],
				operation: ['getGroupCollaborators'],
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
				resource: ['folderCollaboration'],
				operation: ['getGroupCollaborators'],
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
	//         addGroupCollaborator
	// ----------------------------------
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folderCollaboration'],
				operation: ['addGroupCollaborator'],
			},
		},
		description: 'ID of the group to add as collaborator',
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
				resource: ['folderCollaboration'],
				operation: ['addGroupCollaborator'],
			},
		},
		description: 'Permission role for the group',
	},

	// ----------------------------------
	//         removeGroupCollaborator
	// ----------------------------------
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['folderCollaboration'],
				operation: ['removeGroupCollaborator'],
			},
		},
		description: 'ID of the group to remove',
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
				resource: ['folderCollaboration'],
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
				resource: ['folderCollaboration'],
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
				resource: ['folderCollaboration'],
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
				resource: ['folderCollaboration'],
				operation: ['removeTeamCollaborator'],
			},
		},
		description: 'ID of the team to remove',
	},
];

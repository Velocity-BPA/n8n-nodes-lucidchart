/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

import {
	lucidchartApiRequest,
	lucidchartApiRequestAllItems,
	validateDocumentId,
	validateFolderId,
	validateUserId,
	validateTeamId,
	buildQueryParams,
	logLicensingNotice,
} from './GenericFunctions';

import {
	documentOperations,
	documentFields,
	folderOperations,
	folderFields,
	userOperations,
	userFields,
	teamOperations,
	teamFields,
	documentCollaborationOperations,
	documentCollaborationFields,
	folderCollaborationOperations,
	folderCollaborationFields,
	sharingOperations,
	sharingFields,
	embeddingOperations,
	embeddingFields,
	auditLogOperations,
	auditLogFields,
	accountOperations,
	accountFields,
} from './descriptions';

export class Lucidchart implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Lucidchart',
		name: 'lucidchart',
		icon: 'file:lucidchart.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Lucidchart API for diagram and document management',
		defaults: {
			name: 'Lucidchart',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'lucidchartApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Audit Log',
						value: 'auditLog',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Document Collaboration',
						value: 'documentCollaboration',
					},
					{
						name: 'Embedding',
						value: 'embedding',
					},
					{
						name: 'Folder',
						value: 'folder',
					},
					{
						name: 'Folder Collaboration',
						value: 'folderCollaboration',
					},
					{
						name: 'Sharing',
						value: 'sharing',
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
				default: 'document',
			},
			...documentOperations,
			...documentFields,
			...folderOperations,
			...folderFields,
			...userOperations,
			...userFields,
			...teamOperations,
			...teamFields,
			...documentCollaborationOperations,
			...documentCollaborationFields,
			...folderCollaborationOperations,
			...folderCollaborationFields,
			...sharingOperations,
			...sharingFields,
			...embeddingOperations,
			...embeddingFields,
			...auditLogOperations,
			...auditLogFields,
			...accountOperations,
			...accountFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		logLicensingNotice(this);

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] | Buffer;

				// Document Resource
				if (resource === 'document') {
					responseData = await executeDocumentOperation.call(this, i, operation);
				}
				// Folder Resource
				else if (resource === 'folder') {
					responseData = await executeFolderOperation.call(this, i, operation);
				}
				// User Resource
				else if (resource === 'user') {
					responseData = await executeUserOperation.call(this, i, operation);
				}
				// Team Resource
				else if (resource === 'team') {
					responseData = await executeTeamOperation.call(this, i, operation);
				}
				// Document Collaboration Resource
				else if (resource === 'documentCollaboration') {
					responseData = await executeDocumentCollaborationOperation.call(this, i, operation);
				}
				// Folder Collaboration Resource
				else if (resource === 'folderCollaboration') {
					responseData = await executeFolderCollaborationOperation.call(this, i, operation);
				}
				// Sharing Resource
				else if (resource === 'sharing') {
					responseData = await executeSharingOperation.call(this, i, operation);
				}
				// Embedding Resource
				else if (resource === 'embedding') {
					responseData = await executeEmbeddingOperation.call(this, i, operation);
				}
				// Audit Log Resource
				else if (resource === 'auditLog') {
					responseData = await executeAuditLogOperation.call(this, i, operation);
				}
				// Account Resource
				else if (resource === 'account') {
					responseData = await executeAccountOperation.call(this, i, operation);
				}
				else {
					throw new Error(`Unknown resource: ${resource}`);
				}

				// Handle response
				if (Buffer.isBuffer(responseData)) {
					// Binary data (export operation)
					const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
					const format = this.getNodeParameter('format', i) as string;
					const documentId = this.getNodeParameter('documentId', i) as string;

					const mimeTypes: Record<string, string> = {
						pdf: 'application/pdf',
						png: 'image/png',
						svg: 'image/svg+xml',
					};

					const binaryData = await this.helpers.prepareBinaryData(
						responseData,
						`${documentId}.${format}`,
						mimeTypes[format],
					);

					returnData.push({
						json: { success: true },
						binary: { [binaryPropertyName]: binaryData },
					});
				} else if (Array.isArray(responseData)) {
					returnData.push(...responseData.map((item) => ({ json: item })));
				} else {
					returnData.push({ json: responseData as IDataObject });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

async function executeDocumentOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<IDataObject | IDataObject[] | Buffer> {
	if (operation === 'create') {
		const title = this.getNodeParameter('title', itemIndex) as string;
		const product = this.getNodeParameter('product', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = { title, product };
		if (additionalFields.folderId) body.folderId = additionalFields.folderId;
		if (additionalFields.templateId) body.templateId = additionalFields.templateId;

		return await lucidchartApiRequest.call(this, 'POST', '/documents', body) as IDataObject;
	}

	if (operation === 'copy') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		const title = this.getNodeParameter('title', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = { title };
		if (additionalFields.folderId) body.folderId = additionalFields.folderId;
		if (additionalFields.product) body.product = additionalFields.product;

		return await lucidchartApiRequest.call(this, 'POST', `/documents/${documentId}/copy`, body) as IDataObject;
	}

	if (operation === 'import') {
		const binaryPropertyName = this.getNodeParameter('binaryPropertyName', itemIndex) as string;
		const title = this.getNodeParameter('title', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const binaryData = this.helpers.assertBinaryData(itemIndex, binaryPropertyName);
		const buffer = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);

		const body: IDataObject = {
			title,
			fileContent: buffer.toString('base64'),
			fileName: binaryData.fileName || 'document.lucid',
		};
		if (additionalFields.folderId) body.folderId = additionalFields.folderId;

		return await lucidchartApiRequest.call(this, 'POST', '/documents/import', body) as IDataObject;
	}

	if (operation === 'get') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'GET', `/documents/${documentId}`) as IDataObject;
	}

	if (operation === 'export') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		const format = this.getNodeParameter('format', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const query: IDataObject = { format };
		if (additionalFields.pageIndex !== undefined) query.pageIndex = additionalFields.pageIndex;
		if (additionalFields.scale !== undefined) query.scale = additionalFields.scale;
		if (additionalFields.crop !== undefined) query.crop = additionalFields.crop;

		return await lucidchartApiRequest.call(
			this,
			'GET',
			`/documents/${documentId}/export`,
			undefined,
			query,
			{ encoding: null },
		) as Buffer;
	}

	if (operation === 'getContents') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'GET', `/documents/${documentId}/contents`) as IDataObject;
	}

	if (operation === 'trash') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'DELETE', `/documents/${documentId}`) as IDataObject;
	}

	if (operation === 'search') {
		const query = this.getNodeParameter('query', itemIndex) as string;
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const qs: IDataObject = { q: query };
		if (additionalFields.product) qs.product = additionalFields.product;

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', '/documents/search', undefined, qs);
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		qs.limit = limit;
		const response = await lucidchartApiRequest.call(this, 'GET', '/documents/search', undefined, qs) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	throw new Error(`Unknown document operation: ${operation}`);
}

async function executeFolderOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const name = this.getNodeParameter('name', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = { name };
		if (additionalFields.parentFolderId) body.parentId = additionalFields.parentFolderId;

		return await lucidchartApiRequest.call(this, 'POST', '/folders', body) as IDataObject;
	}

	if (operation === 'get') {
		const folderId = validateFolderId(this.getNodeParameter('folderId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'GET', `/folders/${folderId}`) as IDataObject;
	}

	if (operation === 'update') {
		const folderId = validateFolderId(this.getNodeParameter('folderId', itemIndex) as string);
		const name = this.getNodeParameter('name', itemIndex) as string;

		return await lucidchartApiRequest.call(this, 'PATCH', `/folders/${folderId}`, { name }) as IDataObject;
	}

	if (operation === 'trash') {
		const folderId = validateFolderId(this.getNodeParameter('folderId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'DELETE', `/folders/${folderId}`) as IDataObject;
	}

	if (operation === 'restore') {
		const folderId = validateFolderId(this.getNodeParameter('folderId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'POST', `/folders/${folderId}/restore`) as IDataObject;
	}

	if (operation === 'listContents') {
		const folderId = validateFolderId(this.getNodeParameter('folderId', itemIndex) as string);
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const qs = buildQueryParams(additionalFields);

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', `/folders/${folderId}/contents`, undefined, qs);
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		qs.limit = limit;
		const response = await lucidchartApiRequest.call(this, 'GET', `/folders/${folderId}/contents`, undefined, qs) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	if (operation === 'listRoot') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const qs = buildQueryParams(additionalFields);

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', '/folders/root/contents', undefined, qs);
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		qs.limit = limit;
		const response = await lucidchartApiRequest.call(this, 'GET', '/folders/root/contents', undefined, qs) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	if (operation === 'search') {
		const query = this.getNodeParameter('query', itemIndex) as string;
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		const qs: IDataObject = { q: query };

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', '/folders/search', undefined, qs);
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		qs.limit = limit;
		const response = await lucidchartApiRequest.call(this, 'GET', '/folders/search', undefined, qs) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	throw new Error(`Unknown folder operation: ${operation}`);
}

async function executeUserOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'get') {
		const userId = validateUserId(this.getNodeParameter('userId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'GET', `/users/${userId}`) as IDataObject;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', '/users');
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		const response = await lucidchartApiRequest.call(this, 'GET', '/users', undefined, { limit }) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	if (operation === 'create') {
		const email = this.getNodeParameter('email', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = { email };
		if (additionalFields.name) body.name = additionalFields.name;
		if (additionalFields.role) body.role = additionalFields.role;

		return await lucidchartApiRequest.call(this, 'POST', '/users', body) as IDataObject;
	}

	if (operation === 'searchByEmail') {
		const email = this.getNodeParameter('email', itemIndex) as string;
		return await lucidchartApiRequest.call(this, 'GET', '/users/search', undefined, { email }) as IDataObject;
	}

	if (operation === 'getProfile') {
		return await lucidchartApiRequest.call(this, 'GET', '/users/me') as IDataObject;
	}

	throw new Error(`Unknown user operation: ${operation}`);
}

async function executeTeamOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'create') {
		const name = this.getNodeParameter('name', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = { name };
		if (additionalFields.description) body.description = additionalFields.description;

		return await lucidchartApiRequest.call(this, 'POST', '/teams', body) as IDataObject;
	}

	if (operation === 'get') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'GET', `/teams/${teamId}`) as IDataObject;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', '/teams');
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		const response = await lucidchartApiRequest.call(this, 'GET', '/teams', undefined, { limit }) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	if (operation === 'update') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as IDataObject;

		return await lucidchartApiRequest.call(this, 'PATCH', `/teams/${teamId}`, updateFields) as IDataObject;
	}

	if (operation === 'addUsers') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		const userIds = (this.getNodeParameter('userIds', itemIndex) as string).split(',').map((id) => id.trim());
		const role = this.getNodeParameter('role', itemIndex) as string;

		const body: IDataObject = { userIds, role };
		return await lucidchartApiRequest.call(this, 'POST', `/teams/${teamId}/users`, body) as IDataObject;
	}

	if (operation === 'removeUsers') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		const userIds = (this.getNodeParameter('userIds', itemIndex) as string).split(',').map((id) => id.trim());

		const body: IDataObject = { userIds };
		return await lucidchartApiRequest.call(this, 'DELETE', `/teams/${teamId}/users`, body) as IDataObject;
	}

	if (operation === 'listUsers') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', `/teams/${teamId}/users`);
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		const response = await lucidchartApiRequest.call(this, 'GET', `/teams/${teamId}/users`, undefined, { limit }) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	if (operation === 'archive') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'POST', `/teams/${teamId}/archive`) as IDataObject;
	}

	if (operation === 'restore') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'POST', `/teams/${teamId}/restore`) as IDataObject;
	}

	throw new Error(`Unknown team operation: ${operation}`);
}

async function executeDocumentCollaborationOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);

	if (operation === 'getUserCollaborators') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', `/documents/${documentId}/collaborators/users`);
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		const response = await lucidchartApiRequest.call(this, 'GET', `/documents/${documentId}/collaborators/users`, undefined, { limit }) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	if (operation === 'addUserCollaborator') {
		const userId = validateUserId(this.getNodeParameter('userId', itemIndex) as string);
		const role = this.getNodeParameter('role', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = { userId, role };
		if (additionalFields.notify !== undefined) body.notify = additionalFields.notify;

		return await lucidchartApiRequest.call(this, 'POST', `/documents/${documentId}/collaborators/users`, body) as IDataObject;
	}

	if (operation === 'updateUserCollaborator') {
		const userId = validateUserId(this.getNodeParameter('userId', itemIndex) as string);
		const role = this.getNodeParameter('role', itemIndex) as string;

		return await lucidchartApiRequest.call(this, 'PATCH', `/documents/${documentId}/collaborators/users/${userId}`, { role }) as IDataObject;
	}

	if (operation === 'removeUserCollaborator') {
		const userId = validateUserId(this.getNodeParameter('userId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'DELETE', `/documents/${documentId}/collaborators/users/${userId}`) as IDataObject;
	}

	if (operation === 'getTeamCollaborator') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'GET', `/documents/${documentId}/collaborators/teams/${teamId}`) as IDataObject;
	}

	if (operation === 'addTeamCollaborator') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		const role = this.getNodeParameter('role', itemIndex) as string;

		return await lucidchartApiRequest.call(this, 'POST', `/documents/${documentId}/collaborators/teams`, { teamId, role }) as IDataObject;
	}

	if (operation === 'removeTeamCollaborator') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'DELETE', `/documents/${documentId}/collaborators/teams/${teamId}`) as IDataObject;
	}

	throw new Error(`Unknown document collaboration operation: ${operation}`);
}

async function executeFolderCollaborationOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<IDataObject | IDataObject[]> {
	const folderId = validateFolderId(this.getNodeParameter('folderId', itemIndex) as string);

	if (operation === 'getUserCollaborators') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', `/folders/${folderId}/collaborators/users`);
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		const response = await lucidchartApiRequest.call(this, 'GET', `/folders/${folderId}/collaborators/users`, undefined, { limit }) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	if (operation === 'addUserCollaborator') {
		const userId = validateUserId(this.getNodeParameter('userId', itemIndex) as string);
		const role = this.getNodeParameter('role', itemIndex) as string;

		return await lucidchartApiRequest.call(this, 'POST', `/folders/${folderId}/collaborators/users`, { userId, role }) as IDataObject;
	}

	if (operation === 'updateUserCollaborator') {
		const userId = validateUserId(this.getNodeParameter('userId', itemIndex) as string);
		const role = this.getNodeParameter('role', itemIndex) as string;

		return await lucidchartApiRequest.call(this, 'PATCH', `/folders/${folderId}/collaborators/users/${userId}`, { role }) as IDataObject;
	}

	if (operation === 'removeUserCollaborator') {
		const userId = validateUserId(this.getNodeParameter('userId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'DELETE', `/folders/${folderId}/collaborators/users/${userId}`) as IDataObject;
	}

	if (operation === 'getGroupCollaborators') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', `/folders/${folderId}/collaborators/groups`);
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		const response = await lucidchartApiRequest.call(this, 'GET', `/folders/${folderId}/collaborators/groups`, undefined, { limit }) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	if (operation === 'addGroupCollaborator') {
		const groupId = this.getNodeParameter('groupId', itemIndex) as string;
		const role = this.getNodeParameter('role', itemIndex) as string;

		return await lucidchartApiRequest.call(this, 'POST', `/folders/${folderId}/collaborators/groups`, { groupId, role }) as IDataObject;
	}

	if (operation === 'removeGroupCollaborator') {
		const groupId = this.getNodeParameter('groupId', itemIndex) as string;
		return await lucidchartApiRequest.call(this, 'DELETE', `/folders/${folderId}/collaborators/groups/${groupId}`) as IDataObject;
	}

	if (operation === 'getTeamCollaborator') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'GET', `/folders/${folderId}/collaborators/teams/${teamId}`) as IDataObject;
	}

	if (operation === 'addTeamCollaborator') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		const role = this.getNodeParameter('role', itemIndex) as string;

		return await lucidchartApiRequest.call(this, 'POST', `/folders/${folderId}/collaborators/teams`, { teamId, role }) as IDataObject;
	}

	if (operation === 'removeTeamCollaborator') {
		const teamId = validateTeamId(this.getNodeParameter('teamId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'DELETE', `/folders/${folderId}/collaborators/teams/${teamId}`) as IDataObject;
	}

	throw new Error(`Unknown folder collaboration operation: ${operation}`);
}

async function executeSharingOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<IDataObject> {
	// Document share link operations
	if (operation === 'getDocumentShareLink') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'GET', `/documents/${documentId}/shareLink`) as IDataObject;
	}

	if (operation === 'createDocumentShareLink') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		const role = this.getNodeParameter('role', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = { role };
		if (additionalFields.password) body.password = additionalFields.password;
		if (additionalFields.expiration) body.expirationDate = additionalFields.expiration;

		return await lucidchartApiRequest.call(this, 'POST', `/documents/${documentId}/shareLink`, body) as IDataObject;
	}

	if (operation === 'updateDocumentShareLink') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as IDataObject;

		const body: IDataObject = {};
		if (updateFields.role) body.role = updateFields.role;
		if (updateFields.password) body.password = updateFields.password;
		if (updateFields.expiration) body.expirationDate = updateFields.expiration;

		return await lucidchartApiRequest.call(this, 'PATCH', `/documents/${documentId}/shareLink`, body) as IDataObject;
	}

	if (operation === 'deleteDocumentShareLink') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'DELETE', `/documents/${documentId}/shareLink`) as IDataObject;
	}

	// Folder share link operations
	if (operation === 'getFolderShareLink') {
		const folderId = validateFolderId(this.getNodeParameter('folderId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'GET', `/folders/${folderId}/shareLink`) as IDataObject;
	}

	if (operation === 'createFolderShareLink') {
		const folderId = validateFolderId(this.getNodeParameter('folderId', itemIndex) as string);
		const role = this.getNodeParameter('role', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = { role };
		if (additionalFields.password) body.password = additionalFields.password;
		if (additionalFields.expiration) body.expirationDate = additionalFields.expiration;

		return await lucidchartApiRequest.call(this, 'POST', `/folders/${folderId}/shareLink`, body) as IDataObject;
	}

	if (operation === 'updateFolderShareLink') {
		const folderId = validateFolderId(this.getNodeParameter('folderId', itemIndex) as string);
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as IDataObject;

		const body: IDataObject = {};
		if (updateFields.role) body.role = updateFields.role;
		if (updateFields.password) body.password = updateFields.password;
		if (updateFields.expiration) body.expirationDate = updateFields.expiration;

		return await lucidchartApiRequest.call(this, 'PATCH', `/folders/${folderId}/shareLink`, body) as IDataObject;
	}

	if (operation === 'deleteFolderShareLink') {
		const folderId = validateFolderId(this.getNodeParameter('folderId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'DELETE', `/folders/${folderId}/shareLink`) as IDataObject;
	}

	if (operation === 'acceptShareLink') {
		const shareLink = this.getNodeParameter('shareLink', itemIndex) as string;
		return await lucidchartApiRequest.call(this, 'POST', '/shareLinks/accept', { shareLink }) as IDataObject;
	}

	throw new Error(`Unknown sharing operation: ${operation}`);
}

async function executeEmbeddingOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<IDataObject> {
	if (operation === 'getEmbed') {
		const embedId = this.getNodeParameter('embedId', itemIndex) as string;
		return await lucidchartApiRequest.call(this, 'GET', `/embeds/${embedId}`) as IDataObject;
	}

	if (operation === 'createEmbed') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = { documentId };
		if (additionalFields.width) body.width = additionalFields.width;
		if (additionalFields.height) body.height = additionalFields.height;
		if (additionalFields.pageId) body.pageId = additionalFields.pageId;

		return await lucidchartApiRequest.call(this, 'POST', '/embeds', body) as IDataObject;
	}

	if (operation === 'deleteEmbed') {
		const embedId = this.getNodeParameter('embedId', itemIndex) as string;
		return await lucidchartApiRequest.call(this, 'DELETE', `/embeds/${embedId}`) as IDataObject;
	}

	if (operation === 'getEmbedDocument') {
		const documentId = validateDocumentId(this.getNodeParameter('documentId', itemIndex) as string);
		return await lucidchartApiRequest.call(this, 'GET', `/documents/${documentId}/embed`) as IDataObject;
	}

	if (operation === 'changeEmbedVersion') {
		const embedId = this.getNodeParameter('embedId', itemIndex) as string;
		const versionId = this.getNodeParameter('versionId', itemIndex) as string;

		return await lucidchartApiRequest.call(this, 'PATCH', `/embeds/${embedId}`, { versionId }) as IDataObject;
	}

	if (operation === 'generateEmbedSessionToken') {
		const embedId = this.getNodeParameter('embedId', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = {};
		if (additionalFields.expirationSeconds) body.expirationSeconds = additionalFields.expirationSeconds;

		return await lucidchartApiRequest.call(this, 'POST', `/embeds/${embedId}/session`, body) as IDataObject;
	}

	if (operation === 'getEmbedViewer') {
		const embedId = this.getNodeParameter('embedId', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const qs: IDataObject = {};
		if (additionalFields.includeControls !== undefined) qs.includeControls = additionalFields.includeControls;

		return await lucidchartApiRequest.call(this, 'GET', `/embeds/${embedId}/viewer`, undefined, qs) as IDataObject;
	}

	throw new Error(`Unknown embedding operation: ${operation}`);
}

async function executeAuditLogOperation(
	this: IExecuteFunctions,
	itemIndex: number,
	operation: string,
): Promise<IDataObject[]> {
	if (operation === 'get') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const qs: IDataObject = {};
		if (additionalFields.startDate) qs.startDate = additionalFields.startDate;
		if (additionalFields.endDate) qs.endDate = additionalFields.endDate;

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', '/auditLogs', undefined, qs);
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		qs.limit = limit;
		const response = await lucidchartApiRequest.call(this, 'GET', '/auditLogs', undefined, qs) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	if (operation === 'query') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const filters = this.getNodeParameter('filters', itemIndex) as IDataObject;

		const qs: IDataObject = {};
		if (filters.startDate) qs.startDate = filters.startDate;
		if (filters.endDate) qs.endDate = filters.endDate;
		if (filters.eventType) qs.eventType = filters.eventType;
		if (filters.actorId) qs.actorId = filters.actorId;
		if (filters.targetId) qs.targetId = filters.targetId;

		if (returnAll) {
			return await lucidchartApiRequestAllItems.call(this, 'GET', '/auditLogs/query', undefined, qs);
		}

		const limit = this.getNodeParameter('limit', itemIndex) as number;
		qs.limit = limit;
		const response = await lucidchartApiRequest.call(this, 'GET', '/auditLogs/query', undefined, qs) as IDataObject;
		return (response.results || response.data || []) as IDataObject[];
	}

	throw new Error(`Unknown audit log operation: ${operation}`);
}

async function executeAccountOperation(
	this: IExecuteFunctions,
	_itemIndex: number,
	operation: string,
): Promise<IDataObject> {
	if (operation === 'getInfo') {
		return await lucidchartApiRequest.call(this, 'GET', '/account') as IDataObject;
	}

	throw new Error(`Unknown account operation: ${operation}`);
}

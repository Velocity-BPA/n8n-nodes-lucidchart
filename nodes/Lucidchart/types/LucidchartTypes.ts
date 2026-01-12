/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

export interface ILucidchartDocument {
	id: string;
	title: string;
	product: 'lucidchart' | 'lucidspark';
	editUrl: string;
	viewUrl: string;
	createdTime: string;
	lastModifiedTime: string;
	creator?: ILucidchartUser;
	folderId?: string;
}

export interface ILucidchartFolder {
	id: string;
	name: string;
	parentId?: string;
	createdTime: string;
	lastModifiedTime: string;
}

export interface ILucidchartUser {
	id: string;
	email: string;
	name?: string;
	role?: 'user' | 'admin';
	createdTime?: string;
}

export interface ILucidchartTeam {
	id: string;
	name: string;
	description?: string;
	createdTime: string;
	memberCount?: number;
	archived?: boolean;
}

export interface ILucidchartCollaborator {
	userId?: string;
	teamId?: string;
	groupId?: string;
	email?: string;
	role: 'view' | 'edit' | 'editshare';
}

export interface ILucidchartShareLink {
	id: string;
	url: string;
	role: 'view' | 'edit' | 'editshare';
	password?: string;
	expirationDate?: string;
	createdTime: string;
}

export interface ILucidchartEmbed {
	embedId: string;
	documentId: string;
	pageId?: string;
	width?: number;
	height?: number;
	viewerUrl?: string;
}

export interface ILucidchartAuditLogEntry {
	id: string;
	eventType: string;
	timestamp: string;
	actorId: string;
	targetId?: string;
	targetType?: string;
	details?: Record<string, unknown>;
}

export interface ILucidchartAccountInfo {
	id: string;
	name: string;
	type: string;
	userCount?: number;
	storageUsed?: number;
	storageLimit?: number;
}

export interface ILucidchartPaginatedResponse<T> {
	results?: T[];
	data?: T[];
	nextCursor?: string;
	cursor?: string;
	totalCount?: number;
}

export interface ILucidchartApiError {
	error: {
		code: string;
		message: string;
		details?: Record<string, unknown>;
	};
}

export type LucidchartResource =
	| 'document'
	| 'folder'
	| 'user'
	| 'team'
	| 'documentCollaboration'
	| 'folderCollaboration'
	| 'sharing'
	| 'embedding'
	| 'auditLog'
	| 'account';

export type DocumentOperation =
	| 'create'
	| 'copy'
	| 'import'
	| 'get'
	| 'export'
	| 'getContents'
	| 'trash'
	| 'search';

export type FolderOperation =
	| 'create'
	| 'get'
	| 'update'
	| 'trash'
	| 'restore'
	| 'listContents'
	| 'listRoot'
	| 'search';

export type UserOperation =
	| 'get'
	| 'getAll'
	| 'create'
	| 'searchByEmail'
	| 'getProfile';

export type TeamOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'addUsers'
	| 'removeUsers'
	| 'listUsers'
	| 'archive'
	| 'restore';

export type DocumentCollaborationOperation =
	| 'getUserCollaborators'
	| 'addUserCollaborator'
	| 'updateUserCollaborator'
	| 'removeUserCollaborator'
	| 'getTeamCollaborator'
	| 'addTeamCollaborator'
	| 'removeTeamCollaborator';

export type FolderCollaborationOperation =
	| 'getUserCollaborators'
	| 'addUserCollaborator'
	| 'updateUserCollaborator'
	| 'removeUserCollaborator'
	| 'getGroupCollaborators'
	| 'addGroupCollaborator'
	| 'removeGroupCollaborator'
	| 'getTeamCollaborator'
	| 'addTeamCollaborator'
	| 'removeTeamCollaborator';

export type SharingOperation =
	| 'getDocumentShareLink'
	| 'createDocumentShareLink'
	| 'updateDocumentShareLink'
	| 'deleteDocumentShareLink'
	| 'getFolderShareLink'
	| 'createFolderShareLink'
	| 'updateFolderShareLink'
	| 'deleteFolderShareLink'
	| 'acceptShareLink';

export type EmbeddingOperation =
	| 'getEmbed'
	| 'createEmbed'
	| 'deleteEmbed'
	| 'getEmbedDocument'
	| 'changeEmbedVersion'
	| 'generateEmbedSessionToken'
	| 'getEmbedViewer';

export type AuditLogOperation = 'get' | 'query';

export type AccountOperation = 'getInfo';

export interface ILucidchartRequestOptions {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	endpoint: string;
	body?: Record<string, unknown>;
	query?: Record<string, string | number | boolean | undefined>;
	returnFullResponse?: boolean;
	encoding?: BufferEncoding | null;
}

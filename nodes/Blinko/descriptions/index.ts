import { INodeProperties } from 'n8n-workflow';
import { notesOperations, notesFields } from './notes';
import { tagsOperations, tagsFields } from './tags';
import { attachmentOperations, attachmentFields } from './attachments';
import { commentOperations, commentFields } from './comments';

export const description: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Note',
				value: 'notes',
			},
			{
				name: 'Tag',
				value: 'tags',
			},
			{
				name: 'Comment',
				value: 'comments',
			},
			{
				name: 'Attachment',
				value: 'attachments',
			},
		],
		default: 'notes',
	},
	...notesOperations,
	...notesFields,
	...tagsOperations,
	...tagsFields,
	...commentOperations,
	...commentFields,
	...attachmentOperations,
	...attachmentFields,
];

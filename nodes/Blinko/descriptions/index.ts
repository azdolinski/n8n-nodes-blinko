import { INodeProperties } from 'n8n-workflow';

import { attachmentFields, attachmentOperations } from './attachments';
import { commentFields, commentOperations } from './comments';
import { notesFields, notesOperations } from './notes';
import { tagsFields, tagsOperations } from './tags';

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

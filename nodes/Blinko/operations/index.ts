import { listAttachments } from './attachments/listAttachments';
import { uploadFile } from './attachments/uploadFile';
import { listTags } from './tags/listTags';
import { listComments } from './comments/listComments';

export const operations = [
	listAttachments,
	uploadFile,
	listTags,
	listComments,
];

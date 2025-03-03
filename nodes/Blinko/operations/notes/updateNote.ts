import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow';

/**
 * Update a note in Blinko
 */
export async function updateNote(
	this: IExecuteFunctions,
	i: number,
	apiBaseUrl: string,
	requestOptions: IDataObject,
): Promise<IDataObject> {
	const noteId = this.getNodeParameter('noteId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

	// Build the update object with only the fields that are provided
	const updateData: IDataObject = {
		id: parseInt(noteId, 10),
	};

	if (updateFields.content !== undefined) {
		updateData.content = updateFields.content;
	}
	
	if (updateFields.type !== undefined) {
		updateData.type = updateFields.type;
	}
	
	if (updateFields.attachments !== undefined) {
		updateData.attachments = updateFields.attachments;
	}
	
	if (updateFields.isArchived !== undefined) {
		updateData.isArchived = updateFields.isArchived;
	}
	
	if (updateFields.isTop !== undefined) {
		updateData.isTop = updateFields.isTop;
	}
	
	if (updateFields.isShare !== undefined) {
		updateData.isShare = updateFields.isShare;
	}
	
	if (updateFields.isRecycle !== undefined) {
		updateData.isRecycle = updateFields.isRecycle;
	}
	
	if (updateFields.references !== undefined) {
		updateData.references = updateFields.references;
	}
	
	if (updateFields.tags !== undefined) {
		// Tagi są obsługiwane przez serwer poprzez analizę zawartości
		// Dodajemy je do treści notatki jako hashtagi
		const tags = (updateFields.tags as string).split(',');
		const hashTags = tags.map(tag => `#${tag.trim()}`).join(' ');
		
		if (updateData.content) {
			updateData.content += ' ' + hashTags;
		} else {
			updateData.content = hashTags;
		}
	}

	// Przygotuj pełne żądanie w formacie batch
	const batchData: IDataObject = {};
	
	// Utwórz strukturę zgodną z oczekiwanym formatem
	const requestItem: IDataObject = {
		json: updateData,
	};
	
	// Dodaj element do batcha
	batchData["0"] = requestItem;

	const response = await this.helpers.httpRequest({
		method: 'POST',
		baseURL: apiBaseUrl,
		url: '/api/trpc/notes.upsert?batch=1',
		body: batchData,
		...requestOptions,
	});

	return response[0].result.data;
}

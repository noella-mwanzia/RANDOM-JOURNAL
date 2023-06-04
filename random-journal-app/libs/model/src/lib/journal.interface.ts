import { IObject } from "./base/i-object.interface";

/** Interface for all journals */

export interface Journal extends IObject
{
	html: string;

	sharedWith?: string;
}

const functions = require("firebase-functions");
import * as moment from 'moment';
const admin = require("firebase-admin");

import { __DateFromStorage } from 'libs/features/src/lib/utilities/convert-date.function';

admin.initializeApp()
var db = admin.firestore()

exports.sendJournalsPubsub = functions.pubsub
																			.schedule('0 */12 * * *')
																			.onRun(async (context) => {

																					//STEP 1: Get all users
																					const usersSnapshot = await db.collection('users').get();

																					const allUsers = usersSnapshot.map((user) => {
																						const data = user.data();
																						return {...data, id:user.id}
																					})

																					//STEP 2: Get Journals to be shared
																					let journals = await getJournalsToShare(allUsers);

																					//STEP 3: Filter out users who did not journal in the past 24 hours
																					const journalCreatorIds = journals.map(journal => journal.createdBy);
																					let recentUsers = allUsers.filter(user => journalCreatorIds.find(user.id));

																					//STEP 4: Match a journal to a random recipient
																					let emailContents = [];

																					for(let journal in journals)
																					{
																						//Get a random index for the user array
																						const randomIndex = Math.random() * recentUsers.length | 0;

																						//Create new object with the recipient's email
																						emailContents.push({...(journal as any) , email: recentUsers[randomIndex].email});

																						//remove the recipient who has just been allocated a journal.
																						recentUsers.splice(randomIndex, 1);
																					}

																					//STEP 5: Send the emails
																					await Promise.all(emailContents.map(content => sendEmail(content)));

																					console.log('All mails successfully dispatched!');
																					
																					return null;
})

/** This function goes through the journals per user, retrieves the journals created in the last 24hrs */
async function getJournalsToShare(users)
{
	let recentJournals = [];

	await Promise.all(users.forEach(async (user) => {

		const allJournals = await db.collection(`journals/${user.id}/entries`).get();

		allJournals.forEach((journal) => {

			const journalSnapshot = journal.data();

			//Check date of the journal entry
			const isJournalValid = __DateFromStorage(journalSnapshot.createdOn).isAfter(moment().subtract(1, 'days'));

			if(isJournalValid)
			{
				//Append document Id to the journal body
				recentJournals.push({...journalSnapshot, id: journalSnapshot.id});
				return;
			}

			return;
		})

  }))

	return recentJournals;
}

/** Use firebase's mail extention to send
 *  emails due to time constraint */
async function sendEmail(journal)
{
	await db.collection('mail').add({
		to: journal.email,
		message: {
			subject: `Today's Random Journal`,
			html: journal.html,
		}
	})
}



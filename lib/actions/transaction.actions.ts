"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
	APPWRITE_DATABASE_ID: DATABASE_ID,
	APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export const createTransaction = async (
	transaction: CreateTransactionProps,
) => {
	try {
		//Access the database
		const { database } = await createAdminClient();

		// Create a new transaction in the database

		const newTansaction = await database.createDocument(
			DATABASE_ID!,
			TRANSACTION_COLLECTION_ID!,
			ID.unique(),
			{
				channel: "online",
				category: "Transfer",
				...transaction,
			},
		);
		return parseStringify(newTansaction);
	} catch (error) {
		console.log(error);
	}
};

export const getTransactionsByBankId = async ({
	bankId,
}: getTransactionsByBankIdProps) => {
	try {
		//Access the database
		const { database } = await createAdminClient();

		// Create a new transaction in the database

		const senderTransactions = await database.listDocuments(
			DATABASE_ID!,
			TRANSACTION_COLLECTION_ID!,
			// Form the Query wherewe compare the sender bank id equal to the bank id we want to query for
			[Query.equal("senderBankId", bankId)],
		);

		const receiverTransactions = await database.listDocuments(
			DATABASE_ID!,
			TRANSACTION_COLLECTION_ID!,
			// Form the Query wherewe compare the sender bank id equal to the bank id we want to query for
			[Query.equal("receiverBankId", bankId)],
		);

		const transactions = {
			total: senderTransactions.total + receiverTransactions.total,
			documents: [
				...senderTransactions.documents,
				...receiverTransactions.documents,
			],
		};

		return parseStringify(transactions);
	} catch (error) {
		console.log(error);
	}
};

import { neon } from '@neondatabase/serverless';
import { to } from 'await-to-js';

const NEON_URL = import.meta.env.VITE_NEON_URL;
const sql = neon(NEON_URL);

const toSql = async (query: string) => {
	const [error, data] = await to(sql(query));
	if (error) console.error('Neon Error:', error);
	return [error, data];
};

const getAllArtists = async () => {
	return toSql('SELECT * FROM artists');
};

const getArtist = async (uid: string) => {
	return toSql(`SELECT * FROM artists WHERE uid = '${uid}' LIMIT 1`);
};

const getArtistSpaces = async (uid: string) => {
	return toSql(`SELECT * FROM spaces WHERE artists CONTAINS ${uid}`);
};

const getArtistModels = async (uid: string) => {
	return toSql(`SELECT * FROM models WHERE artists CONTAINS ${uid}`);
};

const getAllSpaces = async () => {
	return toSql('SELECT * FROM spaces');
};

const getSpace = async (uid: string) => {
	return toSql(`SELECT * FROM spaces WHERE uid = '${uid}' LIMIT 1`);
};

const getAllModels = async () => {
	return toSql('SELECT * FROM models');
};

const getModel = async (uid: string) => {
	return toSql(`SELECT * FROM models WHERE uid = '${uid}' LIMIT 1`);
};

const searchModels = async (query: string) => {
	return toSql(`SELECT * FROM models WHERE name ILIKE ${query}`);
};

const getAllItems = async () => {
	return toSql('SELECT * FROM items');
};

const getSpaceItems = async (uid: string) => {
	return toSql(`SELECT * FROM items WHERE space = '${uid}'`);
};

const api = {
	getAllArtists,
	getArtist,
	getArtistSpaces,
	getArtistModels,
	getAllSpaces,
	getSpace,
	getSpaceItems,
	getAllModels,
	getModel,
	searchModels,
	getAllItems
};

export default api;

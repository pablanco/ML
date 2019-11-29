import process from 'process';

const DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default {
	DEV,
	API_URL: 'http://localhost:3000/api/'
};

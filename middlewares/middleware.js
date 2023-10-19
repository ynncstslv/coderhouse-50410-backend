import express from 'express';

const middleware = (app) => {
	app.use(express.json());
};

export default middleware;

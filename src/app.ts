import express from 'express';

import config from './config';
import endpoints from './endpoints';
import middlewares from './middlewares';

const app = express();

app.use(express.urlencoded({ extended: true, limit: config.server.bodySizeLimit }));
app.use(express.json({ limit: config.server.bodySizeLimit }));
app.use(middlewares.cors);
app.use(middlewares.statsCollector);
app.use(endpoints);
app.use(middlewares.errorHandler);

export default app;

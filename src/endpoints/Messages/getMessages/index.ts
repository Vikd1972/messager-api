import { createEndpoint } from '../../../services/endpoint';
import controller from './getMessages.controller';
import description from './getMessages.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
  ],
  method: 'get',
  isActive: true,
  path: '/',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'Messages',
    summary: 'Get a list of messages',
    description: 'Get a list of messages',
  },
}));

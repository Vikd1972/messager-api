import { createEndpoint } from '../../../services/endpoint';
import controller from './createMessage.controller';
import description from './createMessage.description';

export default createEndpoint(({ middlewares }) => ({
  controller,
  middlewares: [
    middlewares.createValidationMiddleware(description.validation),
  ],
  method: 'post',
  isActive: true,
  path: '/',
  basePath: null,
  useFolderNameInPath: false,
  description,
  swagger: {
    endpointGroup: 'Messages',
    summary: 'Add message',
    description: 'Adding a message.',
  },
}));

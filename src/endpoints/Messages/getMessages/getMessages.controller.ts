import HTTP_STATUS_CODES from 'http-status-codes';

import messages from '../../../services/messages/messages';
import { ControllerType } from './getMessages.description';

const getMessages: ControllerType = async (req, res) => {
  const listOfMessages = messages.getMessage()

  res.status(HTTP_STATUS_CODES.OK).json({messages: listOfMessages});
};

export default getMessages;

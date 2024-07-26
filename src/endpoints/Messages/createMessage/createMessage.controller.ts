import HTTP_STATUS_CODES from 'http-status-codes';

import messages from '../../../services/messages/messages';
import { ControllerType } from './createMessage.description';

const createMessage: ControllerType = (req, res) => {
  const data = req.body;
  
  messages.setMessage(data);

  res.status(HTTP_STATUS_CODES.CREATED).json('Message saved');
};

export default createMessage;

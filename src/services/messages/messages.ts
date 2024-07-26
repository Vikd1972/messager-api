import config from '../../config'

export interface IMessage { 
  message?: string
}

const messages: string[] = [];

const setMessage = (data: IMessage) => {
  if (messages.length >= config.maxMessages) {
    messages.shift()
  }
  messages.push(data.message)
};

const getMessage = () => {
  return messages
};

export default {
  setMessage,
  getMessage
};

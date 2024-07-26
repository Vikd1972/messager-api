/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

import { EndpointDataBuilder } from '../../../services/endpoint';

const dataBuilder = new EndpointDataBuilder();

class RequestBody {
  //
}

class RequestQuery {
  //
}

class RequestParams {
  //
}

type ResponseData = {
  messages?: string[];
};

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([{
  statusCode: HTTP_STATUS_CODES.OK,
  description: 'Success',
  schema: {
    example: {
      message: 'Success',
    },
  },
}]);

export default dataBuilder.getDescription();

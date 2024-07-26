/* eslint-disable max-classes-per-file */
import { RequestHandler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';
import * as yup from 'yup';

import { EndpointDataBuilder } from '../../../services/endpoint';

const dataBuilder = new EndpointDataBuilder();

export class RequestBody {
  @dataBuilder.bodyField({
    validation: yup.string().strict().nullable(),
    swagger: {
      isRequired: true,
      type: 'string',
      example: 'text a message',
      nullable: true,
    },
  })
  message?: string;
}

class RequestQuery {
  //
}

class RequestParams {
  //
}

type ResponseData = string;

export type ControllerType = RequestHandler<RequestParams, ResponseData, RequestBody, RequestQuery>

dataBuilder.setSwaggerResponses([{
  statusCode: HTTP_STATUS_CODES.CREATED,
  description: 'Success',
  schema: {
    example: {
      message: 'Success',
    },
  },
}]);

export default dataBuilder.getDescription();

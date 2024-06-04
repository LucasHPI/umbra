data "aws_lambda_function" "existing" {
  function_name = "parallax-umbra-query-patient-info-${var.environment_name}"
}

resource "aws_lambda_permission" "queryPatientInfoPermission" {
  statement_id = "AllowExecutionFromAPIGatewayAuthorizer"
  action = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.existing.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.patientInfoGateway.execution_arn}/*/*/*"
  qualifier = data.aws_lambda_function.existing.version
}

resource "aws_apigatewayv2_integration" "queryPatientInfoIntegration" {
  api_id = aws_apigatewayv2_api.patientInfoGateway.id
  integration_type = "AWS_PROXY"
  passthrough_behavior = "WHEN_NO_MATCH"
  description = "Getting patient info"
  integration_method = "POST"
  integration_uri = data.aws_lambda_function.existing.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "queryPatientInfo" {
  api_id = aws_apigatewayv2_api.patientInfoGateway.id
  route_key = "POST /querypatientinfo"
  target = "integrations/${aws_apigatewayv2_integration.queryPatientInfoIntegration.id}"

/*   authorizer_id = aws_apigatewayv2_authorizer.patientInfoAuthorizer.id
  authorization_type = "JWT" */
}

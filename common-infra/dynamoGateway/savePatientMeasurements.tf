data "aws_lambda_function" "existingSaveMeasurements" {
  function_name = "parallax-umbra-save-measurements-${var.environment_name}"
}

resource "aws_lambda_permission" "saveMeasurementsPermission" {
  statement_id = "AllowExecutionFromAPIGatewayAuthorizer"
  action = "lambda:InvokeFunction"
  function_name = data.aws_lambda_function.existingSaveMeasurements.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.patientInfoGateway.execution_arn}/*/*/*"
  qualifier = data.aws_lambda_function.existingSaveMeasurements.version
}

resource "aws_apigatewayv2_integration" "saveMeasurementsIntegration" {
  api_id = aws_apigatewayv2_api.patientInfoGateway.id
  integration_type = "AWS_PROXY"
  passthrough_behavior = "WHEN_NO_MATCH"
  description = "Getting patient info"
  integration_method = "POST"
  integration_uri = data.aws_lambda_function.existingSaveMeasurements.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "saveMeasurements" {
  api_id = aws_apigatewayv2_api.patientInfoGateway.id
  route_key = "POST /savemeasurements"
  target = "integrations/${aws_apigatewayv2_integration.saveMeasurementsIntegration.id}"

/*   authorizer_id = aws_apigatewayv2_authorizer.patientInfoAuthorizer.id
  authorization_type = "JWT" */
}

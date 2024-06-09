resource "aws_lambda_alias" "savePatientInfoAlias" {
  name = "parallax-umbra-save-measurements-alias-${var.environment_name}"
  description = "Alias for querying patient info"
  function_name = "parallax-umbra-save-measurements-${var.environment_name}"
  function_version = "$LATEST"
}

resource "aws_lambda_permission" "saveMeasurementsPermission" {
  statement_id = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_alias.savePatientInfoAlias.function_name}:${aws_lambda_alias.savePatientInfoAlias.name}"
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.patientInfoGateway.execution_arn}/*/*/*"
  qualifier = aws_lambda_alias.savePatientInfoAlias.name
}

resource "aws_apigatewayv2_integration" "saveMeasurementsIntegration" {
  api_id = aws_apigatewayv2_api.patientInfoGateway.id
  integration_type = "AWS_PROXY"
  passthrough_behavior = "WHEN_NO_MATCH"
  description = "Getting patient info"
  integration_method = "POST"
  integration_uri = aws_lambda_alias.savePatientInfoAlias.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "saveMeasurements" {
  api_id = aws_apigatewayv2_api.patientInfoGateway.id
  route_key = "GET /savemeasurements"
  target = "integrations/${aws_apigatewayv2_integration.saveMeasurementsIntegration.id}"

/*   authorizer_id = aws_apigatewayv2_authorizer.patientInfoAuthorizer.id
  authorization_type = "JWT" */
}

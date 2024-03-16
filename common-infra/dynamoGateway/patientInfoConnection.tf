
data "aws_lambda_function" "existing" {
  function_name = "parallax-umbra-query-patient-info-${var.environment_name}"
}

resource "aws_lambda_alias" "queryPatientInfoAlias" {
  name = "${var.prefix}-query-patient-info"
  description = "Alias to the query-patient-info"
  function_name = data.aws_lambda_function.existing.function_name
  function_version = "$LATEST"
}

resource "aws_lambda_permission" "queryPatientInfoPermission" {
  statement_id = "AllowExecutionFromAPIGatewayAuthorizer"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_alias.queryPatientInfoAlias.function_name}:${aws_lambda_alias.queryPatientInfoAlias.name}"
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.patientInfoGateway.execution_arn}/*/*/*"
}

resource "aws_apigatewayv2_authorizer" "patientInfoAuthorizer" {
  name = "umbra-patient-info-authorizer"
  api_id = aws_apigatewayv2_api.patientInfoGateway.id
  authorizer_type = "JWT"
  jwt_configuration {
    issuer = "https://cognito-idp.${var.region}.amazonaws.com/${aws_cognito_user_pool.umbraUserPool.id}"
    audience = [aws_cognito_user_pool_client.umbraUserPoolClient.id]
  }
}

resource "aws_apigatewayv2_integration" "queryPatientInfoIntegration" {
  api_id = aws_apigatewayv2_api.patientInfoGateway.id
  integration_type = "AWS_PROXY"
  passthrough_behavior = "WHEN_NO_MATCH"
  description = ""
  integration_method = "POST"
  integration_uri = aws_lambda_alias.queryPatientInfoAlias.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "queryPatientInfo" {
  api_id = aws_apigatewayv2_api.patientInfoGateway.id
  route_key = "POST /querypatientinfo"
  target = "integrations/${aws_apigatewayv2_integration.queryPatientInfoIntegration.id}"

  authorizer_id = aws_apigatewayv2_authorizer.patientInfoAuthorizer.id
  authorization_type = "JWT"
}

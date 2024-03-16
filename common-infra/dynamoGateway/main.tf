provider "aws" {
  region = "us-east-1"
}

resource "aws_cognito_user_pool" "umbraUserPool" {
  name = "umbra-user-pool"
}

resource "aws_cognito_user_pool_client" "umbraUserPoolClient" {
  name                   = "umbra-client"
  user_pool_id           = aws_cognito_user_pool.umbraUserPool.id
  generate_secret        = true
  explicit_auth_flows    = ["USER_PASSWORD_AUTH"]
  allowed_oauth_flows    = ["implicit"]
  allowed_oauth_scopes   = ["openid"]
  callback_urls = [ aws_apigatewayv2_api.patientInfoGateway.api_endpoint ]
}

resource "aws_apigatewayv2_api" "patientInfoGateway" {
  name = "${var.prefix}-${var.gateway_name}-${var.environment_name}"
  description = "API Gateway for umbra-${var.environment_name}"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [ "*" ]
    allow_headers = [ "*" ]
    allow_methods = [ "*" ]
  }
}

resource "aws_apigatewayv2_stage" "patientInfoStage" {
  api_id = aws_apigatewayv2_api.patientInfoGateway.id
  name = "umbra-${var.environment_name}"
  auto_deploy = true

  lifecycle {
    create_before_destroy = true
  }
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

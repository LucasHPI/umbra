provider "aws" {
  region = "us-east-1"
  
  default_tags {
    tags = {
      Environment = var.environment_name
      project = "umbra"
    }
  }
}

resource "aws_lambda_function" "queryPatientInformation" {
  function_name = "${var.prefix}-${var.lambda_name}-${var.environment_name}"
  handler = "index.handler"
  runtime = "nodejs18.x"
  role = var.execution_role
  timeout = 60
  filename = "queryPatientInformation-${var.lambdas_version}.zip"

  environment {
    variables = {
      environment = var.environment_name
      document_bucket = var.document_bucket_name
    }
  }
}

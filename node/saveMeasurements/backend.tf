terraform {
  backend "s3" {
    key = "parallax-umbra-save-measurements-lambda.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}
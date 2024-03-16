terraform {
  backend "s3" {
    key = "parallax-umbra-read-patient-info-lambda.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}
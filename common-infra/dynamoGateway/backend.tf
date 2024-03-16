terraform {
  backend "s3" {
    key = "parallax-umbra-main-api-gateway.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}
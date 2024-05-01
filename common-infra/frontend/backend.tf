terraform {
  backend "s3" {
    key = "parallax-umbra-frontend.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}
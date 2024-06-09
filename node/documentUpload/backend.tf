terraform {
  backend "s3" {
    key = "parallax-umbra-upload-document.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}
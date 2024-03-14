terraform {
  backend "s3" {
    key = "parallax-umbra-main-dynamo-db.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}
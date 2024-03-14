terraform {
  backend "s3" {
    key = "parallax-umbra-main-dynamo-db.tfstate"
    region = var.region
    encrypt = true
  }
}
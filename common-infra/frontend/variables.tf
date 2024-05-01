variable "environment_name" {}

variable "prefix" {
  type = string
  default = "parallax"
}

variable "bucket_name" {
    type = string
    default = "umbra-frontend"
}

variable "region" {
  type = string
  default = "us-east-1"
}
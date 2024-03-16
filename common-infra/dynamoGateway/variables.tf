variable "environment_name" {}

variable "prefix" {
  type = string
  default = "parallax"
}

variable "gateway_name" {
    type = string
    default = "umbra-main"
}

variable "region" {
  type = string
  default = "us-east-1"
}
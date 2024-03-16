variable "environment_name" {}

variable "execution_role" {}

variable "lambdas_version" {}

variable "prefix" {
  type = string
  default = "parallax"
}

variable "lambda_name" {
    type = string
    default = "umbra-query-patient-info"
}

variable "region" {
  type = string
  default = "us-east-1"
}
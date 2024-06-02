variable "environment_name" {}

variable "execution_role" {}

variable "lambdas_version" {}

variable "prefix" {
  type = string
  default = "parallax"
}

variable "lambda_name" {
    type = string
    default = "umbra-manipulate-documents-info"
}

variable "document_bucket_name" {
  type = string
  default = "patient-document-bucket-${environment_name}"
}

variable "region" {
  type = string
  default = "us-east-1"
}
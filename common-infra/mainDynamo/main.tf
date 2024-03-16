resource "aws_dynamodb_table" "umbraMainDynamo" {
    name = "${var.prefix}-${var.dynamo_name}-${var.environment_name}"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "docName"
    range_key = "patientName"

    attribute {
      name = "docName"
      type = "S"
    }

    attribute {
      name = "patientName"
      type = "S"
    }

    attribute {
      name = "timestamp"
      type = "S"
    }

    global_secondary_index {
      name = "timestampIndex"
      hash_key = "timestamp"
      projection_type = "INCLUDE"
      non_key_attributes = [ "docName", "patientName" ]
    }

    tags = {
      Environment = var.environment_name
      project = "umbra"
    }
}
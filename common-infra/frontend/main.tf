provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "s3_frontend" {
  bucket = "${var.prefix}-${var.bucket_name}-${var.environment_name}"
}

resource "aws_s3_bucket_website_configuration" "s3_frontent_website_configuration" {
  bucket = aws_s3_bucket.s3_frontend.id

  index_document {
    suffix = "index.html" 
  }  
}

resource "aws_cloudfront_origin_access_identity" "frontend_website_OAI" {
  comment = "Cloudfront OAI for frontend API"
}

resource "aws_s3_bucket_policy" "s3_frontend_bucket_policy" {
  bucket = aws_s3_bucket.s3_frontend.bucket

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "s3:GetObject",
        Effect = "Allow",
        Resource = "${aws_s3_bucket.s3_frontend.arn}/*",
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.frontend_website_OAI.iam_arn
        }
      }
    ]
  })  
}

resource "aws_cloudfront_distribution" "frontend_cloudfront_distribution" {
  origin {
    domain_name = aws_s3_bucket.s3_frontend.bucket_regional_domain_name
    origin_id = aws_s3_bucket.s3_frontend.id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.frontend_website_OAI.cloudfront_access_identity_path
    }
  }

  enabled = true
  is_ipv6_enabled = true
  default_root_object = "/index.html"

  custom_error_response {
    error_caching_min_ttl = 10
    error_code = 403
    response_code = 403
    response_page_path = "/index.html"
  }

  default_cache_behavior {
    target_origin_id = aws_s3_bucket.s3_frontend.id

    viewer_protocol_policy = "redirect-to-https"
    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods = ["GET", "HEAD", "OPTIONS"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

}

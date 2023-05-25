locals {
  s3_bucket_name = jsondecode(file("${path.module}/s3.json")).s3_bucket
  s3__access = jsondecode(file("${path.module}/s3.json")).s3_public_access

}
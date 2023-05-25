module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = local.s3_data.name

  control_object_ownership = true
  object_ownership         = "BucketOwnerEnforced"

  versioning = {
    enabled = true
  }
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

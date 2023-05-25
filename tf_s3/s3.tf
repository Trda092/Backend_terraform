module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = local.s3_bucket_name

  control_object_ownership = true
  object_ownership         = "BucketOwnerEnforced"

  versioning = {
    enabled = true
  }
  block_public_acls       = local.s3__access
  block_public_policy     = local.s3__access
  ignore_public_acls      = local.s3__access
  restrict_public_buckets = local.s3__access
}

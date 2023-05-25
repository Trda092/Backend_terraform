locals {
  s3_data = jsondecode(file("${path.module}/s3.json"))

}
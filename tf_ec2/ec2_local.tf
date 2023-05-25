locals {
    ec2_data = jsondecode(file("${path.module}/ec2.json"))
}
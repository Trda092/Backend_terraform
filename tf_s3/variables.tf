##################################################################################
# VARIABLES
##################################################################################

variable "aws_access_key" {
    type        = string
    description = "AWS Access Key"
    sensitive   = true
}
variable "aws_secret_key" {
    type        = string
    description = "AWS Secret Key"
    sensitive   = true
}
variable "aws_session_token" {
    type        = string
    description = "AWS Session Token"
    sensitive   = true
}

variable "key_name" {
    type        = string
    description = "Private key path"
    sensitive   = false
}
variable "region" {
    type        = string
    description = "value for default region"
    default = "us-east-1"
}

variable "enable_dns_hostnames" {
    type        = bool
    description = "Enable DNS hostnames in VPC"
    default     = true
}

variable "map_public_ip" {
    type        = bool
    description = "Enable Mapping Public IP in the subnet"
    default     = true
}
variable "subnet_count" {
  default = 2
}
variable "network_address_space" {
  default = "10.0.0.0/16"
}

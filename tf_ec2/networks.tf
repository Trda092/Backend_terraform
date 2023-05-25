data "aws_availability_zones" "available" {}

resource "aws_vpc" "testVPC" {
    cidr_block = var.network_address_space
    enable_dns_hostnames = true

}

resource "aws_internet_gateway" "testIgw" {
    vpc_id = aws_vpc.testVPC.id
}

resource "aws_route_table" "publicRoute" {
    vpc_id = aws_vpc.testVPC.id
        route {
            cidr_block = "0.0.0.0/0"
            gateway_id = aws_internet_gateway.testIgw.id
        }
}


resource "aws_security_group" "allow_ssh_web" {
  name        = "demo_sg"
  description = "Allow ssh and web access"
  vpc_id      = aws_vpc.testVPC.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_subnet" "PublicNets" {
    count = var.subnet_count
    vpc_id = aws_vpc.testVPC.id
    cidr_block = cidrsubnet(var.network_address_space, 8, count.index)
    map_public_ip_on_launch = true
    availability_zone = data.aws_availability_zones.available.names[count.index]
    tags = {Name:"public-subnet${count.index}"}
}

resource "aws_route_table_association" "rt-pubsub1" {
    count = var.subnet_count
  subnet_id = aws_subnet.PublicNets[count.index].id
  route_table_id = aws_route_table.publicRoute.id
}
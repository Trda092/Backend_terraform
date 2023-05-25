resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "demo_subnet_group"
  subnet_ids = [for subnet in aws_subnet.PublicNets : subnet.id]
}

resource "aws_db_instance" "mydb" {
  allocated_storage    = 200
  identifier            = local.database_idf_name
  engine               = "mysql"
  engine_version       = "5.7"
  instance_class       = "db.t3.micro"
  storage_type         = "gp2"
  username             = local.database_data.db_username
  password             = local.database_data.db_password
  db_subnet_group_name = aws_db_subnet_group.rds_subnet_group.name
  skip_final_snapshot  = true
  publicly_accessible = (var.db_access && local.database_data.db_access)
}

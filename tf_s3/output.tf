output "show_database_info" {
  value = [for subnet in aws_subnet.PublicNets : subnet.id] 
  }

output "db_instance_info" {
    value = aws_db_instance.mydb.endpoint
}
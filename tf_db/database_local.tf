locals {
  database_idf_name = jsondecode(file("${path.module}/database.json")).db_idf
  database_data = jsondecode(file("${path.module}/database.json"))
}
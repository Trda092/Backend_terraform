output "ec2_instance_info" {
    value = aws_instance.Servers.instance_state
}
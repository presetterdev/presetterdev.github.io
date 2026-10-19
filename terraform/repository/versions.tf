terraform {
  required_version = ">= 1.12"

  required_providers {
    dns = {
      source  = "hashicorp/dns"
      version = "~> 3.6"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.13"
    }
  }
}

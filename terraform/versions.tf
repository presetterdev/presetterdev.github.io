terraform {
  required_version = ">= 1.12"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.28"
    }
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

# GenAI Virus and Malware Scanner Frontend

This repository contains the frontend code for the GenAI Virus and Malware Scanner project as part of cloudsineAI take home assessment.

It is written in AstroJS using TypeScript, components are written in ReactJS.

It is currently deployed on: https://cai.darrenchanyuhao.com

You can find a video showcasing the application here: https://youtu.be/nUFCm1a-H0I

## Key Features

- **File Upload**: Upload files to scan for viruses and malware.
- **Virus Total Report Display**: View detailed reports from Virus Total for scanned files.
- **Search Functionality**: Search for previously scanned files by their hash and also view last 5 files you uploaded.
- **AI Analysis**: Analyze files using LLM to detect potential threats with 3 different level of understanding.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Getting Started

### Prerequisites

- Tested with Node.js v20.11.0 and above

### Installation

Clone the repository:

```bash
  git clone
````

Install dependencies:

```bash
    npm install
```

### Running the Application

For development, run:

```bash
    npm run dev
```

For production, run:
```bash
    uvicorn run build
```

### Architecture & Folder Structure

```
/Frontend
  /.github                    – GitHub Actions workflows (contains the deployment yaml files)
  /nginx                      – Nginx configuration file for reverse proxy
  /public                     – Contains the static assets
  /src                        – Source code for the application
    /components               – Reusable components
    /DTO                      – Data Transfer Objects for request/response validation
    /layouts                  – Layout components
    /lib                      – Utility functions
    /pages                    – Different pages of the application
    /styles                   – Contains the global styles
  .Dockerfile                 – For containerization deployment on EC2
```

### Deployment

1. Set up an EC2 instance with Docker and Nginx installed.

2. Set up initial docker image and push to ECR using the instructions in AWS

3. Also set up an IAM user with permissions to access ECR and EC2

4. Set up GitHub Actions secrets for `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `EC2_SSH_KEY`, `EC2_USER` and `EC2_HOST`.
- The `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` should be the IAM user.
- The EC2_USER should your distro (e.g., `ubuntu` for Ubuntu). The EC2_HOST should be the public IP.

5. Push your changes to master branch, it will then trigger the GitHub Actions workflow to deploy the application.

6. Copy the Nginx configuration file to the EC2 instance and place it in `/etc/nginx/sites-available/` and `/etc/nginx/sites-enabled/`.

7. Restart Nginx to apply the changes:

```bash
    sudo sudo systemctl reload nginx
```

P.S For first deployment, it may fail due to missing SSL certificates. Remove the HTTPs Server block in the Nginx configuration file and redeploy.
You can then set up the SSL certificate. You can do this by:

1. Setting up a domain name and pointing it to the EC2 instance public IP.
2. I used Certbot and Let's Encrypt for the SSL certificate.
3. Once that is done, it should automatically update the Nginx conf. file, if not, you can manually update it back.

Thank you!

# Deploying to Google Cloud Run

This guide explains how to deploy this portfolio application to Google Cloud Run.

## Prerequisites

1. **Google Cloud Account**: Create one at [cloud.google.com](https://cloud.google.com)
2. **Google Cloud CLI**: Install from [cloud.google.com/sdk](https://cloud.google.com/sdk/docs/install)
3. **Docker**: Install from [docker.com](https://www.docker.com/get-started) (for local testing)

## Setup

### 1. Initialize Google Cloud CLI

```bash
# Login to Google Cloud
gcloud auth login

# Set your project (create one if needed)
gcloud projects create my-portfolio-project  # optional
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 2. Set Environment Variables

The application requires a GitHub token for fetching contributions. Set it as a secret:

```bash
# Create a secret for the GitHub token
echo -n "YOUR_GITHUB_TOKEN" | gcloud secrets create VITE_GH_TOKEN --data-file=-

# Grant Cloud Run access to the secret
gcloud secrets add-iam-policy-binding VITE_GH_TOKEN \
  --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

## Deployment Options

### Option A: Deploy from Source (Recommended)

The simplest way to deploy - Cloud Build will build and deploy automatically:

```bash
# Deploy directly from source
gcloud run deploy portfolio \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-secrets=VITE_GH_TOKEN=VITE_GH_TOKEN:latest
```

### Option B: Build and Deploy Manually

```bash
# Build the Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/portfolio .

# Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/portfolio

# Deploy to Cloud Run
gcloud run deploy portfolio \
  --image gcr.io/YOUR_PROJECT_ID/portfolio \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-secrets=VITE_GH_TOKEN=VITE_GH_TOKEN:latest
```

### Option C: Using Cloud Build (CI/CD)

For automated deployments on git push:

1. Connect your repository to Cloud Build:
   ```bash
   gcloud builds triggers create github \
     --repo-name=YOUR_REPO_NAME \
     --repo-owner=YOUR_GITHUB_USERNAME \
     --branch-pattern="^main$" \
     --build-config=cloudbuild.yaml
   ```

2. The included `cloudbuild.yaml` will automatically build and deploy on each push to main.

## Local Testing

### Test with Docker locally

```bash
# Build the image
docker build -t portfolio .

# Run with environment variable
docker run -p 8080:8080 -e VITE_GH_TOKEN=your_github_token portfolio

# Visit http://localhost:8080
```

### Test without Docker

```bash
# Install dependencies
npm install

# Build the app
npm run build

# Set environment variable and start server
VITE_GH_TOKEN=your_github_token npm start

# Visit http://localhost:8080
```

## Configuration Options

When deploying, you can customize various settings:

```bash
gcloud run deploy portfolio \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-secrets=VITE_GH_TOKEN=VITE_GH_TOKEN:latest \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --concurrency 80
```

### Common Options

| Option | Description | Default |
|--------|-------------|---------|
| `--memory` | Memory allocation | 256Mi |
| `--cpu` | CPU allocation | 1 |
| `--min-instances` | Minimum running instances | 0 |
| `--max-instances` | Maximum instances to scale to | 100 |
| `--concurrency` | Max concurrent requests per instance | 80 |
| `--timeout` | Request timeout | 300s |

## Custom Domain

To use a custom domain:

1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Click on your service
3. Go to "Manage Custom Domains"
4. Follow the instructions to verify and map your domain

## Monitoring

View logs and metrics:

```bash
# View logs
gcloud run services logs read portfolio --region us-central1

# Or use the console
# https://console.cloud.google.com/run
```

## Cost Optimization

Cloud Run charges based on:
- **CPU time**: Only when processing requests
- **Memory**: Only when instances are running
- **Requests**: Per million requests

Tips:
- Set `--min-instances 0` to scale to zero when idle (default)
- Use appropriate memory/CPU settings for your workload
- Enable [CPU throttling](https://cloud.google.com/run/docs/configuring/cpu-allocation) for cost savings

## Troubleshooting

### Build fails
- Check Docker is installed and running
- Ensure all dependencies are in `package.json`

### Application crashes
- Check logs: `gcloud run services logs read portfolio`
- Verify environment variables are set correctly

### GitHub API errors
- Ensure `VITE_GH_TOKEN` secret is properly configured
- Verify the token has the required permissions

## Files Created for Cloud Run

- `Dockerfile` - Multi-stage Docker build configuration
- `server.js` - Express server for serving static files and API
- `.dockerignore` - Files to exclude from Docker build
- `cloudbuild.yaml` - CI/CD configuration for Cloud Build

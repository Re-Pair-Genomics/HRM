# HRM

This is the internal human resource management software.

## How to run

### 1. Install Dependencies

Run the following command to install all required dependencies for the project:

```bash
pnpm install
```

### 2. Install SST

Install the Serverless Stack (SST) CLI using:

```bash
pnpm sst install
```

### 3. Install AWS CLI

Install the AWS CLI by following the [official documentation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Ensure that the AWS CLI is correctly installed and accessible from your terminal:

```bash
aws --version
```

If the installation is successful, this command will output the version of AWS CLI installed.

### 4. Set Up AWS Account and Profiles

You will need an AWS account with AdministratorAccess permission to manage resources. Follow these steps to configure AWS profiles

#### Using Static Credentials

1. Run the command:

    ```bash
    aws configure --profile dev-profile
    ```

2. Enter your AWS Access Key, Secret Access Key, default region (us-east-1 is recommended), and output format (e.g., json).

3. Repeat the above steps for `production-profile`.

#### Using AWS SSO (Preferred for Organizations)

1. Configure AWS SSO using:

    ```bash
    aws configure sso --profile dev-profile
    ```

    Follow the prompts to authenticate via SSO and link your `dev-profile` to the correct account and permissions.

2. Repeat the above steps for production-profile.

Ensure your `dev-profile` is configured for development environments and `production-profile` is reserved for production environments.

### 5. Start the Development Server

To begin working on the project in a local development environment, run:

```bash
pnpx sst dev
```

To run the project with log information printed on `stdout`, run:

```bash
pnpx sst dev --print-logs
```

### 6. Deploy to Production

When ready to deploy your application to production, use the following command:

```bash
pnpx sst deploy --stage production
```

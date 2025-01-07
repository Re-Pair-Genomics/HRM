# HRM

This is the internal human resource management software.

## How to run

### 1. Install Dependencies

Download node.js from the official website
```pass for now```

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
    aws configure --profile dev
    ```

2. Enter your AWS Access Key, Secret Access Key, default region (us-east-1 is recommended), and output format (e.g., json).

3. Repeat the above steps for `production`.

#### Using AWS SSO (Preferred for Organizations)

1. Configure AWS SSO using:

    ```bash
    aws configure sso --profile dev
    ```

    Follow the prompts to authenticate via SSO and link your `dev` to the correct account and permissions.

2. Repeat the above steps for production-profile.

Ensure your `dev` is configured for development environments and `production` is reserved for production environments.

### 5. Start the Development Server

To begin working on the project in a local development environment, run:

```bash
pnpm sst:dev
```

To run the project with log information printed on `stdout`, run:

```bash
pnpm sst:dev --print-logs
```

If you are using npm, instead of pnpm, use the following instructions instead
```pass for now```

### 6. Deploy to Production

When ready to deploy your application to production, use the following command:

```bash
pnpm sst:deploy
```

Ensure that you are **not** using Node version 23.2, as the build process will fail with this version. See [this issue](https://github.com/nodejs/node/issues/55826).

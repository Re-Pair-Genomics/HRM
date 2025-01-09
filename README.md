# HRM

HRM is an internal human resource management software.

# Version
v0.0.0 - not yet released.
Latest update: Jan 2025.

# Getting started

Below are instructions for developers.

## Prerequisites
1. __Download Node.js__ from the [official website](https://nodejs.org/en/download).
   - We highly recommend you use v22.3.0 (LTS). 
   - You can either download it with `npm` or `pnpm`
   - Verify that Node is successfully downloaded, run this command line on your terminal:
   ```Bash
   node --version
   ```
   
2. __Install Dependencies__
   - If you are using `npm`, you can install the required dependencies by running the following command:
   ```bash
   npm install
   ```
   
   - If you are using `pnpm`, run the following command instead:
   ```bash
   pnpm install
   ```

3. __Install SST__

   - If you are using `npm`, install the Serverless Stack 
   - pass for now
   - If you are using `pnpm`, install the Serverless Stack (SST) CLI using the following command line:
   ```bash
   pnpm sst install
   ```
   - Verify sst is successfully installed:
   ```Bash
   sst version
   ```

4. __Install AWS CLI__ by following instructions on the [official documentation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
   - Verify that AWS CLI is correctly installed and can be directly accessed from your terminal:
   ```bash
   aws --version
   ```

## Set Up your AWS Account and Profiles

You will need an AWS account with AdministratorAccess permission to manage resources. Follow these steps to configure AWS profiles, you can choose either ways:

### (Option 1): Using Static Credentials

1. Run the command:

    ```bash
    aws configure --profile dev
    ```

2. Enter your AWS Access Key, Secret Access Key, default region (us-east-1 is recommended), and output format (e.g., json).

3. Repeat the above steps for `production`.

### (Option 2): Using AWS SSO (Preferred for Organizations)

1. Configure AWS SSO using:

    ```bash
    aws configure sso --profile dev
    ```

    Follow the prompts to authenticate via SSO and link your `dev` to the correct account and permissions.

2. Repeat the above steps for production-profile.

Ensure your `dev` is configured for development environments and `production` is reserved for production environments.

## Start the Development

To begin working on the project in a local development environment, run:

```bash
pnpm sst:dev
```

To run the project with log information printed on `stdout`, run:

```bash
pnpm sst:dev --print-logs
```

If you are using npm, use the following instructions instead
```bash
sst dev
```

## Deploy to Production

When ready to deploy your application to production, use the following command:

```bash
pnpm sst:deploy
```

Ensure that you are **not** using Node version 23.2, as the build process will fail with this version. See [this issue](https://github.com/nodejs/node/issues/55826).

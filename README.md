# Instagrammer

![instagram-bot](https://user-images.githubusercontent.com/72868196/199066022-15862310-1046-4a11-b93d-cfe0f0e470f0.png)

Who said only humans can have Instagram pages? 😲 This is a robot created with serverless framework (which means that leaving it live on AWS is super cheap) made to create and manage an instagram page. With it, the process is very simple because when you think it's necessary, you'll do everything you need, including creating the posts for you!

## Features

- Create Posts:
  - Search google images for content related to your page's niche
  - Uses artificial intelligence to crop in the most important part of the image
  - Resize image aspect ratio to be between 0.8 and 1.7
  - Resize image to a minimum width of 1080px
  - Convert it to JPG
  - Upload the image to AWS S3
  - Public on your instagram page

## How to use

The process to use the robot is very simple but it depends on a little forethought and calm if you have never worked with Meta For Developers or Google Cloud Platform. But here is the step by step to start and run instagrammer:

### Downloading the project

This is a very simple step, just copy and clone the code below, we advise you to do this on a linux machine if you have Windows use WSL.

```bash
git clone https://github.com/Theryston/instagrammer.git
cd instagrammer
```

Once you already have the project cloned, just install the dependencies, this in our case is done with yarn, just run the following command in the terminal:

```bash
yarn
```

Once this is done we can start the most interesting part, configure the environment variables, first open the project in your favorite code editor and in the root folder create a file called `.env` in Visual Studio Code the process will follow like this:

```bash
code .
touch .env
```

Fill the `.env` file with the data in the `.env.example` file these are the initial data for the robot to be able to do its work, there are some API Keys and necessary tokens for the Instagram Graph API

### Moving up to AWS

Globally [install the serverless framework CLI](https://www.serverless.com/framework/docs/getting-started#installation), and configure it with your [AWS account credentials](https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials#configure-the-default-profile)

After configuring the credentials, just run the following command:

```bash
yarn deploy
```

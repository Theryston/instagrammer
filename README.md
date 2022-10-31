# Instagrammer

![instagram-bot](https://user-images.githubusercontent.com/72868196/199066022-15862310-1046-4a11-b93d-cfe0f0e470f0.png)

Who said that only humans can have Instagram pages? 😲 This is a robot made to create and manage an instagram page. With him the process is very simple because when he finds it necessary he will do everything he needs, even create the posts for you!

## Features

- Create Posts:
  - Search google images for content related to your page's niche
  - Download the image
  - Uses artificial intelligence to crop in the most important part of the image
  - Resize image to 1000x1000
  - Convert it to JPG
  - Hosts the image at [https://xhr-server.herokuapp.com](https://xhr-server.herokuapp.com)
  - Public on your instagram page

## How to use

The process to use the robot is very simple but it depends on a little forethought and calm if you have never worked with Meta For Developers or Google Cloud Platform. But here is the step by step to start and run instagrammer:

### Downloading the project

This is a very simple step, just copy and clone the code below, we advise you to do this on a linux machine if you have Windows use WSL.

```bash
git clone https://github.com/Theryston/instagrammer.git
cd instagrammer
```

Once you already have the project cloned, just install the dependencies, this in our case is done with [pnpm](https://pnpm.io/installation), just run the following command in the terminal:

```bash
pnpm i
```

Once this is done we can start the most interesting part, configure the environment variables, first open the project in your favorite code editor and in the root folder create a file called `.env` in Visual Studio Code the process will follow like this:

```bash
code .
touch .env
```

Fill the `.env` file with the data in the `.env.example` file these are the initial data for the robot to be able to do its work, there are some API Keys and necessary tokens for the Instagram Graph API

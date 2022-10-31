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

### Configuring Meta For Developers

Go to [https://developers.facebook.com/apps](https://developers.facebook.com/apps), log in with your facebook account if you don't already have one and click on the green button "Create Application", select the option "None", fill in the requested data in the form, click in "Create App" and click on "Sing Up" on Instagram Graph API card

![create-app-home](https://xhr-server.herokuapp.com/files/1667237546681667656480525.png)

![select-none](https://xhr-server.herokuapp.com/files/1667237681712578628047965.png)

![create-app](https://xhr-server.herokuapp.com/files/1667237757498791673535656.png)

![sing-up-graph-api](https://xhr-server.herokuapp.com/files/1667238036549955128748916.png)

Ignore everything that appears on your screen from that point on, now we can start and generate our token, go to [https://developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer) select in "Meta App" the name of the app we just created , under "User or Page" select "User Token" (or Get User Access Token), under permissions click on "Add Permission" and select pages_show_list, instagram_basic, instagram_content_publish, pages_read_engagement

Go to [https://business.facebook.com](https://business.facebook.com) click on the drop down in the upper left corner and click on "Create a business account", enter the name of your page, click on "Next", fill in the fields with your personal data (first name, last name...), click "Skip", "Skip" and "Confirm"

Go to [https://www.instagram.com](https://www.instagram.com) and create a new account, then [https://www.instagram.com/accounts/edit/](https://www.instagram.com/accounts/edit/) change your account to a professional account, then [https://business.facebook.com/latest/settings/business_assets](https://business.facebook.com/latest/settings/business_assets) click on "Add Assets" select "Instagram Account" and select your instagram account

<div align="left">
  <h1>PROJECTMATE - Supercharge your open-source contributions</h1>
</div>

![COVER-PROJECTMATE](https://projectmate.net/og.png)

Discover open-source projects, connect with experienced maintainers, and collaborate with a community of passionate contributors. Join over 150 registered users who are already making a difference

## Demo

Check out the web app 🌏 : https://projectmate.net/
<br>
<br>
<a href="https://www.projectmate.net/" target="_blank">
<img width="1440" alt="LandingPage Screenshot" src="https://projectmate.net/landingpage-screenshot.png">
</a>

## Connect with us

As a community, we always encourage people to share their thoughts and ideas. Do you want to talk to us? Join and Follow our Discord server and Twitter page ⬇️

[![DISCORD - Join](https://img.shields.io/badge/DISCORD-Join-f3f6f4?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/FQtyMWFZQ9)
[![TWITTER - Join](https://img.shields.io/badge/TWITTER-Follow-f3f6f4?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/projectmateHQ)

Figma design:

[![FIGMA - View](https://img.shields.io/badge/Figma-View-f3f6f4?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/3v3ckbS8o24Me4L93so4js/projectmate)

## Tech stack

![Next.js](https://img.shields.io/badge/Next.js-f3f6f4?style=for-the-badge&logo=next.js&logoColor=black)
![tailwind css](https://img.shields.io/badge/tailwind_css-f3f6f4?style=for-the-badge&logo=tailwindcss&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-f3f6f4?style=for-the-badge&logo=mongodb&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-f3f6f4?style=for-the-badge&logo=prisma&logoColor=black)
![Figma](https://img.shields.io/badge/Figma-f3f6f4?style=for-the-badge&logo=figma&logoColor=black)

1. Frontend - **Next.js Client**
2. CSS Framework - **Tailwind CSS**
3. Backend - **NextJS APIs + Next Auth + MongoDB + Prisma ORM**
4. Design & Prototype - **Figma**

## Installation steps

### Standard installation

> Prerequisites
>
> Before getting into it, make sure you have [yarn](https://yarnpkg.com/) and [prisma](https://prisma.io) installed.

<br>

1. Fork the project 🔧

2. Clone the project by running the following command on the terminal 🔽
   ```sh
   git clone https://github.com/<your-github-username>/projectmate.git
   ```
3. Go into the project directory 🔽
   ```sh
   cd projectmate
   ```
4. Create an `.env` file from the `.env.template` file (copy everything in the `.env.template` file and put it in the `.env` file with appropriate values) 📄

   - `MONGODB_URI` is the `connection string` which you'll get from mongodb [for reference](https://www.mongodb.com/docs/manual/reference/connection-string/).
   - `NEXTAUTH_SECRET` Just pass any `random string` or you can quickly create a good value on the command line via this `openssl command`.
     <br>

   ```sh
   openssl rand -base64 32
   ```

5. Install all the dependencies ✅
   ```sh
   yarn
   ```
6. Synchronize your Prisma schema with your database schema 🗃
   ```sh
   yarn prisma db push
   ```
7. Insert required data to your database ✅
   ```sh
   yarn prisma db seed
   ```
8. Start the application development server 🚀
   ```sh
   yarn run dev
   ```

<br>

### Installation using docker

> **_NOTE:_** Docker set up is highly recommended mainly on linux systems due to possible performance issues on other platforms.

1. Fork the project 🔧

2. Clone the project by running the following command on the terminal 🔽
   ```sh
   git clone https://github.com/<your-github-username>/projectmate.git
   ```
3. Go into the project directory 🔽
   ```sh
   cd projectmate
   ```
4. Create an `.env` file from the `.env.template` file (copy everything in the `.env.template` file and put it in the `.env` file with appropriate values) 📄

   - `MONGODB_URI` is the `connection string`, in this case your connection string should look exactly like this `mongodb://root:root@mongo:27017/projectmate?authSource=admin`
   - `NEXTAUTH_SECRET` Just pass any `random string` or you can quickly create a good value on the command line via this `openssl command`.
     <br>

   ```sh
   openssl rand -base64 32
   ```

5. Build docker containers 🔽
   ```sh
   docker compose build
   ```
6. Start containers in a background 🔽
   ```sh
   docker compose up -d
   ```
7. Synchronize your Prisma schema with your database schema 🗃
   ```sh
   docker compose exec web yarn prisma db push
   ```
8. Insert required data to your database ✅
   ```sh
   docker compose exec web yarn prisma db seed
   ```
   > You can access logs from web or mongo container by docker compose logs e.g:
   >
   > ```sh
   > docker compose logs web -f
   > ```
   >
   > If you want to stop containers just run:
   >
   > ```sh
   > docker compose stop
   > ```
   >
   > Or if you want to stop and remove containers, networks:
   >
   > ```sh
   > docker compose down
   > ```

<br>

> **_NOTE:_** If you want to add new package, you must use
>
> ```sh
>  docker compose exec web yarn add [package]
> ```
>
> Then (also if you pulled branch with changes to package.json) rebuild containers:
>
> ```sh
>  docker compose up --build -d
> ```
>
> You cannot perform `yarn build` from your local machine - you need to use:
>
> ```sh
>  docker compose exec web yarn build
> ```

## Contributing Guidelines 📜

Any contributions you make are truly appreciated, go to our [CONTRIBUTING.md](https://github.com/rohitdasu/projectmate/blob/main/CONTRIBUTING.md) file for more information.

## Code of Conduct 📜

View [CODE_OF_CONDUCT.md](https://github.com/rohitdasu/projectmate/blob/main/CODE_OF_CONDUCT.md)

## Contributors ✨

<a href="https://github.com/rohitdasu/projectmate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=rohitdasu/projectmate" />
</a>

## Support ⭐

Don't forget to leave a star ⭐ if you want to support us.

## License 📃

projectmate is licensed under the MIT License - see the [LICENSE](https://github.com/rohitdasu/projectmate/blob/main/LICENSE) file for details.

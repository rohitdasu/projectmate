<div align="left">
  <h1>PROJECTMATE - Supercharge your open-source contributions</h1>
</div>

![COVER-PROJECTMATE](https://projectmate.net/og.jpg)

Discover open-source projects, connect with experienced maintainers, and collaborate with a community of passionate contributors. Join over 150 registered users who are already making a difference

## Demo

<a href="https://www.projectmate.net/" target="_blank">
   <img width="1440" alt="Screenshot 2023-04-21 at 7 59 29 PM" src="https://user-images.githubusercontent.com/48400770/233662090-85fc2db2-0d4e-498b-8cf1-946f0c5499e1.png">
</a>
<br>
<br>

Check out the web app 🌏 : https://projectmate.net/

## Connect with us

As a community, we always encourage people to share their thoughts and ideas. Do you want to talk to us? Join and Follow our Discord server and Twitter page ⬇️ 

[![DISCORD - Join](https://img.shields.io/badge/DISCORD-Join-15a34a?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/FQtyMWFZQ9)
[![TWITTER - Join](https://img.shields.io/badge/TWITTER-Follow-15a34a?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/projectmateHQ)

Figma design:

[![FIGMA - View](https://img.shields.io/badge/Figma-View-15a34a?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/3v3ckbS8o24Me4L93so4js/projectmate)

## Tech stack

![Next.js](https://img.shields.io/badge/Next.js-15a34a?style=for-the-badge&logo=next.js&logoColor=white)
![tailwind css](https://img.shields.io/badge/tailwind_css-15a34a?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-15a34a?style=for-the-badge&logo=mongodb&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-15a34a?style=for-the-badge&logo=prisma&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-15a34a?style=for-the-badge&logo=figma&logoColor=white)

1. Frontend - **Next.js Client**
2. CSS Framework - **Tailwind CSS**
3. Backend - **NextJS APIs + Next Auth + MongoDB + Prisma ORM**
4. Design & Prototype - Figma

## Installation steps


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

# quirk. Project-2

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">quirk.</h1>
    <a href="https://github.com/ALayendecker/Project-2"><strong>Documentation and Repo Link</strong></a>
    <br />
  </p>
</p>
<p align="center">
  <h1 align="center">quirk.</h1>
    <a href="https://project-two-0.herokuapp.com/"><strong>Deployment</strong></a>
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
  - [Organization](#Organization)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

This app will allow users to create/join personal task/to-do lists that they can keep to themselves or join groups. Designed to be a useful tool the absent minded and organized professional alike!

### Built With

Deployed with

- [Heroku](https://www.heroku.com/)

Framework

- [Node](https://nodejs.org/en/)

Database

- [MySQL & Workbench w/ Sequelize](https://www.mysql.com/)
- [JawsDB](https://elements.heroku.com/addons/jawsdb)

Node Packages

- [Node Package - Express](https://www.npmjs.com/package/Express)
- [Node Package - Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
- [Node Package - Bcrypt](https://www.npmjs.com/package/Bcrpyt)
- [Node Package - Cookie-Parser](https://www.npmjs.com/package/cookie-parser)
- [Node Package - DotEnv](https://www.npmjs.com/package/dotenv)
- [Node Package - mysql2](https://www.npmjs.com/package/mysql2)
- [Node Package - Sequelize](https://www.npmjs.com/package/Sequelize)
- [Node Package - Sequelize-cli](https://www.npmjs.com/package/mysqlsequelize-cli2)
- [Node Package - dotenv](https://www.npmjs.com/package/dotenv)
- [Node Package - eslint](https://eslint.org/)

Special Mentions

- [Authentication Guide - jgrisafe](https://medium.com/@jgrisafe/custom-user-authentication-with-express-sequelize-and-bcrypt-667c4c0edef5)
- [Authentication Boilerplate - jgrisafe](https://github.com/jgrisafe/express-sequelize-authentication-boilerplate)
- [othneildrew - Best README Template](https://github.com/othneildrew/Best-README-Template)

<!-- Organization -->

## Organization

This app uses an MVC file structure. Displayed below.

```sh
.
|   .env
|   .eslintrc.js
|   .gitignore
|   package-lock.json
|   package.json
|   readme.md
|
+---client
|   +---css
|   |       main.css
|   |
|   +---images
|   |       background.jpg
|   |       color_ecommerce.png
|   |       ecommerce.png
|   |
|   \---js
|           form.js
|
+---node_modules
\---server
    |   index.js
    |
    +---config
    |       config.json
    |
    +---controllers
    |       user-controller.js
    |       views-controller.js
    |
    +---middleware
    |       custom-auth-middleware.js
    |
    +---migrations
    |       20180311223110-create-user.js
    |       20180312045510-create-auth-token.js
    |
    +---models
    |       AuthToken.js
    |       Board.js
    |       index.js
    |       Middle.js
    |       Task.js
    |       User.js
    |
    \---views
        |   404.handlebars
        |   board.handlebars
        |   home.handlebars
        |   settings.handlebars
        |   task.handlebars
        |   workspace.handlebars
        |
        \---layouts
                main.handlebars
```

<!-- GETTING STARTED -->

## Getting Started

Simply visit (https://project-two-0.herokuapp.com/)

If you want to get your hands on the code simply look at the following section [Installation](#installation)

### Installation

1. Clone the repo

```sh
git clone https://github.com/ALayendecker/Project-2.git
```

2. Install NPM packages

```sh
npm install
```

3. Create a database

```sh
Start a MySQL database and configure the server/config/config.json file accordingly.
```

4. Dig in.

<!-- USAGE EXAMPLES  -->

## Usage

Simply visit (https://project-two-0.herokuapp.com/) click the 'Create Account' button and sign up! Then proceed to login with your newly created credentials.

You will then be able to add task boards add tasks inside those boards. You can also assign users to tasks as well!

Enjoy your new found task productivity!

## Authentication

We use Bcrypt to safely store your passwords on our database after it goes through no less than 10 'saltrounds' ensuring that your hashed password will keep your top secret to-do lists safe from prying eyes.

Each time you log in you will also be provided a randomly generated cookie authentiacation parsed by npm cookie-parser. This cookie will preserve your login until you logoff or let the cookie expire after 7 days.

<!-- CONTACT -->

## Contact

### **Developers**

#### - [Stephen Hendrix](https://github.com/StephenTHendrix)

#### - [Andrew Layendecker](https://github.com/Alayendecker)

#### - [Lucio Verane](https://github.com/LVerane)

#### - [Remington Villa](https://github.com/remingtonjosh)

Project Link: [https://github.com/Alayendecker/Project-2](https://github.com/Alayendecker/Project-2)

Special thanks: [jgrisafe - For a well written article on Express and Sequelize Authentication and open source boilerplate](https://medium.com/@jgrisafe/custom-user-authentication-with-express-sequelize-and-bcrypt-667c4c0edef5)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Alayendecker/Project-2.svg?style=flat-square
[contributors-url]: https://github.com/Alayendecker/Project-2/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Alayendecker/Project-2.svg?style=flat-square
[forks-url]: https://github.com/Alayendecker/Project-2/network/members
[stars-shield]: https://img.shields.io/github/stars/Alayendecker/Project-2.svg?style=flat-square
[stars-url]: https://github.com/Alayendecker/Project-2/stargazers
[issues-shield]: https://img.shields.io/github/issues/Alayendecker/Project-2.svg?style=flat-square
[issues-url]: https://github.com/Alayendecker/Project-2/issues

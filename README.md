# Moods

Final Project for CS50W course
Created by Jody Bailey

## What Is This Project?

A mood tracking application consisting of a Django backend and a ReactJS frontend. It allows users to create, update, and delete journal entries which specifies how good of a day each day was, list the emotions they felt, what they did, and what contributed the most to their overall mood that day. Once they have at least one journal entry, they can view statistics for tracking what their average mood is, how it has progressed from each journal entry, what contributed the most to a positive and negative mood, and how many contributor, emotion, and activity entries they have so far.

## Key Features

- User registering + logging in
- Viewing, creating, updating and deleting journal entries which describe how each day was, what you felt, did, and what contributed the most to your overall rating of the day. An optional note for that day can also be provided to each entry.
- Calculation and viewing statistics based off of every journal entry

## Distinctiveness and Complexity

While the application as a whole is centered around the usual CRUD (create, read, update, and destroy) operations, the main components that makes it stand out and displays it's distinctiveness are the JWT authentication/authorisation, the [djangorestframework](https://www.django-rest-framework.org/) backend API, and the ReactJS frontend, created through the [Vite package](https://vite.dev/guide/) and built with the [MUI](https://mui.com/) components library.

The JWT authentication/authorisation is fundamentally distinct from the usual session based tokens which Django applications normally ship with as no information is stored on the server, instead, a session and refresh token is signed with a secret key and is stored on the client. The session token is used for every request and when it expires, the refresh token is used to generate a new session token. The tokens can also be blacklisted via the logout route and by simply waiting for a day to pass so that the token expires.

The `djangorestframework` backend API is distinct from the usual vanilla Django views as it offers a lot of convenient views out-of-the-box for creating generic views for performing CRUD operations, but still allows for specific views with customised logic to be created. The implementation of these views for this application involves generic views for performing CRUD operations for entries, and a specific view for generating the statistics based off of the entries a user has given.

The ReactJS frontend is definitively distinct from the usual view layer that ships with Django to display content. Each frontend element is grouped into a react component and organised based off of the page and function that it is displayed on. The querying layer is managed by the popular `react-query` library which does all the heavy lifting for managing query logic in React applications with minimal configuration, such as caching and managing queries on renders, re-renders, and unmounting. The application also makes full use of react hooks for tapping into the functionality that is provided by React, such as stateful data, effects on render, and caching. The parent state data, known as contexts, manages determining whether or not the user is logged in or not, which is used for logic refreshing their token if they are not. All of this is combined to make a frontend which is well organised, full of reusable components as opposed to vanilla Javascript DOM manipulation, and making use of modern features seen in production applications.

All of these combinations of features combined creates a full-stack web application that is decidedly distinct from all other projects within the CS50W Course.

## Developer Guide

This project is separated into two components, the frontend and the backend. For the prroject to run successfully, we'll need run the development server for each component stack.

To start, copy the `.env.example` file at the project's root directory, paste it in the `frontend` and `backend` directory while simply renaming it to `.env`, and replace the `DJANGO_SECRET_KEY` variable with a randomly generated string which will be used to sign our JWT. You can generate a random UUID to use for this secret's value as an example. Go to <https://www.uuidgenerator.net/version4> to generate a radom UUID.

### Backend Setup

- `cd` into the `backend` directory
- Create a python virtual environment by running `python -m venv .venv` and activate the environment with `source .venv/bin/activate` (The version used for developing the project was Python 3.13.1)
- Make the run.sh script executable by running `chmod u+x run.sh`
- Run the script with `./run.sh`. This will perform all commands for setting up and running the development server. This command can be used for any subsequent run of the server. Optionally, you can simply run `python manage.py runserver 9000` if you have at least ran this script once.

At this point the backend server is running through the terminal tab in which you have run the `run.sh` script. For the next steps, you'll want to make sure you're in a new separate terminal tab for running the frontend server.

### Frontend Setup

- `cd` into the `frontend` directory
- Make sure you have [node and nvm](https://nodejs.org/en/download) installed on your system and are using the correct version. The version used for creating this project is `20.19.0`, which can also be found in the `.nvmrc` file.
- Make the run.sh script executable by running `chmod u+x run.sh`
- Run the script with `./run.sh`. This will perform all commands for setting up and running the development server. This command can be used for any subsequent run of the server. Optionally, you can simply run `npm run dev` if you have at least ran this script once.

After everything is set up, navigate to <http://localhost:5173/> to go to the home page of the application.

## Directory structure

This project is separated into two main folders: the `frontend` and `backend` folders. This is purely to neatly separate where the code is found for each component.

### .env.example

Environment variables that should be used for the frontend and backend directories.

### .gitignore

Files that should be ignored by git

### README.md

The README file you're reading know describing the project :)

### Backend

#### manage.py

Contains the config for commands for the django app

#### requirements.txt

Contains all python packages to install

#### api

#### migrations

Contains all migrations to the DB that should be run

#### admin.py

Contains the admin site configurations for the models

#### apps.py

Contains default application configurations

#### models.py

Contains the Entry, Activity, Emotion, and Contributor models. Each activity, emotion, and contributor are associated to the entry and only contain a name field. The entry contains the main record which the application is based around. One thing to note is that a user can only have one entry for each day. Trying to create an entry for the same day will result in an error.

#### serializers.py

Contains the serializer classes for the User, Emotion, Activity, Contributor, and Entry models as well as a serializer for the statistics. The user serializer, in addition to serializing the user objects, handles the creation of new users and handles the error if the confirmed password given for a user does not match the initial password given for a user.

The entry serializer also handles creating and updating entries, which in turn creates, updates, or deletes emotions, activities, or contributors. The heavy lifting for determining which emotions, activities, or contributors should be created, deleted, or updated when an entry updates is managed in this serializer.

The statistics serializer only converts the snake cased fields into camel cased fields

#### urls.py

Contains the main url configurations for the application:

- register/: Handles registrations of new users
- entries/: Handles viewing entries for a user
- entries/create/: Handles creating entries for a user
- entries/delete/<int:pk>/': Handles deleting a specific entry
- entries/update/<int:pk>/': Handles updating a specific entry
- statistics/': Handles calculating and sending back statistics based on the user's entries
- token/': Handles the creation of the JWT token
- token/blacklist/': Handles the blacklisting of a JWT token (called when a user logs out)
- token/refresh/': Handles refreshing expired JWT tokens

#### views.py

Contains the views for registering, viewing, creating, updating, and deleting entries, and viewing statistics based on the entries for a user. The most complex of these views is the statistics view as it is a custom made view which it own defined logic for the data that should be sent.

In short, the statistics view gets the average mood of a user (based on the sentiment of each entry), the frequency of each activity, emotion, and contributor, which contributors contributed the most to a positive and negative mood (based on the sentiment rating for entries with specific contributors), and a timeline of how their average mood changed from each entry

#### backend

##### asgi.py

Contains the default ASGI config for the project

##### settings.py

Contains all setting configurations for the django project. Notable configurations here are:

- `REST_FRAMEWORK`: Determines that JWT authentication should be used and that, unless specified, you need to be authenticated to access any routes
- `SIMPLE_JWT`: Configurations for the JWT package. Mostly reflects the default configurations for JWT tokens.
- `CORS_ALLOWED_ORIGINS`: Allows the specified URL to make requests to the backend
- `CSRF_TRUSTED_ORIGINS`: Specifies the URL which can make requests with the CSRF token

##### urls.py

Contains the entry point urls for the application:

- admin/: Administration console route
- api/: Route for the api application which contains all our endpoints

##### wsgi.py

Default WSGI config for the project

### Frontend

#### .gitignore

Files that should be ignored by git (generated when creating the Vite application)

#### .nvmrc

Specifies the node version to run for this application

#### eslint.config.rc

Specifies styling configs for the frontend application (generated when creating the Vite application)

#### index.html

The entry point html page for the react application.

#### package-lock.json

Specifies the actual versions of packages installed, ensuring consistency across installs on different environments

#### package.json

Specifies metadata regarding the application, but mainly used t view the packages required for running the application

#### run.sh

Simple shell script for running the application

#### vite.config.js

Configuration file for running the Vite React application

#### src

##### App.jsx

Main react component, containing all routes of the application as well as containing and setting the context logic for whether the user is authorised or not and getting a new token if their current one is expired by decoding the jwt token and comparing the `exp` value with the current time

##### index.css

Main CSS folder containing all the styling declarations for the application

##### main.js

Entry react component which contains wrappers for the `App` component and creates the root DOM node

##### components

###### entries

###### CheckboxInput.jsx

Component for rendering a checkbox input element which will contain the actual input element hidden behind a custom icon

###### CreateEntryButton.jsx

The button that is displayed on the entries page which handles opening the modal for creating a new entry

###### DeleteModal.jsx

The modal that is displayed if someone is attempting to delete an entry, asking for confirmation that they actually want to go through with deleting the entry. once the entry is deleted, we need to remove the entry from the cache for all our entries and then we need to remove, and therefore refresh, our statistics cache so that the data that is cached for those routes get

###### EntryForm.jsx

The form that is displayed when either a new entry is being created or an existing entry is being edited. This file contains the heavy lifting for managing all inputs of the form and determining what should be used in the requests for creating / updating an entry.

If we are creating a new entry, then all the input fields will be blank, as will the stateful variables. But if we are updating an entry, which we would know by determining if the `dataObject` prop is passed with the entry data, then the stateful variables will be populated with the `dataObject`'s data.

Before running the mutations to create or update entries, we call the route to handle authorisation for the user so that their JWT can be refreshed if it has expired while they were filling out the form. If this was not called, then it is possible the user will get an error when submitting the form because of their JWT expiring.

###### EntriesPlaceholder.jsx

The placeholder component that is rendered when the entry page is still loading the entries

###### Entry.jsx

The entry component that is rendered for each entry a user has on the entries page

###### EntrySection.jsx

Manages the content that is displayed for the emotions, activities, and contributors sections on the entries displayed on the entries page

###### FormCheckboxSection.jsx

Manages the checkbox input element sections that is displayed for the emotions, activities, and contributors sections on the entries form

###### FormInputContainer.jsx

Component for rendering an individual input element which is hidden behind an icon

###### MenuSelect.jsx

The 3 dot menu component which is displayed on each entry. Clicking on it will present two select options: Edit and Delete. Clicking on one of those options will open the entry form or open the delete modal respectively

###### NoEntries.jsx

Contains the components for displaying a useful placeholder on the entries page when the user does not have any entries, incentivising them to create a new entry

###### RadioInput.jsx

Component for rendering a Radio input element which will contain the actual input element hidden behind a custom icon. used for rendering the sentiment section in the entry form, so you can only pick one sentiment for an entry

###### shared

###### AuthWrapper.jsx

Wrapper component which can be used to wrap components which should only be accessed when the user is authorised to view a page, meaning they are logged in and their JWT token has not yet expired. If the user tries to navigate to a page which is wrapped in this component but they are not authorised, then they are navigated to the login page.

###### EntryItemsIcon.jsx

The icon that would be displayed for every entry's emotions, activities, and contributors. Also used for rendering the main contributors for a positive and negative mood seen in the statistics page

###### Error.jsx

The error page that is displayed whenever an error is encountered with loading a component

###### GenericIcon.jsx

An icon that is displayed which does not fit into a specific category.

###### GenericLoadingPlaceholder.jsx

Contains the placeholder component that will render when a page is still loading. Used for generic purposes and not on one specific page

###### Navbar.jsc

The navigation bar that is displayed on every page. Certain navigation links will only be displayed if a user is logged in or a user has not yet logged in. We also manage logging out the user here by displaying the logout navigation link when a user has already logged in

###### SentimentIcon.jsx

The icon that will be displayed if we are working with a sentiment value (numbers 1-9). The appropriate sentiment icon will be rendered based on the sentiment value

###### statistics

###### AverageMood.jsx

Contains the components that will render for the Average Mood section on the statistics page. This includes a text snippet showing your average mood score and its rounded sentiment value, as well as a gradient to show where that score would sit overall on the sentiment scale.

###### MainContributors.jsx

Contains the components that will render the positive and negative mood contributors for the statistics page. Users will see the score of their top negative / positive contributor(s)

###### MoodChart.jsx

Contains the container for the average mood timeline chart. This displays how a user's average mood has changed from each entry

###### NoStatistics.jsx

The placeholder component that will display when a user does not have enough entries for displaying their statistics

###### StatisticsBarChar.jsx

The bar chart that will be displayed for the frequency of contributors over all of a user's entries

###### StatisticsPieChart.jsx

The pie chart that will be displayed for the frequency of all emotions and activities over all of a user's entries

##### constants

###### entryOptions.js

Contains all string constants for entries that are utilised across the frontend folder

###### sentimentMap.js

Contains mappings for the sentiment values. We map the sentiment values (1-9) to their respective sentiment string value (Horrible, Very Bad, etc.), to the helper classes that can style the borders and text with the associated sentiments color, and to the actual color variables that are associated with each sentiment

###### tokens.js

Contains the two constant strings for the access and refresh tokens, which aligns with the actual name of the tokens that would be stored in the local storage

###### tooltip.js

Contains the styling that should be used for the tooltip that shows up when viewing the individual points on a chart.

##### containers

###### Entries.jsx

The page for containing all components for displaying the entries and creating new entries

###### Home.jsx

The home page of the application. Contains the static text content and the animated sentiment icon that is rendered

###### Login.jsx

The login page of the application. Contains the login form and logic for handling the response of the request sent to login

###### Register.jsx

The register page of the application. Contains the register form and logic for handling the response of the request sent to register a new user

###### Statistics.jsx

The statistics page of the page. Contains all components for rendering the result of the statistics endpoint that is queried

##### contexts

###### AuthorisedContext.jsx

Declaration for the authorised context, used throughout the application to render components or redirect users to the login page based on the value of the context value.

###### SentimentContext.jsx

Declaration for the sentiment context, used to change the color of the entry options on the form based on the sentiment value

##### helpers

###### axiosClient.js

Contains the setup for the axios client that will be used to send requests to the backend API. Sets the base url to query and the authorisation header

###### general.js

Contains general helper methods that do not fall within one category

###### iconHelpers.js

Contains helper methods which map certain values to their respective icon classes, which is used to determine what the actual icon that is displayed will be

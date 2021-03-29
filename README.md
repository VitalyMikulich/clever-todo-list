# Clever To-Do List

## 1. Task

https://docs.google.com/document/u/2/d/1heFuihWrsw14bCpUdr6fla9ysqE6IrsobSMKAOpBiKA/mobilebasic

## 2. How to run the app

### 1. API

1. Create `.env` file. 
2. Open `.env.example` file and copy content.
3. Paste it to `.env` file.
4. Add in rights parts your firebase keys. 

### 2. `yarn install` or `npm i`

In the project directory, you can run:

Install the dependencies in the local `node_modules` folder.

### 3. `yarn start` or `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 3. Database snapshot

| Database  |       |          |                  |                              |
|---        |---    |---       |---               |---                           |
| User ID:  | &not; |          |                  |                              |
|           | Day:  |  &not;   |                  |                              |
|           |       | Task ID: |  &not;           |                              |
|           |       |          |    date:         |  `string`: '2021-03-29'      |
|           |       |          |    description:  |  `string`: 'Any description' |
|           |       |          |    done:         | `boolen`: `true` or `false`  |
|           |       |          |    key:          | `string`: `Generated key`    |
|           |       |          |    title:        |  `string`: 'Any title'       |

## 4. Application stack

1. [React](https://ru.reactjs.org/)
2. [Redux](https://redux.js.org/)
3. [React Router Dom](https://reactrouter.com/web/guides/quick-start)
4. [FireBase (Realtime Database and Authentication)](https://firebase.google.com/)
5. [Moment.js](https://momentjs.com/)
6. [Material UI](https://material-ui.com/)

## 5. Folders
* Store - js files for app state
* Authorization - folder for authorization component
* MainPage - folder for main page component. Also contains folders of components used in the MainPage (Calendara => Day, Header, TodaysTasks => ToDo)
ModalWindow - component that shows an error that occurs during authorization and registration
* PrivateRoute - contains PrivateRouteOnline and PrivateRouteOffline, which, depending on the user is online or not, return the Route to the passed page, otherwise redirect to the accessible page
* Registration - folder for registration component
* Task - folder for component of creation, updating and viewing of task
* TaskContainer - if props is passed to the Task component, renders Task component, otherwise redirect to the main page

## 6. Dark Theme

https://github.com/VitalyMikulich/clever-todo-list/blob/704110301e0c060a0fab268c4e2df1e54791c03d/src/App.js#L37

At this line change `light` to `dark` to enable dark theme.

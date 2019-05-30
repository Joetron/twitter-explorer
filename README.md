## Twitter Explorer

This project is an exploration itself into the twitter api and data visualizations. At a former job I worked on various visualization components, mainly timelines and maps, and wanted to create my own project to see how I could leverage what I had learned to explore the twitter api and come up with new ideas on how to visualize and interact with data.

The current state of the timeline is purely functional, using bootstrap 4.3 to get in some basic styles and layouts. Future versions may use may own custom css, or use theming in bootstrap.

## Timeline

The timeline represents searches as events. Tweets are grouped together as bars if they are related, or as circles if they are stand alone. Tweets are related if they are retweets or replies to another tweet. Currently there is only a first degree relationship between the tweets, that is a retweet is linked to the original, but retweet of a retweet would not be linked in the same bar. The next step is refactor to use a graph of the tweets.

### Groups

The timeline is currently grouped by searches (a previous version was grouped by hashTags and places but was pulled out until the graph is completed).

### Connections (Future)

Since groups may have the same tweets, a connection will be drawn to draw out the relationship visually. Some work was started for this, but will not be completed until the graph refactor is complete.

### Other

There are tons of ideas I have to interact with timeline, including a date filteronce the foundation completed.

## Getting Started

This app is built upon the latest create-react-app

To use this app locally you will need your own api key from [Twitter developers](https://developer.twitter.com/)

The app runs a local server on port 3001 and runs the app on 3000 and uses concurrently to launch the backend and front end together.

### .env

You will need to create a .env file with your api keys

CONSUMER_KEY=your_twitter_consumer_key<br>
CONSUMER_SECRET=your_twitter_consumer_secret

### `npm install`

Run "npm install" or "yarn" to build your node modules

### `npm start`

Npm start will start both the backend and the create react app

# This section is included with the Create React App 
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

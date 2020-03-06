# Project 3 Feedback

## Code Quality - Excelling

Criteria: Is the code well-formatted? Are variable and function names semantic and sensible? Is the code easy to read and understand?

### Strengths:

-   Code formatting looks excellent. Variables and functions are named semantically and sensibly. Code has a good flow and is easy to follow.
-   JavaScript is styled consistently throughout, with appropriate use of different cases in both React and Express. (Though I would probably use camel-casing for the controllers in `index.js` in the backend.)
-   Great use of comments in the React components! They're thorough, concise, and super helpful for someone new to this codebase. Also noticed some good commenting in the backend tests.
-   Excellent testing coverage for both frontend and backend.

### Areas for Growth:

-   For the most part, backend code is easy to follow, but for some more complex functions in the backend, going through and adding comments would be a good exercise and also improve the accessibility of your code.

## Technical Requirements - Excelling

Criteria: How does the project stack up to the requirements for this project? Are the developers making use of the material we've covered in a way that makes sense?

### Strengths:

-   Project meets technical requirements laid out in requirements, but also goes above and beyond, incorporating features like error handling and user auth and technologies such as bcrypt, lodash, React Hooks and Bootstrap. So proud of how you all went above and beyond and taught yourself some advanced dev tools!
-   Backend routes perform some complex operations and are written really well! Nice use of async/await keywords, and I see some great use of JavaScript.

### Areas for Growth:

-   A fun thing to try out would be using Heroku's free scheduler feature and keeping the server for the backend awake during US business hours. This makes the app seem much more professional, when the user isn't waiting 15+ seconds for the web dynos to wake up.
-   Not super important, but does `.catch(console.error)` from your controllers actually return errors? I always write that catch like this: `.catch(err => console.error(err))` because I understood that catch takes a callback function, and passes whatever is returned from previous promises to the console.error.

## Creativity and Interface - Performing

Criteria: Is the application easy to navigate? Does it work well in every major browser? Is it responsive? Does it incorporate modern UI Themes?

### Strengths:

-   The app is easy to navigate and super user-friendly. Calls to action are apparent, and it's pretty intuitive to use the application. The design is clean and modern, the logo is professionally-done, and even the color theme evokes the Oscars! Also love the custom favicon.
-   I love the creativity that went into creating the movie synopses ... especially love how some of them are software development-themed. I would definitely go see some of these movies!!!
-   Nice work incorporating mobile responsive design! Both the home and movie detail views look pretty good on a smaller screen.

### Areas for Growth

-   The movie detail page says 'Log in to rate this movie.' 'Log in' should be a link there that takes the user to the log in.
-   The home page is a bit text heavy. I would probably move the About section to another page, and have more empty/negative space and/or images there.

## Functionality - Performing

Criteria: Does the application work without errors or bugs? Does it present a complete app, where every feature is fully implemented in a way that makes sense?

### Strengths:

-   The application works really well, with no errors observed in the console or bugs observed. All features are fully implemented!
-   Really nice job executing user auth with error handling. I got good error messages when trying to sign up with a username/email that I'd already registered, even when I tried them with different combos of username/email.

### Areas for Growth:

-   A next-level feature could be validating account sign up credentials, likely with some use of regex. I signed up with an email address without an '@' symbol just to see if I could. Account settings and the option to delete an account could be cool too!

## Presentation - Performing

Criteria: Is there adequate documentation? Is the repository well-organized and free of clutter?

### Strengths:

-   Both frontend and backend repos look pretty good, with good folder organization and lack of clutter. Great job incorporating screenshots of your application to make the repos very engaging!
-   Nice job summarizing the development process and app description for both stacks.
-   For the most part, all team members have good distribution of commits on the repo; for any imbalances, I'm aware that y'all followed a 'mob programming' approach and probably worked on any of the committed the code together.
-   Evidence of good Git workflow including feature branching and merges.

### Areas for Growth:

-   The section that lists Problems & Difficulties is a good thought, but if you're not going to go into depth discussing the difficulties and what you did in order to solve them, I would leave those out in both the frontend and backend repos.
-   I would use the `code` ticks to surround the data models in the Planning & Wireframe section or take a screenshot of the JSON.
-   A really cool thing to incorporate would be a diagram of the Req-Res cycle and MVC architecture for the backend and a list of all the routes, kinda like we did with Hou for the Book-E lesson.
-   In your frontend repo, I would put the files in the `components` directory in their own separate folders ... so a folder for everything dealing with the `Home` component, `User` component, etc. This reduces clutter and helps your repo stay organized.
-   Commit messages should follow the following format: present tense singular verb followed by what was done: https://chris.beams.io/posts/git-commit/

## Hard Requirements - Complete:

**Back-End Requirements:**

-   [x] Your back-end must be a Node, Express, and Mongoose API with at least 1 non-user models. No associations are required.
-   [x] You must have CRUD functionality built throughout the app
-   [x] You must have a test for each of your routes.

**Front-End Requirements:**

-   [x] Your front-end must use React and leverage the backend API in the above requirements.
-   [x] You must communicate with the back-end API RESTfully to Create, Read, Update, and Destroy resources.
-   [x] You must use either CSS Grid or Flexbox along with media queries to make your app responsive across mobile, tablet, and desktop widths.
-   [x] You must have at least 4 components and at least one test for each of your components

**Project Requirements:**

-   [x] You must include a planning/ directory that sufficiently demonstrates your team's planning process.
-   [x] Both your front-end and back-end repos have a README that adequately documents the project.
-   [x] Every team member must have roughly the same number of individual commits in the commit history for your app (dividing responsibilities between different parts of the app is fine, but every team member must have commits in the project).
-   [x] Every team must follow a Git Workflow
-   [x] Every team member must speak for roughly the same amount of time during the group presentation

**Deployment Requirements:**

-   [x] Your back-end/API must be deployed to Heroku and your front-end must be deployed to GitHub pages or Heroku.

## Grade: Pass! 🎉🎉🎉😎😎😎

Congratulations on passing Project 3, and doing such an amazing job pulling together a really well-written application, without cashing a single help token. The code and concept are both fantastic. I also got the impression that this group worked really well together as a team, which is a huge achievement in and of itself. Thanks for being a tremendous squad, and an amazing group of devs! ❤️

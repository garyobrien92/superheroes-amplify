# Technical Challenges

- The [SuperApi](https://superheroapi.com/) Authencation was not working so could not get access token
- Used [RapidApi](https://superhero-api.p.rapidapi.com) instead which provided similar data and endpoints
- State management in apps is always a issue as the app grows I used [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) for this to make state management easier. Also it provides loading states and error states for a queries and more

# Assumptions

- As there was no design for this app alot of styling/design was kept very basic and layout was given lesser time than features in app.
- Ux was also not discussed so again i kept this very basic

  - Loading text display for api calls
  - Debounce input so api call is not done on every keystroke
  - When editing stats no validation is done with more time would have done this
  - For input when updating used text, would have had range sliders to make validation and updating easier

# Issues

- Using [RapidApi](https://superhero-api.p.rapidapi.com) some images do no load correctly when displaying for this we are limited by the api and what it returns

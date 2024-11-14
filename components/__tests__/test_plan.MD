## Testing Overview

## Manual Testing

Our team has plans to complete various manual tests for this project. For the beta release, our team focused on manual testing within the team. We ran through the various use cases, but especially the first one on our SDS. Whenever we found a bug, we logged it in GitHub issues. For the 1.0 release, our team will focus on user testing and take a more systematic approach, such as using a spreadsheet to note down all of the features to test.

## Unit Testing

The unit tests are written using jest and the react-native testing library. All of the unit tests are written in this folder. Currently, unit tests are located in EventList-test.tsx and EventDetails-test.tsx and test the EventCard, EventList, and EventDetails components. The EventDetails tests are still in development. The unit tests simply check if certain elements render when they are supposed to. To run the unit tests, type "npm run test."

## Integration Testing

The integration tests are written using jest and the react-native testing library and are mocked using jest and Supabase. Currently, the application has unit tests for the primary use case of our application, which is if the user wants to view an event. The tests are written in the List-test.tsx file. Since the backend calls are currently written to Supabase, our team will have to change the way we mock the data once we switch to the backend routes. To run the integration tests, the command is the same as for unit tests, which is "npm run test."


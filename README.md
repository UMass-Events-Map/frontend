# Welcome to UMass Events Map 👋

## 1.0 Release Introduction

To view our 1.0 Release, please navigate to the following [link](https://github.com/UMass-Events-Map/frontend/releases/tag/v1.1.0). This README.md contains additional information on testing and the use of design patterns.

## Product Overview

Welcome to the UMass Events Map, the best mobile application for finding upcoming events at the University of Massachusetts, Amherst. Our application serves as a centralized platform for students who wish to find events and organizers who wish to publish events. The application runs on both iOS and Android and with devices that support Android 5 and beyond and iPhone models with iOS 6 and beyond.

When opening the application, users are able to view a map of upcoming events on the UMass campus. They are not requried to sign in. There are various pins on the map that represent buildings on campus, and clicking on a pin provides a list of upcoming events at that location. There is also a list view, which allows the user to view a list of all the upcoming events on campus. 

The user is also able to login as an organizer. Organizers have the ability to upload, edit, and delete their own events.

## Build Process Instructions

### Prerequisites

1. Ensure you have Node.JS > v20.18.0 installed
2. Have Git installed
3. Have an iOS simulator or Android emulator
    * **iOS** 
      * Follow expo's official doc's for iOS Mac [Install XCode](https://docs.expo.dev/workflow/ios-simulator/)
    * **Android** 
      * Follow expo's official doc's for Android [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

### How to build and run

1. Clone the repository 
   ```bash 
   git clone https://github.com/UMass-Events-Map/frontend.git
   ```
2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```

4. After running `npx expo start` follow the on terminal instructions to start the emulators/simulators, press `a` for starting the Android emulator (ensure emulator is running first), and `i` for iOS simulator

## Testing

All of the tests are included in the @components/__tests__folder. Unit test files are labeled as such, while other files are integration tests such as login.tsx. More information on our testing strategy is located in the test_plan.MD file in the same folder. To run tests, run the following command:

```bash
   npm run test
   ```
To view the test coverage, please run:

```bash
   npm run test -- --coverage
   ```

Thus far, our team has reached 100% coverage for functions, statements, and branches for the EventList and EventCard components. We have also added integration tests for the login. In order to run the backend tests, please refer to the backend repository.

## Design Patterns

One design principle that we applied to our code is encapsulation. Encapsulation focuses on data hiding to ensure that the internal state is protected and only accessible in a controlled way. In our code, encapsulation is applied in various components where state variables are initialized and managed privately within components. This helps to limit direct manipulation from outside.

1. File and Line Reference: Line 16 in @components/BuildingPage.tsx

- BuildingPage component (lines where “events” and “error” are defined): These are encapsulated within the component’s scope using useState. Instead of exposing these states directly, only controlled access and updates are allowed through the component logic. 

- fetchEvents function in the BuildingPage component (applies within the useEffect): Here, the internal state “events” is updated only when data is successfully fetched, and “error” is set only when there's an error in fetching. This approach prevents unintended side effects, as external components cannot directly alter “events” or “error”.

Without encapsulation, exposing states like “events” or “error” could lead to unintended effects, such as overwriting data. This in turn might break how events are displayed. Encapsulation through “useState” and controlled access inside the component ensures that “events” can only be set and accessed within the logic defined by the component itself. For example, “setEvents” and “setError” handle updates, ensuring that updates happen in a proper way (only after successful data retrieval or upon encountering errors).


## Bug Tracking

This project will use GitHub issues to document existing bugs, issues, and missing features. To view the bug tracking history, navigate to the 'issues' tab in the top navigation bar. It should be next to the 'code' tab. There will be a list of various issues that can be filtered based on author, label, projects, milestones, and assignees. Each issue will have different identifiers. Notably, open issues will have a green circle, while closed issues should have a purple circle. If no issues are seen, enter 'is:issue' into the search bar above the list of items.

### Filtering

To filter by label, select the 'label' dropdown. There will be a list of options such as 'bug,' 'documentation,' and 'feature' that describe the general purpose of each issue. This will also be indicated in the naming convention. For example, 'Bug | Blank Login Screen' or 'Feature | Add Location Tracking.' There is also an option to filter the issues based on if they are closed or open, which is possible by selecting the 'Filters' dropdown at the top of the screen. 

The 'milestone' dropdown menu organizes each issue to the alpha, beta, and 1.0 releases. 

The 'assignee' dropdown filters the issues based on which developers should work on them.

To clear all search parameters, select the gray box with an 'X' symbol titled "Clear search query." 

### View Information

Right click on an item to view more information about each issue, such as its description. On the right side of the screen, there are widgets to assign developers to the issue, add labels, provide notifications, and assign the issue to a milestone. There is also a comment section to provide updates on progress.

### Open and Close Issues
In order to close an issue, add a comment and select 'close issue.' It is also possible to open and close multiple issues on the main issues page. This can be done by selecting multiple issues via the checkbox on the left, selecting 'Mark as,' and pressing 'open' or 'close.' If an issue is already closed, you can reopen the issue by clicking it and pressing "open issue."

To add an issue, select the green 'new issue' button. Add a title, description, the correct label (issue, feature, etc.), assignees, and milestone. Be sure to include the estimated timeline of completion in the issue description. Also be sure to designate each issue by priority through labels (high, medium, low). Afterwards, you should be good to go!

### NOTE: All frontend issues will be in the frontend repo, and all backend issues will be in the [backend repo](https://github.com/UMass-Events-Map/backend)

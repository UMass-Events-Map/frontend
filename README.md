# Welcome to UMass Events Map 👋

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


## Bug Tracking

This project will use GitHub issues to document existing bugs, issues, and missing features. To view the bug tracking history, navigate to the 'issues' tab in the top navigation bar. It should be next to the 'code' tab. There will be a list of various issues that can be filtered based on author, label, projects, milestones, and assignees. Each issue will have different identifiers. Notably, open issues will have a green circle, while closed issues should have a purple circle. If no issues are seen, enter 'is:issue' into the search bar above the list of items.

To filter by label, select the 'label' dropdown. There will be a list of options such as 'bug,' 'documentation,' and 'feature' that describe the general purpose of each issue. This will also be indicated in the naming convention. For example, 'Bug | Blank Login Screen' or 'Feature | Add Location Tracking.' There is also an option to filter the issues based on if they are closed or open, which is possible by selecting the 'Filters' dropdown at the top of the screen. 

The 'milestone' dropdown menu organizes each issue to the alpha, beta, and 1.0 releases. 

The 'assignee' dropdown filters the issues based on which developers should work on them.

To clear all search parameters, select the gray box with an 'X' symbol titled "Clear search query." Right click on an item to view more information about each issue, such as its description. On the right side of the screen, there are widgets to assign developers to the issue, add labels, provide notifications, and assign the issue to a milestone. There is also a comment section to provide updates on progress.
In order to close an issue, add a comment and select 'close issue.' It is also possible to open and close multiple issues on the main issues page. This can be done by selecting multiple issues via the checkbox on the left, selecting 'Mark as,' and pressing 'open' or 'close.'

To add an issue, select the green 'new issue' button. Add a title, description, the correct label (issue, feature, etc.), assignees, and milestone. Be sure to include the estimated timeline of completion in the issue description. Also be sure to designate each issue by priority through labels (high, medium, low). Afterwards, you should be good to go!

NOTE: All frontend issues will be in the frontend repo, and all backend issues will be in the backend repo

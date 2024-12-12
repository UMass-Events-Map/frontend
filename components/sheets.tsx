// Importing the `registerSheet` and `SheetDefinition` functionalities from 'react-native-actions-sheet'.
// `registerSheet` is used to register custom action sheets by giving them unique keys,
// while `SheetDefinition` is a type that helps define the expected props structure for each sheet.
import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

// Importing the custom React components (action sheets) that will be registered.
// `MapActionSheet` and `EventDetailSheet` are presumably custom UI components
// that are designed to be displayed as bottom sheets in the application.
import MapActionSheet from "./MapActionSheet";
import EventDetailSheet from "./EventDetailSheet";

// Importing the `Building` and `Event` interfaces, which define the shape of the data objects
// that the sheets expect to receive through their `payload` props.
import { Building, Event } from "@/constants/Interfaces";

// Registering the "mapaction-sheet" with `registerSheet`.
// This associates the key 'mapaction-sheet' with the `MapActionSheet` component.
// When this sheet is triggered to show, it will render the `MapActionSheet` component.
registerSheet("mapaction-sheet", MapActionSheet);

// Registering the "eventdetail-sheet" similarly. The 'eventdetail-sheet' key corresponds
// to the `EventDetailSheet` component.
registerSheet("eventdetail-sheet", EventDetailSheet);

// Extending the Sheets interface from 'react-native-actions-sheet' to include our newly registered sheets.
// This augmentation ensures that when we reference these sheets elsewhere in the code,
// the TypeScript compiler knows what props they require (in this case, the `payload` object).
declare module "react-native-actions-sheet" {
  interface Sheets {
    // For the 'mapaction-sheet', we define a `SheetDefinition` with a payload containing a `value` of type `Building`.
    // This means that when we open 'mapaction-sheet', we need to provide a payload that matches this structure.
    "mapaction-sheet": SheetDefinition<{
      payload: {
        value: Building;
      };
    }>;

    // For the 'eventdetail-sheet', we define a `SheetDefinition` with a payload containing a `value` of type `Event`.
    // Similarly, when this sheet is opened, we must provide an `Event` object in the payload.
    "eventdetail-sheet": SheetDefinition<{
      payload: {
        value: Event;
      };
    }>;
  }
}

// Exporting an empty object since we are only augmenting existing types and not exporting anything else.
// This ensures the file is recognized as a module and the declaration merging above takes effect.
export {};

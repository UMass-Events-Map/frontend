import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import MapActionSheet from './MapActionSheet';
import EventDetailSheet from './EventDetailSheet';
import { Building, Event } from '../constants/Interfaces';

registerSheet('mapaction-sheet', MapActionSheet);
registerSheet('eventdetail-sheet', EventDetailSheet);
 
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'mapaction-sheet': SheetDefinition<{
        payload: {
          value: Building;
        };
    }>;
    'eventdetail-sheet': SheetDefinition<{
        payload: {
          value: Event;
        };
    }>;
    
  }
}
 
export {};
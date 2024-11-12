import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import BuildingSheet from './BuildingSheet';
 
registerSheet('building-sheet', BuildingSheet);
 

type Building = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
};

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'building-sheet': SheetDefinition<{
        payload: {
            value: Building;
          };
    }>;
  }
}
 
export {};
import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import BuildingSheet from './BuildingSheet';
 
registerSheet('building-sheet', BuildingSheet);
 
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'building-sheet': SheetDefinition;
  }
}
 
export {};
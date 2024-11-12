import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import BuildingSheet from './BuildingSheet';
import { Building } from '@/constants/Interfaces';

registerSheet('building-sheet', BuildingSheet);
 
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
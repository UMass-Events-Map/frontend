import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import EventList, { EventCard } from "@/components/EventList";
import { Event, Building } from "@/constants/Interfaces";
import dayjs from 'dayjs';
import '@testing-library/jest-native/extend-expect';

const currentDate = dayjs();

// Define mock building
const building_1: Building = {
  id: "00000000-0000-0000-0000-0000000000",
  name: "Fine Arts Center",
  latitude: 42.388236,
  longitude: -72.525936,
  thumbnail: "https://citypointpartners.com/wp-content/uploads/UMA_FAC_Retouched-1920x912.jpg",
  address: "151 Presidents Dr, Amherst, MA 01003",
  created_at: "2024-11-03 18:05:44.735161",
  updated_at: "2024-11-03 18:05:44.735161",
  events: [],
};

// Define mock events
const sample_event_1: Event = {
  id: "00000000-0000-0000-0000-0000000000",
  name: "Sample Event #1",
  description: "This is a description",
  date: "2024-11-14",
  time: "16:00:00",
  building_id: "00000000-0000-0000-0000-0000000000",
  room_number: "100",
  organization_id: "00000000-0000-0000-0000-0000000000",
  thumbnail: "https://hips.hearstapps.com/hmg-prod/images/art-basel-miami-beach-eric-firestone-1653334339.jpg?crop=1xw:1xh;center,top&resize=980:*",
  attendance: 100,
  created_at: "2024-11-14 02:14:09.526389",
  updated_at: "2024-11-14 02:14:09.526389",
  building: building_1,
};

const sample_event_2: Event = {
  id: "00000000-0000-0000-0000-0000000000",
  name: "Sample Event #2",
  description: "This is a description",
  date: currentDate.format('YYYY-MM-DD'),
  time: currentDate.format('HH:mm:'),
  building_id: "00000000-0000-0000-0000-0000000000",
  room_number: "100",
  organization_id: "00000000-0000-0000-0000-0000000000",
  thumbnail: "https://hips.hearstapps.com/hmg-prod/images/art-basel-miami-beach-eric-firestone-1653334339.jpg?crop=1xw:1xh;center,top&resize=980:*",
  attendance: 100,
  created_at: "2024-11-14 02:14:09.526389",
  updated_at: "2024-11-14 02:14:09.526389",
  building: building_1,
};

// Mock the react fonts
jest.mock('expo-font', () => ({
  isLoaded: jest.fn().mockReturnValue(true),
}));

jest.mock('react-native-actions-sheet', () => ({
    SheetManager: {
      show: jest.fn(),
    },
    FlatList: jest.requireActual('react-native').FlatList,
  }));

jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    RN.FlatList = ({ testID, data, renderItem }) => {
      return (
        <RN.View testID={testID}>
          {data.map((item) => renderItem({ item }))}
        </RN.View>
      );
    };
    return RN;
  });
 

describe('EventList', () => {
  it('The EventList component renders correctly with null input', () => {
    // Render the component
    const input_events = null;

    const { getByTestId } = render(<EventList events={input_events} />);

    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('The EventList component renders correctly with empty list input', () => {
    // Render the component
    const input_events: Event[] = [];

    const { getByTestId } = render(<EventList events={input_events} />);

    expect(getByTestId('EmptyListView')).toBeTruthy();
  });

  it('The EventList component renders correctly with some list input', () => {
    const input_events: Event[] = [sample_event_1, sample_event_2];
  
    const { getByTestId } = render(<EventList events={input_events} />);
  
    expect(getByTestId('ListView')).toBeTruthy();
  });
});

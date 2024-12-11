import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EventCard } from "@/components/EventList";
import { Event, Building } from "@/constants/Interfaces";
import { SheetManager } from "react-native-actions-sheet";
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

// Mock the sheet manager show method
jest.mock('react-native-actions-sheet', () => ({
  SheetManager: {
    show: jest.fn(),
  },
}));

describe('EventCard', () => {
  it('The EventCard component renders correctly', () => {
    // Render the component
    const input_event = sample_event_1;
    const { getByText } = render(<EventCard event={input_event} />);

    // Check if event name is rendered
    expect(getByText(input_event.name)).toBeTruthy();

    // Check if building name and room number are rendered
    expect(getByText(input_event.building?.name + " • " + input_event.room_number)).toBeTruthy();
  });

  it('Given an event that is upcoming soon, the EventCard component renders with a red background', () => {
    const input_event = sample_event_2;
    console.log(input_event.date);

    // Render the component
    const { getByTestId } = render(<EventCard event={input_event} />);

    // Query the TouchableHighlight by testID
    const touchableHighlight = getByTestId('eventCardTouchable');

    // Check if the background color is #FFB5B3
    expect(touchableHighlight).toHaveStyle({ backgroundColor: '#FFB5B3' });
  });

  it('Given an event that is not upcoming soon, the EventCard component renders with a white background', () => {
    const input_event = sample_event_1;

    // Render the component
    const { getByTestId } = render(<EventCard event={input_event} />);

    // Query the TouchableHighlight by testID
    const touchableHighlight = getByTestId('eventCardTouchable');

    // Check if the background color is #FFB5B3
    expect(touchableHighlight).toHaveStyle({ backgroundColor: '#FAFAFA' });
  });

  it('opens the event details sheet when the event card is pressed', () => {
    const input_event = sample_event_1;

    const { getByTestId } = render(<EventCard event={input_event} />);
    
    const touchableHighlight = getByTestId('eventCardTouchable');
    
    // Simulate pressing the button
    fireEvent.press(touchableHighlight);
    
    // Check if the BottomSheet open method was called
    expect(SheetManager.show).toHaveBeenCalledWith('eventdetail-sheet', {
      payload: { value: sample_event_1 },
    });
  });
});

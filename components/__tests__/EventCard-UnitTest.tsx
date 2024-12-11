import React from 'react';
import { render } from '@testing-library/react-native';
import { EventCard } from "@/components/EventList";
import { Event, Building } from "@/constants/Interfaces";

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

// Define mock event
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

describe('EventCard', () => {
  it('renders correctly', () => {
    // Render the component
    const { getByText } = render(<EventCard event={sample_event_1} />);

    // Check if event name is rendered
    expect(getByText("Sample Event #1")).toBeTruthy();

    // Check if building name and room number are rendered
    expect(getByText("Fine Arts Center • 100")).toBeTruthy();
  });
});

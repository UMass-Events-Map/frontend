import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import List from '@/app/(tabs)/(list)/list';
import fetchMock from "jest-fetch-mock";
import { Event } from "@/constants/Interfaces";
import '@testing-library/jest-native/extend-expect';


const event1: Event = {
   id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   name: 'Sample Event #1',
   description: "Curse you Perry the Platypus. Curse you Perry the Platypus. Curse you Persry the Platypus. Curse you Perry the Platypus.",
   date: '2024-11-20',
   time: '14:30:00',
   room_number: '21',
   thumbnail: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
   building_id: "8620cbb2-7da9-48fd-a0fe-883ddf9e1b72",
   organization_id: "6a0583c1-dc38-44e0-8a7a-9742ea90b61e",
   attendance: 22
 };
  const event2: Event = {
   id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   name: 'Sample Event #2',
   description: "I LOVE 320! I LOVE SOFTWARE ENGINEERING! DESIGN PATTERNS ARE AWESOME! I LOVE DOCUMENTATION! I LOVE FOLLOWING GOOD PRACTICES! I LOVE AVOIDING CODE DUPLICATION",
   date: '2025-05-50',
   time: '25:30:00',
   room_number: '21',
   thumbnail: 'https://localist-images.azureedge.net/photos/47688407230631/huge/2b6146a881004adfcd5fb447f9fad4d4ff1a2d40.jpg',
   building_id: "66d5593f-092d-48db-b5f3-4b785c779dcf",
   organization_id: "6a0583c1-dc38-44e0-8a7a-9742ea90b61e",
   attendance: 22
 };
  const event3: Event = {
   id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   name: 'Sample Event #3',
   description: "Curse you Perry the Platypus. Curse you Perry the Platypus. Curse you Perry the Platypus. Curse you Perry the Platypus.",
   date: '2025-05-30',
   time: '14:30:00',
   room_number: '21',
   thumbnail: 'https://www.shutterstock.com/image-photo/sea-otter-enhydra-lutris-600nw-2398038403.jpg',
   building_id: "66d5593f-092d-48db-b5f3-4b785c779dcf",
   organization_id: "6a0583c1-dc38-44e0-8a7a-9742ea90b61e",
   attendance: 22
 };

 const mockEvents: Event[] = [event1, event3];

// Mock Supabase module
jest.mock('@/utils/supabase', () => ({
    supabase: {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: [event1, event3], error: null }),
      }),
    },
  }));


  describe('List Component', () => {
    beforeAll(() => {
      fetchMock.enableMocks();  // Enable fetchMock globally
    });
  
    beforeEach(() => {
      fetchMock.resetMocks();  // Reset mocks before each test
    });
  
    it('renders correct events', async () => {
      render(<List />);
  
      // Check if EventList component is rendered with events
      await waitFor(() => {
        expect(screen.getByText('Sample Event #1')).toBeTruthy();
        expect(screen.getByText('Sample Event #3')).toBeTruthy();
      });
    });
  });
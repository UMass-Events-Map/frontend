import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import EventList, { EventCard } from '@/components/EventList';
import { SheetManager } from 'react-native-actions-sheet';
import { Event, EventListProps } from "@/constants/Interfaces";

jest.mock('react-native-actions-sheet', () => ({
  SheetManager: { show: jest.fn() },
}));

console.log(EventList);
console.log(EventCard);

const sampleEvent: Event = {
    id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    name: 'Sample Event #1',
    description: "Curse you Perry the Platypus. Curse you Perry the Platypus. Curse you Perry the Platypus. Curse you Perry the Platypus.",
    date: '2025-05-30',
    time: '14:30:00',
    room_number: '21',
    thumbnail: 'https://localist-images.azureedge.net/photos/47688407230631/huge/2b6146a881004adfcd5fb447f9fad4d4ff1a2d40.jpg',
    building_id: "66d5593f-092d-48db-b5f3-4b785c779dcf",
    organization_id: "",
    attendance: 22
};

describe('EventList Component', () => {
  it('renders an ActivityIndicator when events is null', () => {
    render(<EventList events={null} />);
    expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('displays "No events available" message when events is an empty array', () => {
    render(<EventList events={[]} />);
    expect(screen.getByText('No events available')).toBeTruthy();
  });

  it('renders a list of events when events are provided', () => {
    const test_list: Event[] = [sampleEvent];
    render(<EventList events={test_list} />);
    expect(screen.getByText(sampleEvent.name)).toBeTruthy();
  });
});

describe('EventCard Component', () => {
  it('renders event details correctly', () => {
    render(<EventCard {...sampleEvent} />);

    expect(screen.getByText(sampleEvent.name)).toBeTruthy();
    expect(screen.getByText('Wed, Nov 20, 2024')).toBeTruthy(); // formatted date
    expect(screen.getByText(sampleEvent.time)).toBeTruthy();
    expect(screen.getByText(`Student Union • ${sampleEvent.room_number}`)).toBeTruthy();
    expect(screen.getByTestId('eventImage').props.source.uri).toBe(sampleEvent.thumbnail);
  });

  it('calls SheetManager.show with event details when pressed', () => {
    render(<EventCard {...sampleEvent} />);

    fireEvent.press(screen.getByTestId('eventCardTouchable'));

    expect(SheetManager.show).toHaveBeenCalledWith('eventdetail-sheet', {
      payload: { value: sampleEvent },
    });
  });
});
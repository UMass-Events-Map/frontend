
export type Building = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
};

export type BuildingProp = {
    buildings: Building[] | null;
};


export type Event = {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    room_number: string;
    thumbnail: string;
    building_id: string;
    organization_id: string;
    attendance: string;
  };
  
export type EventListProps = {
    events: Event[] | null;
  };

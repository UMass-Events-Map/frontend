export type Building = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    thumbnail: string;
    address: string;
    created_at?: string;
    updated_at?: string;
    events?: any[];
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
    building_id: string;
    room_number: string;
    organization_id?: string;
    thumbnail: string;
    attendance: number;
    created_at?: string; 
    updated_at?: string;
    building?: Building;
    organization?: object;
    event_logs?: any[];
  }

export type EventListProps = {
    events: Event[] | null;
};

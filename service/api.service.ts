import { Building, Event } from "@/constants/Interfaces";

export class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = String(process.env.EXPO_PUBLIC_PACKAGE_NAME);
    }

    async fetchBuildings(): Promise<Building[]> {
        const response = await fetch(`${this.baseUrl}/buildings?limit=${20}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.status === 200 || 304) {
            const data = await response.json();
            // await new Promise(resolve => setTimeout(resolve, 1000));
            return data.data;
  
          } else {
            console.error("Error fetching buildings");
            return []
          }
    }

    async fetchEventByBuildingId(id: string): Promise<Event[]> {
        const response = await fetch(
            `${this.baseUrl}/buildings/${id}/events`,
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            }
        );

        if (response.status === 200 || 304) {
            const data = await response.json();
            return data;
        } else {
            console.error("Error fetching events by building id");
            return [];
        }
    }
}
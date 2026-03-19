export interface PowerPlant {
  [city: string]: {
    is_active: boolean;
    power: string;
    code: string;
  };
}
export interface PowerPlantsResponse {
  power_plants: PowerPlant;
}

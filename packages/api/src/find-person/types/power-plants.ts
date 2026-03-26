import { z } from "zod";
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

export const powerPlantsWithLocationsSchema = z.object({
  power_plants: z.record(
    z.string(),
    z.object({
      is_active: z.boolean(),
      power: z.string(),
      code: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    }),
  ),
});

export type PowerPlantsWithLocations = z.infer<
  typeof powerPlantsWithLocationsSchema
>;
export interface PowerPlantsWithLocationsResponse {
  power_plants: PowerPlantsWithLocations;
}

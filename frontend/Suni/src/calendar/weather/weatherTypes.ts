//export type WeatherCondition = "sunny" | "cloudy" | "rainy" | "snowy" | "stormy";

//idea:
//set to time range
//Morning:
//Midday:
//Afternoon:
//Night: 
//^^ These values don't change(KEEP IN MIND)
//Set weather for each of these times^^
//Weather Types:
// Clear
// Cloudy
// light? Rain / Ts?
// Thunderstorm / heavy
//snow
//set backgrounds based on ^^
//each time has bg image for each of these ( or just day / night versions)

// export type Morning = {
//   id: number;
//   weather: string;
// };

// export type Midday = {
//   id: number;
//   weather: string;

// };

// export type Afternoon = {
//   id: number;
//   weather: string;
// };

// export type Night  = {
//   id: number;
//   weather: string;
// };


// export type WeatherEventItem = {
//   start: Date;
//   end: Date;
//   data: { morning?: Morning; midday?: Midday; afternoon?: Afternoon; night?: Night; };
//   isDraggable?: boolean;
// };


// export type WeatherEventItem = {
//   id: number;
//   title: string;
//   start: Date;
//   end: Date;
//   weather: "Clear" | "Cloudy" | "Rain" | "Thunderstorm" | "Snow";
// };

export type Morning = {
  temperature: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Rainy';
};

export type Midday = {
  temperature: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Rainy' | 'Stormy';
};

export type Afternoon = {
  temperature: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Rainy' | 'Stormy';
};

export type Night = {
  temperature: number;
  condition: 'Clear' | 'Partly Cloudy' | 'Cloudy' | 'Rainy';
};

export type WeatherEventItem = {
  start: Date;
  end: Date;
  data: { morning?: Morning; midday?: Midday; afternoon?: Afternoon; night?: Night; };
  isDraggable?: boolean;
}



// export type WeatherEventItem = {
//   start: Date;
//   end: Date;
//   title: string;
//   weather: WeatherCondition;
//   temperature?: number;
//   timeOfDay: "morning" | "afternoon" | "evening" | "night"; // this is for time-based image logic
//   imageUrl: string; // URL for the background image
//   isDraggable?: boolean;
// };


// export type BackgroundEventItem = {
//   start: Date;
//   end: Date;
//   title: string;
//   resourceID?: number;
//   data: {
    
//   }

// }

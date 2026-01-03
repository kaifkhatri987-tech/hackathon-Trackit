export enum UserRole {
  PASSENGER = 'PASSENGER',
  CONDUCTOR = 'CONDUCTOR',
  NONE = 'NONE'
}

export enum NavigationTab {
  HOME = 'HOME',
  SCHEDULE = 'SCHEDULE',
  PROFILE = 'PROFILE'
}

export interface BusLocation {
  id: string;
  lat: number;
  lng: number;
  lastUpdated: number;
  routeNumber: string;
}

export interface BusRoute {
  id: string;
  name: string;
  type: 'BRT' | 'City';
  timing: string;
  origin: string;
  destination: string;
  description: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  email: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email?: string;
  profileImage?: string;
  themeColor?: string;
  assignedRoute?: string;
}
// ── Shared types & mock data ────────────────────────────────────
// Based on class diagram: User, Ride, Location, Booking, Payment, RideStatus, BookingStatus, PaymentStatus

export type RideStatus = "scheduled" | "in-progress" | "completed" | "cancelled"
export type BookingStatus = "confirmed" | "pending" | "cancelled"
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded"

export interface Location {
  locationId: string
  name: string
  address: string
  lat?: number
  lng?: number
}

export interface User {
  userId: string
  name: string
  email: string
  phone: string
  rating: number
  verifiedStatus: boolean
  avatar: string
}

export interface Ride {
  id: string
  from: string
  to: string
  date: string
  time: string
  driver: string
  driverRating?: number
  seats: number
  seatsAvailable: number
  price: string
  riders: { imageUrl: string; profileUrl: string }[]
  isPopular?: boolean
  status?: RideStatus
  tags?: string[]
}

export interface TrainRoute {
  id: string
  trainNumber: string
  trainName: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  date: string
  classes: { name: string; price: string; available: number }[]
  stops: string[]
  status: "on-time" | "delayed" | "cancelled"
  delay?: string
}

export interface BusRoute {
  id: string
  operator: string
  busType: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  date: string
  price: string
  seatsAvailable: number
  totalSeats: number
  amenities: string[]
  rating: number
  status: "on-time" | "delayed" | "cancelled"
}

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  from: string
  fromCode: string
  to: string
  toCode: string
  departure: string
  arrival: string
  duration: string
  date: string
  price: string
  class: string
  stops: number
  stopLocations?: string[]
  baggage: string
  status: "on-time" | "delayed" | "cancelled"
}

// ── Popular locations (for autocomplete) ────────────────────────

export const LOCATIONS: Location[] = [
  { locationId: "loc-1", name: "IIIT Kottayam", address: "Valavoor P.O, Pala, Kottayam, Kerala 686635", lat: 9.5859, lng: 76.6214 },
  { locationId: "loc-2", name: "Cochin International Airport", address: "Airport Road, Nedumbassery, Kochi, Kerala 683111", lat: 10.1520, lng: 76.3915 },
  { locationId: "loc-3", name: "Kottayam Railway Station", address: "TB Road, Kottayam, Kerala 686001", lat: 9.5916, lng: 76.5222 },
  { locationId: "loc-4", name: "Ernakulam Junction", address: "Ernakulam South, Kochi, Kerala 682016", lat: 9.9685, lng: 76.2893 },
  { locationId: "loc-5", name: "Ernakulam Town", address: "Ernakulam North, Kochi, Kerala 682018", lat: 9.9816, lng: 76.2999 },
  { locationId: "loc-6", name: "Trivandrum Central", address: "Thampanoor, Thiruvananthapuram, Kerala 695001", lat: 8.4897, lng: 76.9501 },
  { locationId: "loc-7", name: "Bangalore City Junction", address: "Majestic, Bangalore, Karnataka 560023", lat: 12.9791, lng: 77.5713 },
  { locationId: "loc-8", name: "Bangalore Airport (KIA)", address: "Kempegowda Int'l Airport, Bengaluru, Karnataka 560300", lat: 13.1989, lng: 77.7068 },
  { locationId: "loc-9", name: "Munnar", address: "Munnar, Idukki, Kerala 685612", lat: 10.0892, lng: 77.0597 },
  { locationId: "loc-10", name: "Pala Town", address: "Pala, Kottayam, Kerala 686575", lat: 9.7120, lng: 76.6830 },
  { locationId: "loc-11", name: "Ettumanoor", address: "Ettumanoor, Kottayam, Kerala 686631", lat: 9.6700, lng: 76.5600 },
  { locationId: "loc-12", name: "Thodupuzha", address: "Thodupuzha, Idukki, Kerala 685584", lat: 9.8934, lng: 76.7178 },
  { locationId: "loc-13", name: "Changanassery", address: "Changanassery, Kottayam, Kerala 686101", lat: 9.4442, lng: 76.5361 },
  { locationId: "loc-14", name: "Kumarakom", address: "Kumarakom, Kottayam, Kerala 686563", lat: 9.6158, lng: 76.4309 },
  { locationId: "loc-15", name: "Thekkady", address: "Thekkady, Idukki, Kerala 685536", lat: 9.6040, lng: 77.1615 },
  { locationId: "loc-16", name: "Chennai Central", address: "Park Town, Chennai, Tamil Nadu 600003", lat: 13.0836, lng: 80.2750 },
  { locationId: "loc-17", name: "Chennai Airport (MAA)", address: "Tirusulam, Chennai, Tamil Nadu 600027", lat: 12.9941, lng: 80.1709 },
  { locationId: "loc-18", name: "Coimbatore Junction", address: "Coimbatore, Tamil Nadu 641001", lat: 10.9953, lng: 76.9667 },
  { locationId: "loc-19", name: "Madurai Junction", address: "Madurai, Tamil Nadu 625001", lat: 9.9193, lng: 78.1215 },
  { locationId: "loc-20", name: "Thrissur", address: "Thrissur, Kerala 680001", lat: 10.5276, lng: 76.2144 },
  { locationId: "loc-21", name: "Kozhikode (Calicut)", address: "Kozhikode, Kerala 673001", lat: 11.2588, lng: 75.7804 },
  { locationId: "loc-22", name: "Alleppey (Alappuzha)", address: "Alappuzha, Kerala 688001", lat: 9.4981, lng: 76.3388 },
  { locationId: "loc-23", name: "Hyderabad (Secunderabad)", address: "Secunderabad, Telangana 500003", lat: 17.4344, lng: 78.5013 },
  { locationId: "loc-24", name: "Mangalore Junction", address: "Mangalore, Karnataka 575001", lat: 12.8625, lng: 74.8324 },
  { locationId: "loc-25", name: "Goa (Madgaon)", address: "Madgaon, Goa 403601", lat: 15.2993, lng: 74.1240 },
]

// ── Mock Rides ──────────────────────────────────────────────────

export const MOCK_RIDES: Ride[] = [
  {
    id: "r-1",
    from: "IIIT Kottayam",
    to: "Cochin International Airport",
    date: "Mar 12",
    time: "6:30 AM",
    driver: "Arjun K.",
    driverRating: 4.8,
    seats: 4,
    seatsAvailable: 2,
    price: "₹350",
    isPopular: true,
    tags: ["airport", "early-morning"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=1", profileUrl: "#" },
      { imageUrl: "https://i.pravatar.cc/40?img=2", profileUrl: "#" },
    ],
  },
  {
    id: "r-2",
    from: "IIIT Kottayam",
    to: "Kottayam Railway Station",
    date: "Mar 12",
    time: "8:00 AM",
    driver: "Sneha R.",
    driverRating: 4.9,
    seats: 3,
    seatsAvailable: 1,
    price: "₹120",
    isPopular: true,
    tags: ["station", "quick"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=3", profileUrl: "#" },
      { imageUrl: "https://i.pravatar.cc/40?img=4", profileUrl: "#" },
    ],
  },
  {
    id: "r-3",
    from: "IIIT Kottayam",
    to: "Trivandrum Central",
    date: "Mar 13",
    time: "7:00 AM",
    driver: "Nikhil S.",
    driverRating: 4.5,
    seats: 4,
    seatsAvailable: 3,
    price: "₹500",
    tags: ["long-distance"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=5", profileUrl: "#" },
    ],
  },
  {
    id: "r-4",
    from: "IIIT Kottayam",
    to: "Ernakulam Junction",
    date: "Mar 14",
    time: "9:30 AM",
    driver: "Priya M.",
    driverRating: 4.7,
    seats: 4,
    seatsAvailable: 2,
    price: "₹280",
    tags: ["station"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=6", profileUrl: "#" },
      { imageUrl: "https://i.pravatar.cc/40?img=7", profileUrl: "#" },
    ],
  },
  {
    id: "r-5",
    from: "IIIT Kottayam",
    to: "Bangalore City Junction",
    date: "Mar 15",
    time: "5:00 AM",
    driver: "Rahul D.",
    driverRating: 4.6,
    seats: 4,
    seatsAvailable: 3,
    price: "₹1200",
    isPopular: true,
    tags: ["interstate", "long-distance"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=8", profileUrl: "#" },
    ],
  },
  {
    id: "r-6",
    from: "IIIT Kottayam",
    to: "Munnar",
    date: "Mar 16",
    time: "6:00 AM",
    driver: "Aisha N.",
    driverRating: 4.3,
    seats: 4,
    seatsAvailable: 4,
    price: "₹400",
    tags: ["hill-station", "weekend"],
    riders: [],
  },
  {
    id: "r-7",
    from: "IIIT Kottayam",
    to: "Pala Town",
    date: "Mar 12",
    time: "10:00 AM",
    driver: "Ravi V.",
    driverRating: 4.4,
    seats: 3,
    seatsAvailable: 2,
    price: "₹60",
    tags: ["nearby", "quick"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=9", profileUrl: "#" },
    ],
  },
  {
    id: "r-8",
    from: "IIIT Kottayam",
    to: "Thekkady",
    date: "Mar 17",
    time: "5:30 AM",
    driver: "Meera J.",
    driverRating: 4.8,
    seats: 4,
    seatsAvailable: 3,
    price: "₹550",
    isPopular: true,
    tags: ["weekend", "nature"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=10", profileUrl: "#" },
    ],
  },
  {
    id: "r-9",
    from: "IIIT Kottayam",
    to: "Changanassery",
    date: "Mar 13",
    time: "3:00 PM",
    driver: "Deepak S.",
    driverRating: 4.2,
    seats: 4,
    seatsAvailable: 3,
    price: "₹80",
    tags: ["nearby"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=11", profileUrl: "#" },
    ],
  },
  {
    id: "r-10",
    from: "IIIT Kottayam",
    to: "Chennai Central",
    date: "Mar 18",
    time: "4:00 AM",
    driver: "Vikram T.",
    driverRating: 4.6,
    seats: 4,
    seatsAvailable: 2,
    price: "₹1800",
    tags: ["interstate", "long-distance"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=12", profileUrl: "#" },
      { imageUrl: "https://i.pravatar.cc/40?img=13", profileUrl: "#" },
    ],
  },
  {
    id: "r-11",
    from: "Ernakulam Junction",
    to: "IIIT Kottayam",
    date: "Mar 14",
    time: "6:00 PM",
    driver: "Lakshmi P.",
    driverRating: 4.9,
    seats: 3,
    seatsAvailable: 2,
    price: "₹280",
    tags: ["return", "evening"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=14", profileUrl: "#" },
    ],
  },
  {
    id: "r-12",
    from: "Cochin International Airport",
    to: "IIIT Kottayam",
    date: "Mar 15",
    time: "11:00 PM",
    driver: "Karthik R.",
    driverRating: 4.7,
    seats: 4,
    seatsAvailable: 3,
    price: "₹380",
    tags: ["airport", "return", "late-night"],
    riders: [
      { imageUrl: "https://i.pravatar.cc/40?img=15", profileUrl: "#" },
    ],
  },
]

// ── Mock Train Routes ───────────────────────────────────────────

export const MOCK_TRAINS: TrainRoute[] = [
  {
    id: "t-1",
    trainNumber: "12625",
    trainName: "Kerala Express",
    from: "Trivandrum Central",
    to: "New Delhi",
    departure: "11:15 AM",
    arrival: "7:45 AM +2",
    duration: "44h 30m",
    date: "Daily",
    classes: [
      { name: "SL", price: "₹725", available: 42 },
      { name: "3A", price: "₹1,920", available: 18 },
      { name: "2A", price: "₹2,780", available: 6 },
      { name: "1A", price: "₹4,690", available: 2 },
    ],
    stops: ["Kottayam", "Ernakulam Jn", "Thrissur", "Palakkad Jn", "Coimbatore Jn", "Erode Jn", "Salem Jn", "Katpadi Jn", "Renigunta Jn", "Nagpur", "Bhopal Jn", "Jhansi Jn", "Agra Cantt", "New Delhi"],
    status: "on-time",
  },
  {
    id: "t-2",
    trainNumber: "12076",
    trainName: "Jan Shatabdi Exp",
    from: "Kottayam",
    to: "Ernakulam Junction",
    departure: "6:25 AM",
    arrival: "8:30 AM",
    duration: "2h 05m",
    date: "Daily",
    classes: [
      { name: "CC", price: "₹225", available: 65 },
      { name: "2S", price: "₹100", available: 120 },
    ],
    stops: ["Ettumanoor", "Chingavanam", "Tiruvalla", "Chengannur", "Ernakulam Jn"],
    status: "on-time",
  },
  {
    id: "t-3",
    trainNumber: "16301",
    trainName: "Vanchinad Express",
    from: "Ernakulam Junction",
    to: "Trivandrum Central",
    departure: "2:00 PM",
    arrival: "6:25 PM",
    duration: "4h 25m",
    date: "Daily",
    classes: [
      { name: "SL", price: "₹185", available: 35 },
      { name: "3A", price: "₹520", available: 22 },
      { name: "2A", price: "₹740", available: 8 },
    ],
    stops: ["Kottayam", "Changanassery", "Tiruvalla", "Chengannur", "Kayamkulam Jn", "Kollam Jn", "Trivandrum Central"],
    status: "on-time",
  },
  {
    id: "t-4",
    trainNumber: "12677",
    trainName: "Ernakulam-Bangalore Intercity",
    from: "Ernakulam Junction",
    to: "Bangalore City Junction",
    departure: "6:15 AM",
    arrival: "5:00 PM",
    duration: "10h 45m",
    date: "Daily",
    classes: [
      { name: "CC", price: "₹615", available: 40 },
      { name: "3A", price: "₹1,050", available: 28 },
      { name: "2A", price: "₹1,490", available: 10 },
    ],
    stops: ["Thrissur", "Palakkad Jn", "Coimbatore Jn", "Salem Jn", "Krishnarajapuram", "Bangalore City Junction"],
    status: "on-time",
  },
  {
    id: "t-5",
    trainNumber: "22113",
    trainName: "Kochuveli-Mumbai LTT SF",
    from: "Kochuveli",
    to: "Mumbai LTT",
    departure: "10:30 AM",
    arrival: "3:40 PM +1",
    duration: "29h 10m",
    date: "Wed, Fri, Sun",
    classes: [
      { name: "SL", price: "₹645", available: 55 },
      { name: "3A", price: "₹1,690", available: 20 },
      { name: "2A", price: "₹2,430", available: 4 },
    ],
    stops: ["Kollam Jn", "Ernakulam Jn", "Thrissur", "Kozhikode", "Mangalore Jn", "Madgaon", "Ratnagiri", "Panvel", "Mumbai LTT"],
    status: "delayed",
    delay: "45 min",
  },
  {
    id: "t-6",
    trainNumber: "16525",
    trainName: "Kottayam-Bangalore Express",
    from: "Kottayam",
    to: "Bangalore City Junction",
    departure: "7:30 PM",
    arrival: "6:15 AM +1",
    duration: "10h 45m",
    date: "Daily",
    classes: [
      { name: "SL", price: "₹385", available: 48 },
      { name: "3A", price: "₹1,020", available: 15 },
      { name: "2A", price: "₹1,450", available: 6 },
    ],
    stops: ["Ernakulam Jn", "Thrissur", "Palakkad Jn", "Coimbatore Jn", "Bangalore City Junction"],
    status: "on-time",
  },
  {
    id: "t-7",
    trainNumber: "12695",
    trainName: "Trivandrum-Chennai SF Express",
    from: "Trivandrum Central",
    to: "Chennai Central",
    departure: "3:00 PM",
    arrival: "5:45 AM +1",
    duration: "14h 45m",
    date: "Daily",
    classes: [
      { name: "SL", price: "₹445", available: 32 },
      { name: "3A", price: "₹1,180", available: 16 },
      { name: "2A", price: "₹1,690", available: 8 },
      { name: "1A", price: "₹2,840", available: 3 },
    ],
    stops: ["Kottayam", "Ernakulam Jn", "Thrissur", "Palakkad Jn", "Coimbatore Jn", "Erode Jn", "Salem Jn", "Katpadi Jn", "Chennai Central"],
    status: "on-time",
  },
  {
    id: "t-8",
    trainNumber: "16347",
    trainName: "Mangalore-Trivandrum Express",
    from: "Mangalore Junction",
    to: "Trivandrum Central",
    departure: "6:00 PM",
    arrival: "8:30 AM +1",
    duration: "14h 30m",
    date: "Daily",
    classes: [
      { name: "SL", price: "₹410", available: 38 },
      { name: "3A", price: "₹1,080", available: 12 },
    ],
    stops: ["Kozhikode", "Thrissur", "Ernakulam Jn", "Kottayam", "Kollam Jn", "Trivandrum Central"],
    status: "on-time",
  },
]

// ── Mock Bus Routes ─────────────────────────────────────────────

export const MOCK_BUSES: BusRoute[] = [
  {
    id: "b-1",
    operator: "KSRTC Super Fast",
    busType: "Super Fast",
    from: "Kottayam KSRTC",
    to: "Ernakulam South",
    departure: "6:00 AM",
    arrival: "8:15 AM",
    duration: "2h 15m",
    date: "Daily",
    price: "₹120",
    seatsAvailable: 32,
    totalSeats: 50,
    amenities: ["AC", "GPS Tracking"],
    rating: 4.2,
    status: "on-time",
  },
  {
    id: "b-2",
    operator: "KSRTC Volvo A/C",
    busType: "Volvo Multi-Axle A/C",
    from: "Kottayam KSRTC",
    to: "Trivandrum Central Bus Stand",
    departure: "7:00 AM",
    arrival: "11:30 AM",
    duration: "4h 30m",
    date: "Daily",
    price: "₹340",
    seatsAvailable: 18,
    totalSeats: 45,
    amenities: ["AC", "GPS Tracking", "Charging Port", "Pushback Seats"],
    rating: 4.5,
    status: "on-time",
  },
  {
    id: "b-3",
    operator: "Kallada Travels",
    busType: "Sleeper A/C",
    from: "Kottayam Private Bus Stand",
    to: "Bangalore Majestic",
    departure: "8:00 PM",
    arrival: "6:30 AM +1",
    duration: "10h 30m",
    date: "Daily",
    price: "₹890",
    seatsAvailable: 12,
    totalSeats: 36,
    amenities: ["AC", "Sleeper", "Blanket", "Water Bottle", "Charging Port"],
    rating: 4.3,
    status: "on-time",
  },
  {
    id: "b-4",
    operator: "KPN Travels",
    busType: "Multi-Axle Volvo Sleeper",
    from: "Ernakulam South",
    to: "Chennai CMBT",
    departure: "7:30 PM",
    arrival: "6:00 AM +1",
    duration: "10h 30m",
    date: "Daily",
    price: "₹1,050",
    seatsAvailable: 8,
    totalSeats: 32,
    amenities: ["AC", "Sleeper", "WiFi", "Blanket", "Snacks", "Charging Port"],
    rating: 4.6,
    status: "on-time",
  },
  {
    id: "b-5",
    operator: "KSRTC Ordinary",
    busType: "Ordinary",
    from: "Pala",
    to: "Kottayam KSRTC",
    departure: "Every 30 min",
    arrival: "—",
    duration: "1h 15m",
    date: "Daily",
    price: "₹45",
    seatsAvailable: 40,
    totalSeats: 55,
    amenities: [],
    rating: 3.8,
    status: "on-time",
  },
  {
    id: "b-6",
    operator: "Kondody Travels",
    busType: "Semi-Sleeper A/C",
    from: "Kottayam KSRTC",
    to: "Mangalore City",
    departure: "9:00 PM",
    arrival: "7:30 AM +1",
    duration: "10h 30m",
    date: "Mon, Wed, Fri",
    price: "₹780",
    seatsAvailable: 15,
    totalSeats: 40,
    amenities: ["AC", "Semi-Sleeper", "Charging Port", "Water Bottle"],
    rating: 4.1,
    status: "on-time",
  },
  {
    id: "b-7",
    operator: "KSRTC Garuda",
    busType: "Volvo A/C",
    from: "Ernakulam South",
    to: "Bangalore Majestic",
    departure: "10:00 PM",
    arrival: "6:15 AM +1",
    duration: "8h 15m",
    date: "Daily",
    price: "₹750",
    seatsAvailable: 22,
    totalSeats: 45,
    amenities: ["AC", "Pushback Seats", "Charging Port"],
    rating: 4.4,
    status: "on-time",
  },
  {
    id: "b-8",
    operator: "Greenline Travels",
    busType: "Sleeper A/C",
    from: "Kayamkulam",
    to: "Hyderabad MGBS",
    departure: "4:30 PM",
    arrival: "10:00 AM +1",
    duration: "17h 30m",
    date: "Tue, Thu, Sat",
    price: "₹1,450",
    seatsAvailable: 6,
    totalSeats: 30,
    amenities: ["AC", "Sleeper", "WiFi", "Blanket", "Snacks", "Charging Port", "Entertainment"],
    rating: 4.0,
    status: "delayed",
  },
  {
    id: "b-9",
    operator: "KSRTC AC Garuda Plus",
    busType: "Scania Multi-Axle",
    from: "Trivandrum Central",
    to: "Bangalore Majestic",
    departure: "6:00 PM",
    arrival: "5:45 AM +1",
    duration: "11h 45m",
    date: "Daily",
    price: "₹1,100",
    seatsAvailable: 10,
    totalSeats: 45,
    amenities: ["AC", "Pushback Seats", "GPS Tracking", "Charging Port"],
    rating: 4.5,
    status: "on-time",
  },
  {
    id: "b-10",
    operator: "KSRTC Fast Passenger",
    busType: "Fast Passenger",
    from: "Kottayam KSRTC",
    to: "Munnar",
    departure: "8:30 AM",
    arrival: "1:00 PM",
    duration: "4h 30m",
    date: "Daily",
    price: "₹180",
    seatsAvailable: 28,
    totalSeats: 50,
    amenities: [],
    rating: 3.9,
    status: "on-time",
  },
]

// ── Mock Flights ────────────────────────────────────────────────

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: "f-1",
    airline: "IndiGo",
    flightNumber: "6E 384",
    from: "Cochin International Airport",
    fromCode: "COK",
    to: "Bangalore Airport (KIA)",
    toCode: "BLR",
    departure: "6:15 AM",
    arrival: "7:35 AM",
    duration: "1h 20m",
    date: "Daily",
    price: "₹3,450",
    class: "Economy",
    stops: 0,
    baggage: "15 kg",
    status: "on-time",
  },
  {
    id: "f-2",
    airline: "Air India",
    flightNumber: "AI 567",
    from: "Cochin International Airport",
    fromCode: "COK",
    to: "New Delhi (DEL)",
    toCode: "DEL",
    departure: "10:30 AM",
    arrival: "1:45 PM",
    duration: "3h 15m",
    date: "Daily",
    price: "₹5,890",
    class: "Economy",
    stops: 0,
    baggage: "25 kg",
    status: "on-time",
  },
  {
    id: "f-3",
    airline: "SpiceJet",
    flightNumber: "SG 102",
    from: "Cochin International Airport",
    fromCode: "COK",
    to: "Mumbai (BOM)",
    toCode: "BOM",
    departure: "2:20 PM",
    arrival: "4:30 PM",
    duration: "2h 10m",
    date: "Daily",
    price: "₹4,250",
    class: "Economy",
    stops: 0,
    baggage: "15 kg",
    status: "on-time",
  },
  {
    id: "f-4",
    airline: "Vistara",
    flightNumber: "UK 836",
    from: "Cochin International Airport",
    fromCode: "COK",
    to: "Chennai Airport (MAA)",
    toCode: "MAA",
    departure: "8:00 AM",
    arrival: "9:15 AM",
    duration: "1h 15m",
    date: "Daily",
    price: "₹3,780",
    class: "Economy",
    stops: 0,
    baggage: "20 kg",
    status: "on-time",
  },
  {
    id: "f-5",
    airline: "IndiGo",
    flightNumber: "6E 512",
    from: "Cochin International Airport",
    fromCode: "COK",
    to: "Hyderabad (HYD)",
    toCode: "HYD",
    departure: "11:50 AM",
    arrival: "1:20 PM",
    duration: "1h 30m",
    date: "Daily",
    price: "₹3,990",
    class: "Economy",
    stops: 0,
    baggage: "15 kg",
    status: "on-time",
  },
  {
    id: "f-6",
    airline: "Air India Express",
    flightNumber: "IX 614",
    from: "Cochin International Airport",
    fromCode: "COK",
    to: "Goa (GOI)",
    toCode: "GOI",
    departure: "3:40 PM",
    arrival: "5:10 PM",
    duration: "1h 30m",
    date: "Mon, Wed, Fri, Sun",
    price: "₹4,120",
    class: "Economy",
    stops: 0,
    baggage: "20 kg",
    status: "on-time",
  },
  {
    id: "f-7",
    airline: "IndiGo",
    flightNumber: "6E 208",
    from: "Trivandrum Airport",
    fromCode: "TRV",
    to: "Bangalore Airport (KIA)",
    toCode: "BLR",
    departure: "7:10 AM",
    arrival: "8:25 AM",
    duration: "1h 15m",
    date: "Daily",
    price: "₹3,200",
    class: "Economy",
    stops: 0,
    baggage: "15 kg",
    status: "on-time",
  },
  {
    id: "f-8",
    airline: "Air India",
    flightNumber: "AI 403",
    from: "Cochin International Airport",
    fromCode: "COK",
    to: "Kolkata (CCU)",
    toCode: "CCU",
    departure: "12:15 PM",
    arrival: "3:10 PM",
    duration: "2h 55m",
    date: "Daily",
    price: "₹6,450",
    class: "Economy",
    stops: 0,
    baggage: "25 kg",
    status: "delayed",
  },
  {
    id: "f-9",
    airline: "Akasa Air",
    flightNumber: "QP 1345",
    from: "Cochin International Airport",
    fromCode: "COK",
    to: "Bangalore Airport (KIA)",
    toCode: "BLR",
    departure: "4:45 PM",
    arrival: "6:00 PM",
    duration: "1h 15m",
    date: "Daily",
    price: "₹2,890",
    class: "Economy",
    stops: 0,
    baggage: "15 kg",
    status: "on-time",
  },
  {
    id: "f-10",
    airline: "Vistara",
    flightNumber: "UK 842",
    from: "Cochin International Airport",
    fromCode: "COK",
    to: "New Delhi (DEL)",
    toCode: "DEL",
    departure: "7:00 PM",
    arrival: "10:30 PM",
    duration: "3h 30m",
    date: "Daily",
    price: "₹6,200",
    class: "Economy",
    stops: 1,
    stopLocations: ["Mumbai"],
    baggage: "20 kg",
    status: "on-time",
  },
]

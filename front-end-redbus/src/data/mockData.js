/**
 * Mock routes and buses — used when backend is unavailable.
 * Each route has 3-5 buses with realistic data.
 */

export const MOCK_ROUTES = [
  { _id: "r1",  departureLocation: { name: "Mumbai",    subLocations: ["Dadar","Borivali","Thane"] },    arrivalLocation: { name: "Pune",        subLocations: ["Swargate","Shivajinagar"] },       duration: 3 },
  { _id: "r2",  departureLocation: { name: "Pune",      subLocations: ["Swargate","Shivajinagar"] },     arrivalLocation: { name: "Mumbai",      subLocations: ["Dadar","Borivali"] },              duration: 3 },
  { _id: "r3",  departureLocation: { name: "Delhi",     subLocations: ["ISBT Kashmere Gate","Anand Vihar"] }, arrivalLocation: { name: "Agra",    subLocations: ["Agra Fort","Idgah Bus Stand"] }, duration: 4 },
  { _id: "r4",  departureLocation: { name: "Delhi",     subLocations: ["ISBT Kashmere Gate"] },          arrivalLocation: { name: "Jaipur",      subLocations: ["Sindhi Camp"] },                  duration: 5 },
  { _id: "r5",  departureLocation: { name: "Bangalore", subLocations: ["Majestic","Silk Board"] },       arrivalLocation: { name: "Mysore",      subLocations: ["Central Bus Stand"] },            duration: 3 },
  { _id: "r6",  departureLocation: { name: "Bangalore", subLocations: ["Majestic"] },                    arrivalLocation: { name: "Chennai",     subLocations: ["CMBT","Koyambedu"] },             duration: 6 },
  { _id: "r7",  departureLocation: { name: "Chennai",   subLocations: ["CMBT","Tambaram"] },             arrivalLocation: { name: "Pondicherry", subLocations: ["New Bus Stand"] },                duration: 3 },
  { _id: "r8",  departureLocation: { name: "Hyderabad", subLocations: ["MGBS","Jubilee Bus Stand"] },    arrivalLocation: { name: "Vijayawada",  subLocations: ["Pandit Nehru Bus Stand"] },       duration: 5 },
  { _id: "r9",  departureLocation: { name: "Lucknow",   subLocations: ["Charbagh","Alambagh"] },         arrivalLocation: { name: "Delhi",       subLocations: ["ISBT Kashmere Gate"] },           duration: 8 },
  { _id: "r10", departureLocation: { name: "Lucknow",   subLocations: ["Charbagh"] },                    arrivalLocation: { name: "Allahabad",   subLocations: ["Civil Lines","Zero Road"] },      duration: 4 },
  { _id: "r11", departureLocation: { name: "Lucknow",   subLocations: ["Alambagh"] },                    arrivalLocation: { name: "Faizabad",    subLocations: ["Faizabad Bus Stand"] },           duration: 3 },
  { _id: "r12", departureLocation: { name: "Allahabad", subLocations: ["Civil Lines"] },                 arrivalLocation: { name: "Lucknow",     subLocations: ["Charbagh"] },                     duration: 4 },
  { _id: "r13", departureLocation: { name: "Ahmedabad", subLocations: ["Geeta Mandir"] },                arrivalLocation: { name: "Surat",       subLocations: ["Central Bus Stand"] },            duration: 3 },
  { _id: "r14", departureLocation: { name: "Jaipur",    subLocations: ["Sindhi Camp"] },                 arrivalLocation: { name: "Delhi",       subLocations: ["ISBT Kashmere Gate"] },           duration: 5 },
  { _id: "r15", departureLocation: { name: "Mysore",    subLocations: ["Central Bus Stand"] },           arrivalLocation: { name: "Bangalore",   subLocations: ["Majestic"] },                     duration: 3 },
  { _id: "r16", departureLocation: { name: "Pune",      subLocations: ["Swargate"] },                    arrivalLocation: { name: "Goa",         subLocations: ["Panaji","Mapusa"] },              duration: 8 },
  { _id: "r17", departureLocation: { name: "Indore",    subLocations: ["Sarwate Bus Stand"] },           arrivalLocation: { name: "Bhopal",      subLocations: ["Hamidia Road"] },                 duration: 3 },
  { _id: "r18", departureLocation: { name: "Varanasi",  subLocations: ["Cantt Bus Stand"] },             arrivalLocation: { name: "Lucknow",     subLocations: ["Charbagh"] },                     duration: 5 },
  { _id: "r19", departureLocation: { name: "Nagpur",    subLocations: ["Central Bus Stand"] },           arrivalLocation: { name: "Mumbai",      subLocations: ["Dadar"] },                        duration: 12 },
  { _id: "r20", departureLocation: { name: "Coimbatore",subLocations: ["Gandhipuram"] },                 arrivalLocation: { name: "Chennai",     subLocations: ["CMBT"] },                         duration: 8 },
];

const OPERATORS = [
  "VRL Travels","Orange Travels","SRS Travels","KSRTC","MSRTC",
  "APSRTC","IntrCity SmartBus","Neeta Travels","Parveen Travels",
  "KPN Travels","Raj National Express","Greenline Travels",
];

let busIdCounter = 1;

function makeBuses(routeId, count) {
  const buses = [];
  const times = [6,7,8,9,10,12,14,16,18,20,21,22,23];
  const usedTimes = new Set();
  for (let i = 0; i < count; i++) {
    let t;
    do { t = times[Math.floor(Math.random() * times.length)]; } while (usedTimes.has(t));
    usedTimes.add(t);
    buses.push({
      _id: `b${busIdCounter++}`,
      operatorName: OPERATORS[Math.floor(Math.random() * OPERATORS.length)],
      busType: (i % 4) + 1,
      departureTime: t,
      rating: [2, 5, 15, 25, 35],
      totalSeats: 40,
      routes: routeId,
      liveTracking: i % 2 === 0 ? 1 : 0,
      reschedulable: i % 3 !== 0 ? 1 : 0,
      filledSeats: [],
    });
  }
  return buses;
}

export const MOCK_BUSES = MOCK_ROUTES.flatMap((r) =>
  makeBuses(r._id, 3 + Math.floor(Math.random() * 3))
);

export function getMockRouteData(departure, arrival) {
  const route = MOCK_ROUTES.find(
    (r) =>
      r.departureLocation.name.toLowerCase() === departure.toLowerCase() &&
      r.arrivalLocation.name.toLowerCase() === arrival.toLowerCase()
  );
  if (!route) return null;
  const matchedBuses = MOCK_BUSES.filter((b) => b.routes === route._id);
  const busIdWithSeatsObj = {};
  matchedBuses.forEach((b) => { busIdWithSeatsObj[b._id] = []; });
  return { route, matchedBuses, busIdWithSeatsObj };
}

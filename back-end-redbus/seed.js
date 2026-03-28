/**
 * Seed script — adds routes and buses to MongoDB
 * Run: node seed.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Route = require("./models/route");
const Bus = require("./models/bus");

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://redbus_db_user_1:umJkhSujb8dZoc2a@redbuscnstructweek.bujg6.mongodb.net/redbus?retryWrites=true&w=majority";

const ROUTES = [
  { dep: "Lucknow",     arr: "Delhi",       dur: 8,  depSub: ["Charbagh", "Alambagh"],       arrSub: ["ISBT Kashmere Gate", "Anand Vihar"] },
  { dep: "Lucknow",     arr: "Allahabad",   dur: 4,  depSub: ["Charbagh"],                   arrSub: ["Civil Lines", "Zero Road"] },
  { dep: "Lucknow",     arr: "Faizabad",    dur: 3,  depSub: ["Alambagh"],                   arrSub: ["Faizabad Bus Stand"] },
  { dep: "Allahabad",   arr: "Lucknow",     dur: 4,  depSub: ["Civil Lines"],                arrSub: ["Charbagh"] },
  { dep: "Mumbai",      arr: "Pune",        dur: 3,  depSub: ["Dadar", "Borivali", "Thane"], arrSub: ["Shivajinagar", "Swargate"] },
  { dep: "Pune",        arr: "Mumbai",      dur: 3,  depSub: ["Swargate", "Shivajinagar"],   arrSub: ["Dadar", "Borivali"] },
  { dep: "Delhi",       arr: "Agra",        dur: 4,  depSub: ["ISBT Kashmere Gate"],         arrSub: ["Agra Fort", "Idgah Bus Stand"] },
  { dep: "Delhi",       arr: "Jaipur",      dur: 5,  depSub: ["ISBT Kashmere Gate"],         arrSub: ["Sindhi Camp"] },
  { dep: "Bangalore",   arr: "Mysore",      dur: 3,  depSub: ["Majestic", "Silk Board"],     arrSub: ["Central Bus Stand"] },
  { dep: "Bangalore",   arr: "Chennai",     dur: 6,  depSub: ["Majestic"],                   arrSub: ["CMBT", "Koyambedu"] },
  { dep: "Chennai",     arr: "Bangalore",   dur: 6,  depSub: ["CMBT"],                       arrSub: ["Majestic"] },
  { dep: "Chennai",     arr: "Pondicherry", dur: 3,  depSub: ["CMBT", "Tambaram"],           arrSub: ["New Bus Stand"] },
  { dep: "Hyderabad",   arr: "Vijayawada",  dur: 5,  depSub: ["Mahatma Gandhi Bus Station"], arrSub: ["Pandit Nehru Bus Station"] },
  { dep: "Hyderabad",   arr: "Bangalore",   dur: 10, depSub: ["MGBS", "Jubilee Bus Stand"],  arrSub: ["Majestic"] },
  { dep: "Ahmedabad",   arr: "Surat",       dur: 3,  depSub: ["Geeta Mandir"],               arrSub: ["Central Bus Stand"] },
  { dep: "Ahmedabad",   arr: "Mumbai",      dur: 9,  depSub: ["Geeta Mandir"],               arrSub: ["Dadar", "Borivali"] },
  { dep: "Jaipur",      arr: "Delhi",       dur: 5,  depSub: ["Sindhi Camp"],                arrSub: ["ISBT Kashmere Gate"] },
  { dep: "Kolkata",     arr: "Bhubaneswar", dur: 8,  depSub: ["Esplanade"],                  arrSub: ["Baramunda Bus Terminal"] },
  { dep: "Nagpur",      arr: "Mumbai",      dur: 12, depSub: ["Central Bus Stand"],          arrSub: ["Dadar"] },
  { dep: "Indore",      arr: "Bhopal",      dur: 3,  depSub: ["Sarwate Bus Stand"],          arrSub: ["Hamidia Road"] },
  { dep: "Coimbatore",  arr: "Chennai",     dur: 8,  depSub: ["Gandhipuram"],                arrSub: ["CMBT"] },
  { dep: "Varanasi",    arr: "Lucknow",     dur: 5,  depSub: ["Cantt Bus Stand"],            arrSub: ["Charbagh"] },
  { dep: "Mysore",      arr: "Bangalore",   dur: 3,  depSub: ["Central Bus Stand"],          arrSub: ["Majestic"] },
  { dep: "Surat",       arr: "Mumbai",      dur: 5,  depSub: ["Central Bus Stand"],          arrSub: ["Dadar"] },
  { dep: "Pune",        arr: "Goa",         dur: 8,  depSub: ["Swargate"],                   arrSub: ["Panaji", "Mapusa"] },
];

const OPERATORS = [
  "VRL Travels", "Orange Travels", "SRS Travels", "KSRTC", "MSRTC",
  "APSRTC", "IntrCity SmartBus", "Neeta Travels", "Parveen Travels",
  "KPN Travels", "Raj National Express", "Greenline Travels",
];

const BUS_TYPES = [1, 2, 3, 4]; // 1=Seater, 2=Sleeper, 3=AC Seater, 4=Non-AC

function randomRating() {
  return [
    Math.floor(Math.random() * 5),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 30),
    Math.floor(Math.random() * 40),
  ];
}

function randomDepartureTime() {
  const times = [6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 21, 22, 23];
  return times[Math.floor(Math.random() * times.length)];
}

async function seed() {
  await mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("Connected to MongoDB");

  // Clear existing
  await Route.deleteMany({});
  await Bus.deleteMany({});
  console.log("Cleared existing routes and buses");

  for (const r of ROUTES) {
    const route = await Route.create({
      departureLocation: { name: r.dep, subLocations: r.depSub },
      arrivalLocation: { name: r.arr, subLocations: r.arrSub },
      duration: r.dur,
    });

    // Add 3-5 buses per route
    const busCount = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < busCount; i++) {
      await Bus.create({
        operatorName: OPERATORS[Math.floor(Math.random() * OPERATORS.length)],
        busType: BUS_TYPES[Math.floor(Math.random() * BUS_TYPES.length)],
        departureTime: randomDepartureTime(),
        rating: randomRating(),
        totalSeats: 40,
        routes: route._id,
        images: "https://s3.rdbuz.com/Images/carousel/tmb_img.png",
        liveTracking: Math.random() > 0.4 ? 1 : 0,
        reschedulable: Math.random() > 0.5 ? 1 : 0,
      });
    }
    console.log(`✓ ${r.dep} → ${r.arr} (${busCount} buses)`);
  }

  console.log("\nSeeding complete!");
  console.log(`Routes: ${ROUTES.length}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

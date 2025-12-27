import { faker } from "@faker-js/faker";

export type BiddingStatus = "Live" | "Ended" | "Upcoming";

export type Bid = {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorPhone: string;
  amount: number;
  timestamp: string;
};

export type LiveBiddingSession = {
  id: string;
  customerId: string;
  customerName: string;
  vehicleImage: string;
  brand: string;
  model: string;
  year: string;
  variant: string;
  vehicleType:
    | "2 Wheeler"
    | "3 Wheeler"
    | "4 Wheeler"
    | "6 Wheeler"
    | "8 Wheeler";
  fuelType: string;
  transmission: string;
  kilometersDriven: string;
  ownershipHistory: string;
  description: string;
  images: string[];
  biddingStartTime: string;
  biddingEndTime: string;
  status: BiddingStatus;
  bids: Bid[];
  highestBid: number;
  winningVendorId?: string;
  winningVendorName?: string;
};

export function generateLiveBiddingSession(): LiveBiddingSession {
  const vehicleTypes = [
    "2 Wheeler",
    "3 Wheeler",
    "4 Wheeler",
    "6 Wheeler",
    "8 Wheeler",
  ] as const;
  const vehicleType = faker.helpers.arrayElement(vehicleTypes);

  const brands: Record<string, string[]> = {
    "2 Wheeler": ["Honda", "TVS", "Bajaj", "Royal Enfield", "Hero"],
    "3 Wheeler": ["Bajaj", "Piaggio", "Mahindra", "TVS"],
    "4 Wheeler": ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota"],
    "6 Wheeler": ["Tata", "Ashok Leyland", "Eicher"],
    "8 Wheeler": ["Tata", "Ashok Leyland", "BharatBenz"],
  };

  const models: Record<string, string[]> = {
    "2 Wheeler": ["Activa", "Jupiter", "Pulsar", "Classic", "Splendor"],
    "3 Wheeler": ["RE", "Ape", "Alfa", "King"],
    "4 Wheeler": ["Swift", "i20", "Nexon", "City", "Innova"],
    "6 Wheeler": ["407", "Dost", "Pro 2049", "914R"],
    "8 Wheeler": ["Prima", "2820", "2823R", "Pro 6025"],
  };

  const brand = faker.helpers.arrayElement(brands[vehicleType] ?? ["Unknown"]);
  const model = faker.helpers.arrayElement(models[vehicleType] ?? ["Unknown"]);

  const startTime = faker.date.recent();
  const endTime = new Date(
    startTime.getTime() + faker.number.int({ min: 3600000, max: 86400000 })
  );
  const now = new Date();

  let status: BiddingStatus = "Upcoming";
  if (now > endTime) status = "Ended";
  else if (now > startTime) status = "Live";

  const baseBid = faker.number.int({ min: 100000, max: 500000 });
  const numberOfBids = faker.number.int({ min: 3, max: 15 });

  const bids: Bid[] = Array.from({ length: numberOfBids }, (_, index) => ({
    id: faker.string.uuid(),
    vendorId: faker.string.uuid(),
    vendorName: faker.person.fullName(),
    vendorPhone: faker.string.numeric(10),
    amount: baseBid + (index + 1) * faker.number.int({ min: 5000, max: 50000 }),
    timestamp: new Date(startTime.getTime() + index * 300000).toISOString(),
  }));

  const highestBid =
    bids.length > 0 ? Math.max(...bids.map((b) => b.amount)) : baseBid;
  const winningBid = bids.find((b) => b.amount === highestBid);

  return {
    id: faker.string.uuid(),
    customerId: faker.string.uuid(),
    customerName: faker.person.fullName(),
    vehicleImage: `/placeholder.svg?height=200&width=300&query=${brand}+${model}`,
    brand,
    model,
    year: faker.date
      .between({ from: "2015-01-01", to: "2024-12-31" })
      .getFullYear()
      .toString(),
    variant: faker.helpers.arrayElement([
      "Base",
      "Mid",
      "Top",
      "LXi",
      "VXi",
      "ZXi",
    ]),
    vehicleType,
    fuelType: faker.helpers.arrayElement([
      "Petrol",
      "Diesel",
      "CNG",
      "Electric",
    ]),
    transmission: faker.helpers.arrayElement(["Manual", "Automatic"]),
    kilometersDriven: `${faker.number.int({ min: 5000, max: 150000 }).toLocaleString()} km`,
    ownershipHistory: faker.helpers.arrayElement([
      "1st Owner",
      "2nd Owner",
      "3rd Owner",
    ]),
    description: faker.lorem.sentences(3),
    images: Array.from(
      { length: faker.number.int({ min: 2, max: 5 }) },
      () =>
        `/placeholder.svg?height=400&width=600&query=${brand}+${model}+vehicle`
    ),
    biddingStartTime: startTime.toISOString(),
    biddingEndTime: endTime.toISOString(),
    status,
    bids,
    highestBid,
    winningVendorId: winningBid?.vendorId,
    winningVendorName: winningBid?.vendorName,
  };
}

export function generateLiveBiddingSessions(
  count: number
): LiveBiddingSession[] {
  return Array.from({ length: count }, generateLiveBiddingSession);
}

let biddingSessions = generateLiveBiddingSessions(40);

export const biddingDb = {
  getAll: () => biddingSessions,
  getById: (id: string) => biddingSessions.find((session) => session.id === id),
  addBid: (sessionId: string, bid: Bid) => {
    biddingSessions = biddingSessions.map((session) =>
      session.id === sessionId
        ? {
            ...session,
            bids: [...session.bids, bid],
            highestBid: Math.max(session.highestBid, bid.amount),
            winningVendorId:
              bid.amount > session.highestBid
                ? bid.vendorId
                : session.winningVendorId,
            winningVendorName:
              bid.amount > session.highestBid
                ? bid.vendorName
                : session.winningVendorName,
          }
        : session
    );
    return biddingSessions.find((session) => session.id === sessionId);
  },
  endBidding: (sessionId: string) => {
    biddingSessions = biddingSessions.map((session) =>
      session.id === sessionId
        ? { ...session, status: "Ended" as const }
        : session
    );
    return biddingSessions.find((session) => session.id === sessionId);
  },
  extendBidding: (sessionId: string, newEndTime: string) => {
    biddingSessions = biddingSessions.map((session) =>
      session.id === sessionId
        ? { ...session, biddingEndTime: newEndTime }
        : session
    );
    return biddingSessions.find((session) => session.id === sessionId);
  },
};

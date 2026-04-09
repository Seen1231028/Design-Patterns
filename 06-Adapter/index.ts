interface Distance {
  getMeters(): number;
}

class Runway {
  private lengthFt: number;
  private name: string;

  constructor(name: string, lengthFt: number) {
    this.name = name;
    this.lengthFt = lengthFt;
  }

  setLengthFt(lengthFt: number): void {
    this.lengthFt = lengthFt;
  }

  setName(name: string): void {
    this.name = name;
  }

  getLengthFt(): number {
    return this.lengthFt;
  }

  getName(): string {
    return this.name;
  }
}

class GPSTrack {
  private distanceMi: number;
  private routeName: string;

  constructor(routeName: string, distanceMi: number) {
    this.routeName = routeName;
    this.distanceMi = distanceMi;
  }

  setDistanceMi(distanceMi: number): void {
    this.distanceMi = distanceMi;
  }

  setRouteName(routeName: string): void {
    this.routeName = routeName;
  }

  getDistanceMi(): number {
    return this.distanceMi;
  }

  getRouteName(): string {
    return this.routeName;
  }
}

class NavSystem {
  private distanceNm: number;
  private vesselRoute: string;

  constructor(vesselRoute: string, distanceNm: number) {
    this.vesselRoute = vesselRoute;
    this.distanceNm = distanceNm;
  }

  setDistanceNm(distanceNm: number): void {
    this.distanceNm = distanceNm;
  }

  setVesselRoute(vesselRoute: string): void {
    this.vesselRoute = vesselRoute;
  }

  getDistanceNm(): number {
    return this.distanceNm;
  }

  getVesselRoute(): string {
    return this.vesselRoute;
  }
}

class FeetAdapter implements Distance {
  private adaptee: Runway;

  constructor(runway: Runway) {
    this.adaptee = runway;
  }

  getMeters(): number {
    return this.adaptee.getLengthFt() * 0.3048;
  }
}

class MilesAdapter implements Distance {
  private adaptee: GPSTrack;

  constructor(gpsTrack: GPSTrack) {
    this.adaptee = gpsTrack;
  }

  getMeters(): number {
    return this.adaptee.getDistanceMi() * 1609.34;
  }
}

class NauticalAdapter implements Distance {
  private adaptee: NavSystem;

  constructor(navSystem: NavSystem) {
    this.adaptee = navSystem;
  }

  getMeters(): number {
    return this.adaptee.getDistanceNm() * 1852;
  }
}

class DeliveryService {
  private costPerKm: number;

  constructor(costPerKm: number) {
    this.costPerKm = costPerKm; 
  }

  setCostPerKm(cost: number): void {
    this.costPerKm = cost;
  }

  getCostPerKm(): number {
    return this.costPerKm;
  }

  rankDistances(distances: Distance[], sortOrder: 'asc' | 'desc' = 'asc'): Distance[] {
    const sorted = [...distances].sort((a, b) => a.getMeters() - b.getMeters());
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }

  calculateTotalDistance(distances: Distance[]): number {
    return distances.reduce((total, distance) => total + distance.getMeters(), 0);
  }

  calculateShippingCost(distance: Distance): number {
    const km = distance.getMeters() / 1000;
    return km * this.getCostPerKm();
  }

  formatMetersToKilometers(meters: number): string {
    if (meters >= 1000) return `${(meters / 1000).toFixed(2)} km`;
    return `${meters.toFixed(2)} m`;
  }

  generateDeliveryReport(distances: Distance[]): void {
    console.log("----------------------│------------------│------------------│");
    console.log("│ Delivery Segment    │ Distance         │ Estimated Cost   │");
    console.log("----------------------│------------------│------------------│");
    
    distances.forEach((d, index) => {
      const segmentName = `Segment ${index + 1}`.padEnd(19);
      const meters = this.formatMetersToKilometers(d.getMeters()).padStart(16);
      const cost = `${this.calculateShippingCost(d).toFixed(2)} THB`.padStart(16);
      
      console.log(`│ ${segmentName} │ ${meters} │ ${cost} │`);
    });
    console.log("----------------------│------------------│------------------│");
  }
}

const runway1 = new Runway("BKK runway", 10000);
const runway2 = new Runway("DON MUEANG runway", 8858);
const gpsRoute1 = new GPSTrack("City loop GPS track", 2.5);
const gpsHighway = new GPSTrack("Bangkok -> Chiang Mai highway", 186);
const seaRoute = new NavSystem("Gulf ferry crossing", 1.5);
const seaRoute2 = new NavSystem("Bangkok -> Singapore sea lane", 420);

const deliverySegments: Distance[] = [
  new FeetAdapter(runway1),
  new FeetAdapter(runway2),
  new MilesAdapter(gpsRoute1),
  new MilesAdapter(gpsHighway),
  new NauticalAdapter(seaRoute),
  new NauticalAdapter(seaRoute2)
];

const deliveryService = new DeliveryService(15);

console.log("--- All Delivery Segments ---");
deliveryService.generateDeliveryReport(deliverySegments);

console.log("\n--- Ranked Delivery Segments (Shortest to Longest) ---");
const rankedAsc = deliveryService.rankDistances(deliverySegments, 'desc');
deliveryService.generateDeliveryReport(rankedAsc);

const totalDistance = deliveryService.calculateTotalDistance(deliverySegments);
console.log(`\nTotal Delivery Distance: ${deliveryService.formatMetersToKilometers(totalDistance)}`);

const sampleDis: Distance = new FeetAdapter(runway1);
console.log(`\nSample Distance in meters: ${sampleDis.getMeters().toLocaleString()} m`);
type Location = {
  lat: number;
  lng: number;
};

type User = {
  id: string;
  name: string;
  phone: string;
};

class UserService {
  private users: Map<string, User> = new Map();

  register(name: string, phone: string): string {
    const userId = `user_${Math.floor(Math.random() * 10000)}`;

    const user: User = { id: userId, name, phone };
    this.users.set(userId, user);

    console.log(`✅ Registered: ${name} (${userId})`);
    return userId;
  }

  getUser(userId: string): User | null {
    return this.users.get(userId) || null;
  }
}

class LocationService {
  private cache: Map<string, Location> = new Map();

  getUserLocation(userId: string, origin: Location): Location {
    if (this.cache.has(userId)) {
      console.log(`📍 Cache hit for ${userId}`);
      return this.cache.get(userId)!;
    }

    console.log(`📍 ${userId} at (${origin.lat}, ${origin.lng})`);
    this.cache.set(userId, origin);
    return origin;
  }

  calculateDistance(o: Location, d: Location): number {
    return Math.abs(o.lat - d.lat) + Math.abs(o.lng - d.lng);
  }
}

class PricingService {
  constructor(
    private baseRate = 10,
    private surge = 1.5,
    private discount = 0.1,
  ) {}

  calculateFare(distance: number, rush: boolean): number {
    let fare = distance * this.baseRate;
    if (rush) fare *= this.surge;
    if (this.discount > 0) fare *= 1 - this.discount;

    console.log(`💰 Fare: ${fare.toFixed(2)} THB`);
    return fare;
  }
}

class DriverMatchService {
  private drivers: string[];

  constructor(drivers: string[]) {
    this.drivers = drivers;
  }

  addDriver(name: string): void {
    this.drivers.push(name);
  }

  findDriver(): string | null {
    if (this.drivers.length === 0) return null;
    return this.drivers.shift()!;
  }
}

class PaymentService {
  private balance: Map<string, number> = new Map();

  addBalance(userId: string, amount: number): void {
    const b = this.balance.get(userId) || 0;
    this.balance.set(userId, b + amount);
    console.log(`💳 +${amount} THB → ${userId}`);
  }

  reserve(userId: string, amount: number): boolean {
    const b = this.balance.get(userId) || 0;

    if (b < amount) {
      console.log("❌ เงินไม่พอ");
      return false;
    }

    this.balance.set(userId, b - amount);
    console.log(`✅ Paid ${amount.toFixed(2)} THB`);
    return true;
  }
}

class NotificationService {
  send(userId: string, msg: string): void {
    console.log(`📩 ${userId}: ${msg}`);
  }
}

class RideBookingFacade {
  private userService = new UserService();
  private locationService = new LocationService();
  private pricingService = new PricingService(10, 1.5, 0.1);
  private driverService = new DriverMatchService([]);
  private paymentService = new PaymentService();
  private notifyService = new NotificationService();

  private history: string[] = [];

  register(name: string, phone: string, amount: number): string {
    const id = this.userService.register(name, phone);
    this.paymentService.addBalance(id, amount);
    return id;
  }

  addBalance(userId: string, amount: number): void {
    this.paymentService.addBalance(userId, amount);
  }

  addDriver(driver: string[]): void {
    driver.forEach((d) => this.driverService.addDriver(d));
  }

  bookRide(userId: string, origin: Location, dest: Location): void {
    console.log("\n=== BOOKING ===");

    const user = this.userService.getUser(userId);
    if (!user) {
      console.log("❌ User not found");
      return;
    }

    const loc = this.locationService.getUserLocation(userId, origin);
    const dist = this.locationService.calculateDistance(loc, dest);
    const fare = this.pricingService.calculateFare(dist, true);

    if (!this.paymentService.reserve(userId, fare)) return;

    const driver = this.driverService.findDriver();
    if (!driver) {
      console.log("❌ No driver");
      return;
    }

    const msg = `Driver: ${driver}, Fare: ${fare.toFixed(2)}`;
    this.notifyService.send(userId, msg);

    this.history.push(`${user.name} → ${msg}`);

    console.log("✅ SUCCESS");
  }

  showHistory(): void {
    console.log("\n📜 HISTORY");
    this.history.forEach((h, i) => console.log(`${i + 1}. ${h}`));
  }
}

const app = new RideBookingFacade();

const u1 = app.register("Zeen", "0999999999", 500);
const u2 = app.register("Boss", "0888888888", 0);

const drivers: string[] = ["สมดี", "สมศรี", "สมปอง"];
app.addDriver(drivers);

app.addBalance(u1, 200);

app.bookRide(u1, { lat: 13.7468, lng: 105.5346 }, { lat: 13.75, lng: 100.55 });
app.bookRide(u2, { lat: 13.7468, lng: 100.5346 }, { lat: 13.8, lng: 110.6 });

app.showHistory();

app.addBalance(u2, 1000);

app.bookRide(u2, { lat: 13.7468, lng: 100.5346 }, { lat: 13.8, lng: 110.6 });

app.showHistory();

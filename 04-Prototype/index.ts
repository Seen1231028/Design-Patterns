interface Prototype {
  clone(): Prototype;
}

class AircraftRegistry {
  private aircraft : Aircraft[] = [];

  constructor(aircraft: Aircraft[] = []) {
    this.aircraft = aircraft;
  }

  addAircraft(aircraft: Aircraft) : void{
    this.aircraft.push(aircraft);
  }

  getAircraftbyName(name: string): Aircraft | void {
    for (const aircraft of this.aircraft) {
      if (aircraft.getName() === name) {
        return aircraft.clone();
      }
    }
    console.log("Aircraft not found");
  }
}


abstract class Aircraft implements Prototype {
  constructor(
    protected name: string,
    protected maxspeed: number,
  ) {
    this.name = name;
    this.maxspeed = maxspeed;
  }

  setName(name: string) {
    this.name = name;
  }

  setSpeed(maxspeed: number) {
    this.maxspeed = maxspeed;
  }

  public getName(): string {
    return this.name;
  }

  public getSpeed(): number {
    return this.maxspeed;
  }

  abstract display(): void;
  abstract clone(): Aircraft;
}

class PassengerAircraft extends Aircraft {
  private passengerCapacity: number;

  constructor(name: string = "Boeing 747", maxspeed: number = 900, passengerCapacity: number = 500) {
    super(name, maxspeed);
    this.passengerCapacity = passengerCapacity;
  }

  

  setPassengerCapacity(passengerCapacity: number): void {
    this.passengerCapacity = passengerCapacity;
  }
  
  getPassengerCapacity(): number {
    return this.passengerCapacity;
  }

  display() {
    console.log(
      "Name :",
      this.getName(),
      "\nSpeed :",
      this.getSpeed(),
      "\nPassengerCapacity :",
      this.getPassengerCapacity(),
    );
  }

  clone(): PassengerAircraft {
    return new PassengerAircraft(this.getName(), this.getSpeed(), this.getPassengerCapacity());
  }
}

class CombatAircraft extends Aircraft {
  private weapon: string;
  private missileCount: number;

  constructor(
    name: string = "F-16 Fighter",
    weapon: string = "Missiles",
    maxspeed: number = 2100,
    missileCount: number = 6,
  ) {
    super(name, maxspeed);
    this.weapon = weapon;
    this.missileCount = missileCount;
  }

  setMissileCount(missileCount: number): void {
    this.missileCount = missileCount;
  }

  getMissileCount(): number {
    return this.missileCount;
  }

  getWeapon(): string {
    return this.weapon;
  }

  display() {
    console.log(
      "Name :",
      this.getName(),
      "\nWeapon :",
      this.getWeapon(),
      "\nSpeed :",
      this.getSpeed(),
      "\nMissileCount :",
      this.getMissileCount(),
    );
  }

  clone(): CombatAircraft {
    return new CombatAircraft(
      this.getName(),
      this.getWeapon(),
      this.getSpeed(),
      this.getMissileCount(),
    );
  }
}

const passengerPrototype = new PassengerAircraft();
passengerPrototype.display();

console.log("\n----- clone -----");
const flightA = passengerPrototype.clone();
flightA.setName("Boeing 141");
flightA.display();

const customPassenger = new PassengerAircraft("Airbus A380", 1020, 853);
customPassenger.display();

console.log("\n----- combat -----");
const combatPrototype = new CombatAircraft();
console.log("\n----- clone -----");
const jetA = combatPrototype.clone();
jetA.setName("F-22 Raptor");
jetA.display();

console.log("\n----- Array -----");
const arr: Aircraft[] = new Array(10); // const arr: Aircraft[] = [];

for (let i = 0; i < 10; i++) {
  const clone = passengerPrototype.clone();
  clone.setName(`Boeing ${747 + i * 10}`);
  arr[i] = clone; // arr.push(clone);
}
for (const aircraft of arr) {
  aircraft.display();
  console.log("\n");
}

console.log("\n----- Registry -----");
const registry = new AircraftRegistry();
registry.addAircraft(passengerPrototype);
registry.addAircraft(combatPrototype);
registry.addAircraft(customPassenger);
registry.addAircraft(flightA);
registry.addAircraft(jetA);

registry.getAircraftbyName("F-22 Raptor")?.display();
registry.getAircraftbyName("Airbus A380")?.display();
registry.getAircraftbyName("Boeing 141")?.display();
registry.getAircraftbyName("Non-existent Aircraft")?.display();
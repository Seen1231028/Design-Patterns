interface Prototype {
  clone(): Prototype;
}

abstract class Aircraft implements Prototype {
  constructor(
    protected name: string,
    protected weapon: string = "None",
    protected speed: number
  ) {
    this.name = name;
    this.weapon = weapon;
    this.speed = speed;
  }

  setName(name: string) {
    this.name = name;
  }

  setWeapon(weapon: string) {
    this.weapon = weapon;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  abstract display(): void;
  abstract clone(): Aircraft;
}

class PassengerAircraft extends Aircraft {
  private passengerCapacity: number;

  constructor(
    nameOrPrototype: string | PassengerAircraft = "Boeing 747",
    weapon: string = "None",
    speed: number = 900,
    passengerCapacity: number = 400
  ) {
    if (typeof nameOrPrototype === "object") {
      super(
        nameOrPrototype.name,
        nameOrPrototype.weapon,
        nameOrPrototype.speed
      );
      this.passengerCapacity = nameOrPrototype.passengerCapacity;
    } else {
      super(nameOrPrototype, weapon, speed);
      this.passengerCapacity = passengerCapacity;
    }
  }

  static createDefault(): PassengerAircraft {
    return new PassengerAircraft();
  }

  display() {
    console.log(
      "Name :",
      this.name,
      "\nWeapon :",
      this.weapon,
      "\nSpeed :",
      this.speed,
      "\nPassengerCapacity :",
      this.passengerCapacity
    );
  }

  clone(): PassengerAircraft {
    return new PassengerAircraft(this);
  }
}

class CombatAircraft extends Aircraft {
  private missileCount: number;

  constructor(
    nameOrPrototype: string | CombatAircraft = "F-16 Fighter",
    weapon: string = "Missiles",
    speed: number = 2100,
    missileCount: number = 6
  ) {
    if (typeof nameOrPrototype === "object") {
      super(
        nameOrPrototype.name,
        nameOrPrototype.weapon,
        nameOrPrototype.speed
      );
      this.missileCount = nameOrPrototype.missileCount;
    } else {
      super(nameOrPrototype, weapon, speed);
      this.missileCount = missileCount;
    }
  }

  static createDefault(): CombatAircraft {
    return new CombatAircraft();
  }

  display() {
    console.log(
      "Name :",
      this.name,
      "\nWeapon :",
      this.weapon,
      "\nSpeed :",
      this.speed,
      "\nMissileCount :",
      this.missileCount
    );
  }

  clone(): CombatAircraft {
    return new CombatAircraft(this);
  }
}

const passengerPrototype = PassengerAircraft.createDefault();
passengerPrototype.display();

console.log("\n----- clone -----");
const flightA = passengerPrototype.clone();
flightA.setName("Boeing 141");
flightA.display();

const customPassenger = new PassengerAircraft("Airbus A380", "None", 1020, 853);
customPassenger.display();

console.log("\n----- combat -----");
const combatPrototype = CombatAircraft.createDefault();
const jetA = combatPrototype.clone();
jetA.display();

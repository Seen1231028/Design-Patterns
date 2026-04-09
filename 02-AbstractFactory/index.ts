interface Engine {
  start(): void;
}

interface LifeSupport {
  activate(): void;
}

interface Navigation {
  navigation(): void;
}

class ChemicalEngine implements Engine {
  start(): void {
    console.log("ChemicalEngine Start!!");
  }
}

class NuclearEngine implements Engine {
  start(): void {
    console.log("NuclearEngine Start!!");
  }
}

class IonEngine implements Engine {
  start(): void {
    console.log("IonEngine Start!!");
  }
}

class BasicLifeSupport implements LifeSupport {
  activate(): void {
    console.log("BasicLifeSupport activate!!");
  }
}

class AdvancedLifeSupport implements LifeSupport {
  activate(): void {
    console.log("Advanced LifeSupport activate!!");
  }
}

class SelfRepairLifeSupport implements LifeSupport {
  activate(): void {
    console.log("SelfRepair LifeSupport activate!!");
  }
}

class GpsNavigation implements Navigation {
  navigation(): void {
    console.log("GPS Navigation ON!!");
  }
}

class AiNavigation implements Navigation {
  navigation(): void {
    console.log("Ai Navigation ON!!");
  }
}

class QuantumNavigation implements Navigation {
  navigation(): void {
    console.log("Quantum Navigation ON!!");
  }
}

interface MissionFactory {
  createEngine(): Engine;
  createLifeSupport(): LifeSupport;
  createNavigation(): Navigation;
}

class MoonMission implements MissionFactory {
  createEngine() : Engine{
    return new ChemicalEngine();
  }
  createLifeSupport() : LifeSupport{
    return new BasicLifeSupport();
  }
  createNavigation() : Navigation{
    return new GpsNavigation();
  }
}

class MarsMission implements MissionFactory {
  createEngine() : Engine {
    return new NuclearEngine();
  }
  createLifeSupport() : LifeSupport {
    return new AdvancedLifeSupport();
  }
  createNavigation()  : Navigation {
    return new AiNavigation();
  }
}

class DeepSpaceMission implements MissionFactory {
  createEngine() : Engine {
    return new IonEngine();
  }
  createLifeSupport() : LifeSupport {
    return new SelfRepairLifeSupport();
  }
  createNavigation() : Navigation {
    return new QuantumNavigation();
  }
}

class Client {
  constructor(private factory: MissionFactory) {}

  lauchMission() {
    const engine = this.factory.createEngine();
    const lifesupport = this.factory.createLifeSupport();
    const nav = this.factory.createNavigation();

    engine.start();
    lifesupport.activate();
    nav.navigation();
  }
}

const moon = new MoonMission();
const mars = new MarsMission();
const deepspace = new DeepSpaceMission();


console.log("------Moon Mission-----")
let client = new Client(moon);
client.lauchMission();
console.log("------Mars Mission-----")
client = new Client(mars);
client.lauchMission();

console.log("------DeepSpace Mission-----")
client = new Client(deepspace);
client.lauchMission();

let factory : MissionFactory = new MoonMission();
let engine = factory.createEngine();
let lifesupport = factory.createLifeSupport();
let nav = factory.createNavigation();

console.log("------lauch Mission moon-----")
engine.start();
lifesupport.activate();
nav.navigation();

factory = new MarsMission()
engine = factory.createEngine();
// lifesupport = factory.createLifeSupport();
nav = factory.createNavigation();


console.log("------lauch Mission mars-----")
engine.start();
//lifesupport.activate();
nav.navigation();


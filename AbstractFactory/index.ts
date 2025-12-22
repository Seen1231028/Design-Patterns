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
  createEngine() {
    return new ChemicalEngine();
  }
  createLifeSupport() {
    return new BasicLifeSupport();
  }
  createNavigation() {
    return new GpsNavigation();
  }
}

class MarsMission implements MissionFactory {
  createEngine() {
    return new NuclearEngine();
  }
  createLifeSupport() {
    return new AdvancedLifeSupport();
  }
  createNavigation() {
    return new AiNavigation();
  }
}

class DeepSpaceMission implements MissionFactory {
  createEngine() {
    return new IonEngine();
  }
  createLifeSupport() {
    return new SelfRepairLifeSupport();
  }
  createNavigation() {
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

[new MoonMission(), new MarsMission(), new DeepSpaceMission()].forEach(
  (mission) => {
    new Client(mission).lauchMission();
    console.log("----------------");
  }
);

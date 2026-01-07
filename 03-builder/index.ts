//Product
class Planet {
  private core: string;
  private mantle: string;
  private asthenosphere: string;
  private lithosphere: string;
  private clouds: string;
  private life: string;
  private continentalCrust: boolean = false;
  private oceanicCrust: boolean = false;
  private metallicHydrogen: boolean = false;
  private liquidHydrogen: boolean = false;
  private gaseousHydrogen: boolean = false;

  constructor(){
    this.core = "";
    this.mantle = "";
    this.asthenosphere = "";
    this.lithosphere = "";
    this.clouds = "";
    this.life = "";
  }

  setCore(core: string) {
    return this.core = core;
  }

  setMantle(mantle: string) {
    return this.mantle = mantle;
  }

  setAsthenosphere(asthenosphere: string) {
    return this.asthenosphere = asthenosphere;
  }

  setLithosphere(lithosphere: string) {
    return this.lithosphere = lithosphere;
  }

  setClouds(clouds: string) {
    return this.clouds = clouds;
  }

  setLife(life: string) {
    return this.life = life;
  }

  setContinentalCrust(value: boolean) {
    return this.continentalCrust = value;
  }

  setOceanicCrust(value: boolean) {
    return this.oceanicCrust = value;
  }

  setMetallicHydrogen(value: boolean) {
    return this.metallicHydrogen = value;
  }

  setLiquidHydrogen(value: boolean) {
    return this.liquidHydrogen = value;
  }

  setGaseousHydrogen(value: boolean) {
    return this.gaseousHydrogen = value;
  }

  show(): void {
    console.log("----- Planet Info -----");

    if (this.core) console.log("Core:", this.core);
    if (this.mantle) console.log("Mantle:", this.mantle);
    if (this.asthenosphere) console.log("Asthenosphere:", this.asthenosphere);
    if (this.lithosphere) console.log("Lithosphere:", this.lithosphere);
    if (this.clouds) console.log("Clouds:", this.clouds);
    if (this.life) console.log("Life:", this.life);

    console.log("Continental Crust:", this.continentalCrust);
    console.log("Oceanic Crust:", this.oceanicCrust);

    if (this.metallicHydrogen) console.log("Metallic Hydrogen");
    if (this.liquidHydrogen) console.log("Liquid Hydrogen");
    if (this.gaseousHydrogen) console.log("Gaseous Hydrogen");

    console.log("---------------------------\n");
  }
}

//Builder Interface
interface Builder {
  reset(): void;
  buildCore(): void;
  buildMantle(): void;
  buildAsthenosphere(): void;
  buildLithosphere(): void;
  buildContinentalCrust(): void;
  buildOceanicCrust(): void;
  buildLife(): void;
  buildMetallicHydrogen(): void;
  buildLiquidHydrogen(): void;
  buildGaseousHydrogen(): void;
  buildClouds(): void;
}

//Concrete Builder - Earth
class EarthBuilder implements Builder {
  private planet!: Planet;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.planet = new Planet();
  }

  buildCore(): void {
    this.planet.setCore("Earth Core");
  }

  buildMantle(): void {
    this.planet.setMantle("Earth Mantle");
  }

  buildAsthenosphere(): void {
    this.planet.setAsthenosphere("Earth Asthenosphere");
  }

  buildLithosphere(): void {
    this.planet.setLithosphere("Earth Lithosphere");
  }

  buildContinentalCrust(): void {
    this.planet.setContinentalCrust(true);
  }

  buildOceanicCrust(): void {
    this.planet.setOceanicCrust(true);
  }

  buildLife(): void {
    this.planet.setLife("Earth life");
  }

  buildMetallicHydrogen(): void {}
  buildLiquidHydrogen(): void {}
  buildGaseousHydrogen(): void {}

  buildClouds(): void {
    this.planet.setClouds("Earth clouds");
  }

  getResult(): Planet {
    return this.planet;
  }
}

//Concrete Builder - Jupiter
class JupiterBuilder implements Builder {
  private planet!: Planet;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.planet = new Planet();
  }

  buildCore(): void {
    this.planet.setCore("Dense rocky core");
  }

  buildMantle(): void {}
  buildAsthenosphere(): void {}
  buildLithosphere(): void {}
  buildContinentalCrust(): void {}
  buildOceanicCrust(): void {}
  buildLife(): void {}

  buildMetallicHydrogen(): void {
    this.planet.setMetallicHydrogen(true);
  }

  buildLiquidHydrogen(): void {
    this.planet.setLiquidHydrogen(true);
  }

  buildGaseousHydrogen(): void {
    this.planet.setGaseousHydrogen(true);
  }

  buildClouds(): void {
    this.planet.setClouds("Ammonia clouds & Great Red Spot");
  }

  getResult(): Planet {
    return this.planet;
  }
}

//Director
class Director {

  makeEarth(builder: Builder) {
    builder.reset();
    builder.buildCore();
    builder.buildMantle();
    builder.buildAsthenosphere();
    builder.buildLithosphere();
    builder.buildContinentalCrust();
    builder.buildOceanicCrust();
    builder.buildLife();
    builder.buildClouds();
  }

  makeJupiter(builder: Builder) {
    builder.reset();
    builder.buildCore();
    builder.buildMetallicHydrogen();
    builder.buildLiquidHydrogen();
    builder.buildGaseousHydrogen();
    builder.buildClouds();
  }
}

const earth = new EarthBuilder();
const device = new Director();
device.makeEarth(earth);
earth.getResult().show();
const jupiter = new JupiterBuilder();
device.makeJupiter(jupiter);
jupiter.getResult().show();
class Sun {
  private static instance: Sun;

  private temperature: number;
  private energyLevel: number;

  private constructor() {
    this.temperature = 5000;
    this.energyLevel = 100;
    console.log("Sun is born");
  }

  static getInstance(): Sun {
    if (!Sun.instance) {
      Sun.instance = new Sun();
    }
    return Sun.instance;
  }

  shine() {
    console.log("Sun Shine ('w')");
  }

  getTemperature() {
    return this.temperature;
  }

  provideTemperature() {
    console.log("Sun provides heat to Earth (+)");
    this.temperature += 100;
  }

  releaseTemperature() {
    console.log("Sun release heat to Earth (-)");
    this.temperature -= 100;
  }


  provideEnergy() {
    console.log("Sun provides energy to Earth (+)");
    this.energyLevel += 1;
  }

  releaseEnergy() {
    console.log("Sun release energy to Earth (-)");
    this.energyLevel -= 1;
  }

  getEnergyLevel() {
    return this.energyLevel;
  }
}

const sun = Sun.getInstance();

console.log("----sun shine----");
sun.shine();

console.log("----sun temp----");
console.log("Temp : ", sun.getTemperature());
console.log("----sun energy----");
console.log("Energy left : ", sun.getEnergyLevel(), "%");

console.log("----sun-provide-energy----");
sun.provideEnergy();

console.log("Sun Energy : ", sun.getEnergyLevel(), "%");

console.log("----sun-release-energy----");
sun.releaseEnergy();

console.log("Sun Energy : ", sun.getEnergyLevel(), "%");

console.log("----sun-provide-temp----");
sun.provideTemperature();

console.log("Sun Temp : ", sun.getTemperature());

console.log("----sun-release-temp----");
sun.releaseTemperature();

console.log("Sun Temp : ", sun.getTemperature());

const sun1 = Sun.getInstance();
console.log(sun1.getEnergyLevel());
console.log(sun1.getTemperature());
sun1.provideTemperature()

console.log(sun.getTemperature());
console.log(sun1.getTemperature());

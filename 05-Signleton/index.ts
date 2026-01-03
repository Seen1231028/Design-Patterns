class Sun {
  private static instance: Sun;

  private temperature: string;
  private energyLevel: number;

  private constructor() {
    this.temperature = "5000 °c";
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
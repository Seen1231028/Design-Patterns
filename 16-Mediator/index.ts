interface IKitchenMediator {
  onMeatGrilled(): void;
  onSaladPrepped(): void;
  onPlateAssembled(): void;
}

class HeadChefMediator implements IKitchenMediator {
  private isMeatReady = false;
  private isSaladReady = false;

  private grill!: GrillSection;
  private salad!: SaladSection;
  private plating!: PlatingSection;

  setIsMeatReady(ready: boolean) {
    this.isMeatReady = ready;
  }

  setIsSaladReady(ready: boolean) {
    this.isSaladReady = ready;
  }

  getIsMeatReady(): boolean {
    return this.isMeatReady;
  }

  getIsSaladReady(): boolean {
    return this.isSaladReady;
  }

  public registerSections(
    grill: GrillSection,
    salad: SaladSection,
    plating: PlatingSection,
  ) {
    this.grill = grill;
    this.salad = salad;
    this.plating = plating;
  }

  public onMeatGrilled(): void {
    this.setIsMeatReady(true);
    console.log("[Chef]: Meat is grilled! checking if salad is ready...");
    this.checkReadiness();
  }

  public onSaladPrepped(): void {
    this.setIsSaladReady(true);
    console.log("[Chef]: Salad is prepped! checking if meat is ready...");
    this.checkReadiness();
  }

  private checkReadiness(): void {
    if (this.getIsMeatReady() && this.getIsSaladReady()) {
      console.log(
        "[Chef]: Meat and salad are ready! Let's start plating the dish...",
      );
      this.plating.startAssembling();

      this.setIsMeatReady(false);
      this.setIsSaladReady(false);
    } else {
      const missing = !this.getIsMeatReady() ? "meat" : "salad";
      console.log(
        `[Chef]: Still missing ${missing}... Everyone, let's speed up!`,
      );
    }
  }

  public onPlateAssembled(): void {
    console.log(
      "[Chef]: Food is ready! Server can take it to the customer's table",
    );
  }
}

class GrillSection {
  constructor(private mediator: IKitchenMediator) {}

  public cookSteak() {
    console.log("-> [Grill]: grilling Medium Rare...");
    console.log("-> [Grill]: steak is done!");
    this.mediator.onMeatGrilled();
  }
}

class SaladSection {
  constructor(private mediator: IKitchenMediator) {}

  public prepareSalad() {
    console.log("-> [Salad]: preparing salad...");
    console.log("-> [Salad]: salad is ready!");
    this.mediator.onSaladPrepped();
  }
}

class PlatingSection {
  constructor(private mediator: IKitchenMediator) {}

  public startAssembling() {
    console.log("-> [Plating]: assembling the dish...");
    console.log("-> [Plating]: dish is ready!");
    this.mediator.onPlateAssembled();
  }
}

const chef = new HeadChefMediator();

const grill = new GrillSection(chef);
const salad = new SaladSection(chef);
const plating = new PlatingSection(chef);

chef.registerSections(grill, salad, plating);

console.log("--- Starting to prepare a steak order ---");
grill.cookSteak();
salad.prepareSalad();

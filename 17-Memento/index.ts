interface Memento {}

class CharacterSnapshot implements Memento {
  constructor(
    private header: string,
    private outfit: string,
    private footwear: string,
  ) {
    this.header = header;
    this.outfit = outfit;
    this.footwear = footwear;
  }
  getOutfit() {
    return this.outfit;
  }
  getHeader() {
    return this.header;
  }

  getFootwear() {
    return this.footwear;
  }
}

class Hero {
  constructor(
    private header: string,
    private outfit: string,
    private footwear: string,
  ) {
    this.header = header;
    this.outfit = outfit;
    this.footwear = footwear;
    console.log(
      `[Hero]\n Starting header: ${this.header} \nStarting outfit: ${this.outfit} \nStarting footwear: ${this.footwear}`,
    );
  }

  setOutfit(outfit: string) {
    this.outfit = outfit;
    console.log(`[Hero] Changed outfit to: ${this.outfit}`);
  }

  getOutfit(): string {
    return this.outfit;
  }

  setHeader(header: string) {
    this.header = header;
    console.log(`[Hero] Changed header to: ${this.header}`);
  }

  getHeader(): string {
    return this.header;
  }

  getFootwear(): string {
    return this.footwear;
  }

  setFootwear(footwear: string) {
    this.footwear = footwear;
    console.log(`[Hero] Changed footwear to: ${this.footwear}`);
  }

  save(): Memento {
    return new CharacterSnapshot(
      this.getHeader(),
      this.getOutfit(),
      this.getFootwear(),
    );
  }

  restore(m: Memento) {
    const concrete = m as CharacterSnapshot;
    this.setHeader(concrete.getHeader());
    this.setOutfit(concrete.getOutfit());
    this.setFootwear(concrete.getFootwear());
    console.log(
      `[Hero] Restored to: header ${this.getHeader()}, outfit ${this.getOutfit()}, footwear ${this.getFootwear()}`,
    );
  }
}

class WardrobeHistory {
  private history: Memento[] = [];

  constructor(private hero: Hero) {
    this.hero = hero;
  }

  saveCurrentState() {
    console.log(`[System] Saving state before changes...`);
    this.history.push(this.hero.save());
  }

  undo() {
    if (this.history.length === 0) {
      console.log("[System] No previous outfit to restore.");
      return;
    }

    console.log(`[System] Undo...`);
    this.history.pop();
    const previousOutfit = this.history[this.history.length - 1];
    if (previousOutfit) {
      this.hero.restore(previousOutfit);
    }
  }

  showHistory(): void {
    console.log(`[System] History (${this.history.length} items):`);
    this.history.forEach((m, i) => {
      const concrete = m as CharacterSnapshot;
      console.log(
        `  ${i + 1}. ${concrete.getHeader()} - ${concrete.getOutfit()} - ${concrete.getFootwear()}`,
      );
    });
  }
}

const myHero = new Hero("Glasses", "Default Rags", "unshod");
const history = new WardrobeHistory(myHero);
history.saveCurrentState();

myHero.setHeader("Helmet of Valor");
myHero.setFootwear("Boots of Swiftness");
myHero.setOutfit("Leather Armor");
history.saveCurrentState();

myHero.setHeader("Crown of Wisdom");
myHero.setFootwear("Robes of the Archmage");
myHero.setOutfit("Mage Robes");
history.saveCurrentState();

console.log("\n--- Current Wardrobe History ---");
history.showHistory();

console.log("\n--- Oops! Don't like the Mage Robes ---");
history.undo();

history.showHistory();

console.log("\n--- Undo again! ---");
history.undo();

console.log("\n--- Final Wardrobe History ---");
history.showHistory();

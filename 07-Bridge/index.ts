interface RenderEngine {
  init(): void;
  drawSprite(name: string, x: number, y: number): void;
  drawEffect(effect: string, x: number, y: number): void;
  shutdown(): void;
}

class OpenGLEngine implements RenderEngine {
  private width: number;
  private height: number;
  private isFullScreen: boolean;
  private readonly engineName: string;
  private readonly deviceName: string;

  constructor(
    width: number,
    height: number,
    isFullScreen: boolean,
    deviceName: string,
    engineName: string,
  ) {
    this.width = width;
    this.height = height;
    this.isFullScreen = isFullScreen;
    this.engineName = engineName;
    this.deviceName = deviceName;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  setFullScreen(isFullScreen: boolean): void {
    this.isFullScreen = isFullScreen;
  }

  getWidth(): number {
    return this.width;
  }
  getHeight(): number {
    return this.height;
  }
  getIsFullScreen(): boolean {
    return this.isFullScreen;
  }

  getEngineName(): string {
    return this.engineName;
  }
  getDeviceName(): string {
    return this.deviceName;
  }

  init(): void {
    console.log(
      `[${this.getEngineName()}] Initialized on ${this.getDeviceName()}`,
    );
    console.log(
      `[${this.getEngineName()}] Resolution: ${this.getWidth()}x${this.getHeight()} | Fullscreen: ${this.getIsFullScreen()}`,
    );
  }
  drawSprite(name: string, x: number, y: number): void {
    console.log(`[OpenGL] glDrawArrays → sprite="${name}" at (${x}, ${y})`);
  }
  drawEffect(effect: string, x: number, y: number): void {
    console.log(
      `[OpenGL] GLSL particle shader → effect="${effect}" at (${x}, ${y})`,
    );
  }
  shutdown(): void {
    console.log("[OpenGL] Context destroyed");
  }
}

class VulkanEngine implements RenderEngine {
  private width: number;
  private height: number;
  private isFullScreen: boolean;
  private readonly engineName: string;
  private readonly deviceName: string;

  constructor(
    width: number,
    height: number,
    isFullScreen: boolean,
    deviceName: string,
    engineName: string,
  ) {
    this.width = width;
    this.height = height;
    this.isFullScreen = isFullScreen;
    this.engineName = engineName;
    this.deviceName = deviceName;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  setFullScreen(isFullScreen: boolean): void {
    this.isFullScreen = isFullScreen;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getIsFullScreen(): boolean {
    return this.isFullScreen;
  }

  getEngineName(): string {
    return this.engineName;
  }

  getDeviceName(): string {
    return this.deviceName;
  }

  init(): void {
    console.log(
      `[${this.getEngineName()}] Initialized on ${this.getDeviceName()}`,
    );
    console.log(
      `[${this.getEngineName()}] Resolution: ${this.getWidth()}x${this.getHeight()} | Fullscreen: ${this.getIsFullScreen()}`,
    );
  }
  drawSprite(name: string, x: number, y: number): void {
    console.log(`[Vulkan] vkCmdDraw → sprite="${name}" at (${x}, ${y})`);
  }
  drawEffect(effect: string, x: number, y: number): void {
    console.log(`[Vulkan] Compute shader → effect="${effect}" at (${x}, ${y})`);
  }
  shutdown(): void {
    console.log("[Vulkan] Device & swapchain destroyed");
  }
}

class DirectXEngine implements RenderEngine {
  private width: number;
  private height: number;
  private isFullScreen: boolean;
  private readonly engineName: string;
  private readonly deviceName: string;

  constructor(
    width: number,
    height: number,
    isFullScreen: boolean,
    deviceName: string,
    engineName: string,
  ) {
    this.width = width;
    this.height = height;
    this.isFullScreen = isFullScreen;
    this.engineName = engineName;
    this.deviceName = deviceName;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  setFullScreen(isFullScreen: boolean): void {
    this.isFullScreen = isFullScreen;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getIsFullScreen(): boolean {
    return this.isFullScreen;
  }

  getEngineName(): string {
    return this.engineName;
  }

  getDeviceName(): string {
    return this.deviceName;
  }

  init(): void {
    console.log(
      `[${this.getEngineName()}] Initialized on ${this.getDeviceName()}`,
    );
    console.log(
      `[${this.getEngineName()}] Resolution: ${this.getWidth()}x${this.getHeight()} | Fullscreen: ${this.getIsFullScreen()}`,
    );
  }

  drawSprite(name: string, x: number, y: number): void {
    console.log(`[DirectX] DrawSprite → sprite="${name}" at (${x}, ${y})`);
  }

  drawEffect(effect: string, x: number, y: number): void {
    console.log(`[DirectX] DrawEffect → effect="${effect}" at (${x}, ${y})`);
  }

  shutdown(): void {
    console.log("[DirectX] Device and context destroyed");
  }
}

abstract class GameCharacter {
  private x: number = 0;
  private y: number = 0;
  protected renderer: RenderEngine;

  constructor(renderer: RenderEngine) {
    this.renderer = renderer;
    this.renderer.init();
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  setEngine(renderer: RenderEngine): void {
    this.renderer.shutdown();
    this.renderer = renderer;
    this.renderer.init();
  }

  moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  abstract render(): void;
  abstract attack(): void;

  destroy(): void {
    this.renderer.shutdown();
  }
}

class Warrior extends GameCharacter {
  render(): void {
    this.renderer.drawSprite("warrior_idle", this.getX(), this.getY());
  }
  attack(): void {
    this.renderer.drawEffect("sword_slash", this.getX() + 40, this.getY() - 10);
    console.log("⚔️  Warrior swings sword!");
  }
}

class Mage extends GameCharacter {
  render(): void {
    this.renderer.drawSprite("mage_idle", this.getX(), this.getY());
  }
  attack(): void {
    this.renderer.drawEffect("fireball", this.getX() + 30, this.getY() - 10);
    console.log("🔥  Mage casts fireball!");
  }
}

class Rogue extends GameCharacter {
  render(): void {
    this.renderer.drawSprite("rogue_stealth", this.getX(), this.getY());
  }
  attack(): void {
    this.renderer.drawEffect("shadow_stab", this.getX() + 20, this.getY() + 5);
    console.log("🗡️  Rogue backstabs from shadow!");
  }
}

function runDemo(): void {
  const myDevice = "NVIDIA GeForce RTX 4090";
  console.log("=== Warrior on OpenGL ===");
  const warrior = new Warrior(
    new OpenGLEngine(1920, 1080, true, myDevice, "OpenGL 4.6"),
  );
  warrior.moveTo(100, 200);
  warrior.render();
  warrior.attack();
  warrior.destroy();

  console.log("\n=== Mage on Vulkan ===");
  const mage = new Mage(
    new VulkanEngine(1920, 1080, false, myDevice, "Vulkan 1.3"),
  );
  mage.moveTo(300, 150);
  mage.render();
  mage.attack();
  mage.destroy();

  console.log("\n=== Rogue on DirectX ===");
  const rogue = new Rogue(
    new DirectXEngine(1920, 1080, false, myDevice, "DirectX 12"),
  );
  rogue.moveTo(50, 80);
  rogue.render();
  rogue.attack();
  rogue.destroy();

  console.log("\n=== Swap engine at runtime: Warrior → Vulkan ===");
  warrior.setEngine(new VulkanEngine(1920, 1080, true, myDevice, "Vulkan 1.3"));
  warrior.render();
  warrior.attack();
  warrior.destroy();

  const arr : GameCharacter[] = [
    new Warrior(new OpenGLEngine(1920, 1080, true, myDevice, "OpenGL 4.6")),
    new Mage(new VulkanEngine(1920, 1080, false, myDevice, "Vulkan 1.3")),
    new Rogue(new DirectXEngine(1920, 1080, false, myDevice, "DirectX 12")),
  ];

  for (const c of arr) {
    c.render();
    c.attack();
    c.destroy();
  }

}

runDemo();
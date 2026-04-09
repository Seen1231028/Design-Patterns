class DesktopConfig {
  protected os: string = "";
  protected windowManager: string = "";
  protected statusBar: string = "";
  protected notificationDaemon: string = "";
  protected browser: string = "";
  protected terminal: string = "";

  public setOS(os: string): void {
    this.os = os;
  }

  public setWindowManager(wm: string): void {
    this.windowManager = wm;
  }

  public setStatusBar(statusBar: string): void {
    this.statusBar = statusBar;
  }

  public setNotificationDaemon(notificationDaemon: string): void {
    this.notificationDaemon = notificationDaemon;
  }

  public setBrowser(browser: string): void {
    this.browser = browser;
  }

  public setTerminal(terminal: string): void {
    this.terminal = terminal;
  }

  public getOS(): string {
    return this.os;
  }

  public getWindowManager(): string {
    return this.windowManager;
  }

  public getStatusBar(): string {
    return this.statusBar;
  }

  public getNotificationDaemon(): string {
    return this.notificationDaemon;
  }

  public getBrowser(): string {
    return this.browser;
  }

  public getTerminal(): string {
    return this.terminal;
  }


  public showConfig(): void {
    console.log("=== Desktop Environment Setup ===");
    if (this.os) console.log(`OS: ${this.os}`);
    if (this.windowManager)
      console.log(`Window Manager: ${this.getWindowManager()}`);
    if (this.getStatusBar()) console.log(`Status Bar: ${this.getStatusBar()}`);
    if (this.getNotificationDaemon())
      console.log(`Notifications: ${this.getNotificationDaemon()}`);
    if (this.browser) console.log(`Browser: ${this.getBrowser()}`);
    if (this.terminal) console.log(`Terminal: ${this.getTerminal()}`);
    console.log("=================================\n");
  }
}

interface IDesktopBuilder {
  reset(): void;
  buildOS(name: string): void;
  buildWindowManager(): void;
  buildStatusBar(): void;
  buildNotificationDaemon(): void;
  buildBrowser(): void;
  buildTerminal(): void;
  getResult(): DesktopConfig;
}

class TilingWMBuilder implements IDesktopBuilder {
  private config!: DesktopConfig;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.config = new DesktopConfig();
  }

  buildOS(name: string = "Arch linux"): void {
    this.config.setOS(name);
  }
  buildWindowManager(): void {
    this.config.setWindowManager("i3wm");
  }
  buildStatusBar(): void {
    this.config.setStatusBar("polybar");
  }
  buildNotificationDaemon(): void {
    this.config.setNotificationDaemon("dunst");
  }
  buildBrowser(): void {
    this.config.setBrowser("Brave");
  }
  buildTerminal(): void {
    this.config.setTerminal("Alacritty");
  }

  getResult(): DesktopConfig {
    return this.config;
  }
}

class FloatingWMBuilder implements IDesktopBuilder {
  private config!: DesktopConfig;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.config = new DesktopConfig();
  }

  buildOS(name: string = "Ubuntu"): void {
    this.config.setOS(name);
  }
  buildWindowManager(): void {
    this.config.setWindowManager("XFCE");
  }
  buildStatusBar(): void {
    this.config.setStatusBar("xfce4-panel");
  }
  buildNotificationDaemon(): void {
    this.config.setNotificationDaemon("notify-osd");
  }
  buildBrowser(): void {
    this.config.setBrowser("Firefox");
  }
  buildTerminal(): void {
    this.config.setTerminal("GNOME Terminal");
  } 

  getResult(): DesktopConfig {
    return this.config;
  }
}

class DesktopDirector {
  private builder: IDesktopBuilder;

  constructor(builder: IDesktopBuilder) {
    this.builder = builder;
  }

  changeBuilder(builder: IDesktopBuilder): void {
    this.builder = builder;
  }

  buildDailyDriverSetup(name: string): void {
    this.builder.reset();
    this.builder.buildOS(name);
    this.builder.buildWindowManager();
    this.builder.buildStatusBar();
    this.builder.buildNotificationDaemon();
    this.builder.buildBrowser();
    this.builder.buildTerminal();
  }

  buildMinimalSetup(name: string): void {
    this.builder.reset();
    this.builder.buildOS(name);
    this.builder.buildWindowManager();
    this.builder.buildTerminal();
  }

  buildMinimumSetup(name: string): void {
    this.builder.reset();
    this.builder.buildOS(name);
    this.builder.buildWindowManager();
    this.builder.buildTerminal();
    this.builder.buildBrowser();
  }
}

const tilingBuilder = new TilingWMBuilder();
const director = new DesktopDirector(tilingBuilder);

console.log("--- Building Tiling WM Daily Driver ---");
director.buildDailyDriverSetup("Arch Linux");
tilingBuilder.getResult().showConfig();

console.log("--- Building Tiling WM Minimal Setup ---");
director.buildMinimalSetup("Arch Linux");
tilingBuilder.getResult().showConfig();

const floatingBuilder = new FloatingWMBuilder();
director.changeBuilder(floatingBuilder);

console.log("--- Building Floating WM Daily Driver ---");
director.buildDailyDriverSetup("Ubuntu");
floatingBuilder.getResult().showConfig();

console.log("--- Building Floating WM Minimal Setup ---");
director.buildMinimalSetup("Ubuntu");
floatingBuilder.getResult().showConfig();

console.log("--- Building Custom Desktop Setup ---");
const customBuilder = new TilingWMBuilder();
customBuilder.reset();
customBuilder.buildOS("Fedora");
customBuilder.buildWindowManager();
customBuilder.buildStatusBar();
customBuilder.buildNotificationDaemon();
customBuilder.buildBrowser();
customBuilder.buildTerminal();
const desktopConfig: DesktopConfig = customBuilder.getResult();
desktopConfig.showConfig();

const arr: FloatingWMBuilder[] = [];
for (let i = 0; i < 5; i++) {
  const builder = new FloatingWMBuilder();
  builder.buildOS(`Custom OS ${i + 1}`);
  builder.buildWindowManager();
  builder.buildStatusBar();
  builder.buildNotificationDaemon();
  builder.buildBrowser();
  builder.buildTerminal();
  arr.push(builder);
}

for (const builder of arr) {
  const desktopConfig1: DesktopConfig = builder.getResult();
  desktopConfig1.showConfig();
}

class Data {
  constructor(
    private content: string,
    private source: string,
    private riskScore: number = 0,
  ) {
    this.content = content;
    this.source = source;
    this.riskScore = riskScore;
  }
  setContent(content: string): void {
    this.content = content;
  }
  setSource(source: string): void {
    this.source = source;
  }
  setRiskScore(score: number): void {
    this.riskScore = score;
  }
  getContent(): string {
    return this.content;
  }
  getSource(): string {
    return this.source;
  }
  getRiskScore(): number {
    return this.riskScore;
  }
}

interface Handler {
  setNext(handler: Handler): Handler;
  handle(data: Data): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler: Handler | null = null;
  private handlerName: string;

  constructor(handlerName: string) {
    this.handlerName = handlerName;
  }

  setHandlerName(name: string): void {
    this.handlerName = name;
  }

  getNext(): Handler | null {
    return this.nextHandler;
  }

  public getHandlerName(): string {
    return this.handlerName;
  }

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(data: Data): void {
    if (this.nextHandler) {
      this.nextHandler.handle(data);
    }
  }
}

class DarkWebScanner extends BaseHandler {
  constructor() {
    super("Dark Web Scanner");
  }

  handle(data: Data): void {
    if (data.getContent().includes("dark web")) {
      console.log("Scanning dark web source:", data.getSource());
      data.setRiskScore(data.getRiskScore() + 10);
    }
    super.handle(data);
  }
}

class KeywordDetector extends BaseHandler {
  private keywords = ["password", "database", "credit card", "dump", "leak"];

  constructor(keywords?: string[]) {
    super("Keyword Detector");
    if (keywords) {
      this.keywords = keywords;
    }
  }

  setKeywords(keywords: string[]): void {
    this.keywords = keywords;
  }

  getKeywords(): string[] {
    return this.keywords;
  }

  handle(data: Data): void {
    const found = this.keywords.some((keyword) =>
      data.getContent().toLowerCase().includes(keyword),
    );

    if (found) {
      console.log("Sensitive keyword detected");
      data.setRiskScore(data.getRiskScore() + 20);
    }
    super.handle(data);
  }
}

class CompanyDataMatcher extends BaseHandler {
  private companyDomains = ["mybank.com", "securepay.com"];

  constructor(companyDomains?: string[]) {
    super("Company Data Matcher");
    if (companyDomains) {
      this.companyDomains = companyDomains;
    }
  }

  setCompanyDomains(domains: string[]): void {
    this.companyDomains = domains;
  }

  getCompanyDomains(): string[] {
    return this.companyDomains;
  }

  handle(data: Data): void {
    const found = this.companyDomains.some((domain) =>
      data.getContent().toLowerCase().includes(domain),
    );

    if (found) {
      console.log("Company data detected");
      data.setRiskScore(data.getRiskScore() + 30);
    }

    super.handle(data);
  }
}

class RiskAnalyzer extends BaseHandler {
  constructor() {
    super("Risk Analyzer");
  }

  handle(data: Data): void {
    if (data.getRiskScore() >= 60) {
      console.log("High risk leak detected");
      super.handle(data);
    } else if (data.getRiskScore() >= 30) {
      console.log("Medium risk leak");
      super.handle(data);
    } else {
      console.log("Low risk");
    }

  }
}

class SecurityAlert extends BaseHandler {
  constructor() {
    super("Security Alert");
  }

  handle(data: Data): void {
    if (data.getRiskScore() >= 60) {
      console.log("Alert sent to security team!");
    } else {
      console.log("No alert required.");
    }
  }
}

const scanner = new DarkWebScanner();
const keyword = new KeywordDetector();
const company = new CompanyDataMatcher();
const risk = new RiskAnalyzer();
const alert = new SecurityAlert();

// scanner.setNext(keyword);
// keyword.setNext(company);
// company.setNext(risk);
// risk.setNext(alert);

scanner.setNext(keyword).setNext(company).setNext(risk).setNext(alert);
// scanner.setNext(company).setNext(alert);

// scanner.setNext(keyword).setNext(risk).setNext(alert);

const leak = new Data(
  "database leak mybank.com password dump",
  "dark web forum.",
);
const nonSensitiveLeak = new Data(
  "random data from unknown source",
  "dark web forum.",
);
console.log("--Sensitive Leak--\n");
scanner.handle(leak);
console.log("\n--Non Sensitive Leak--\n");
scanner.handle(nonSensitiveLeak);

console.log("\n--- scanner Handlers ---\n");
scanner.handle(leak)
console.log("\n--- keyword Handlers ---\n");
keyword.handle(leak);
console.log("\n--- company Handlers ---\n");
company.handle(leak);
console.log("\n--- risk Handlers ---\n");
risk.handle(leak);
console.log("\n--- alert Handlers ---\n");
alert.handle(leak);
abstract class DataReport {
    public generate(): void {
        console.log("------------------------------------------------");
        this.authenticate();
        this.fetchData(); 
        this.validate();
        this.customizeReport();
        this.normalize(); 
        this.render();
        this.export();           
        console.log("------------------------------------------------\n");
    }

    protected authenticate(): void {
        console.log("[Optional] DataReport: Authenticating with Standard API Key...");
    }

    protected normalize(): void {
        console.log("[Optional] DataReport: Normalizing data to standard JSON format... ✓");
    }

    protected export(): void {
        console.log("[Optional] DataReport: Exporting report as PDF... ✓");
    }

    protected customizeReport(): void {}

    protected abstract fetchData(): void;
    protected abstract validate(): void;
    protected abstract render(): void;
}

class SalesReport extends DataReport {
    constructor(
        private companyName: string,
        private chartType: string,
        private logoPath: string,
    ){
        super();
        this.companyName = companyName;
        this.chartType = chartType;
        this.logoPath = logoPath;
    }

    getAppName(): string {
        return this.companyName;
    }

    setAppName(name: string): void {
        this.companyName = name;
    }

    getChartType(): string {
        return this.chartType;
    }

    setChartType(type: string): void {
        this.chartType = type;
    }

    getLogoPath(): string {
        return this.logoPath;
    }

    setLogoPath(path: string): void {
        this.logoPath = path;
    }   
    
    protected fetchData(): void {
        console.log("[Abstract] SalesReport: Fetching data via SQL Database...");
    }

    protected validate(): void {
        console.log("[Abstract] SalesReport: Validating sales transaction figures...");
    }

    protected render(): void {
        console.log(`[Abstract] SalesReport: Rendering data as a [${this.getChartType()}]...`);
    }

    protected customizeReport(): void {
        console.log(`[Hook]     SalesReport: Adding Company Logo to the report header... (${this.getLogoPath()})`);
        console.log(`[Hook]     SalesReport: Adding Company Name to the report header... (${this.getAppName()})`);
    }
}

class HealthReport extends DataReport {
    constructor(
        private hospitalName: string,
        private proxyServer: string,
        private apiKey: string,
        private chartType: string,
    ){
        super();
        this.hospitalName = hospitalName;
        this.proxyServer = proxyServer;
        this.apiKey = apiKey;
        this.chartType = chartType;
    }

    getAppName(): string {
        return this.hospitalName;
    }

    setAppName(name: string): void {
        this.hospitalName = name;
    }

    getProxyServer(): string {
        return this.proxyServer;
    }

    setProxyServer(server: string): void {
        this.proxyServer = server;
    }

    getApiKey(): string {
        return this.apiKey;
    }

    setApiKey(key: string): void {
        this.apiKey = key;
    }

    getChartType(): string {
        return this.chartType;
    }

    setChartType(type: string): void {
        this.chartType = type;
    }
    
    protected authenticate(): void {
        console.log(`[Optional-Override] HealthReport: Authenticating with Proxy Server [${this.getProxyServer()}] via Secure Medical Portal (OAuth2)...`);
    }

    protected fetchData(): void {
        console.log(`[Abstract] HealthReport: Fetching data via External ${this.getAppName()} [${this.getApiKey()}]...`);
    }

    protected validate(): void {
        console.log("[Abstract] HealthReport: Validating patient health records safely...");
    }

    protected render(): void {
        console.log(`[Abstract] HealthReport: Rendering data as a [${this.getChartType()}]...`);
    }
}


console.log("=== Generating Sales Report ===");
const salesReport = new SalesReport("ABC Company", "Bar Chart", "/path/to/logo.png");
salesReport.generate();

const salesReport2 = new SalesReport("XYZ Corporation", "Line Chart", "/path/to/xyz_logo.png");
salesReport2.setChartType("Pie Chart");
salesReport2.setLogoPath("/path/to/xyz_logo_updated.png");
salesReport2.generate();

console.log("=== Generating Health Report ===");
const healthReport = new HealthReport("General Hospital", "proxy.example.com", "API_KEY_123", "Line Chart");
healthReport.generate();
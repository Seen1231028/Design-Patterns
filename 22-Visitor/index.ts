
interface SecurityScanner {
    visitRouter(router: Router): void;
    visitServer(server: Server): void;
}

class PortScanner implements SecurityScanner {
    visitRouter(router: Router): void {
        console.log(`-> [PortScanner] ${router.getIpAddress()} สแกนพอร์ต 22, 80, 443 บน Router`);
    }
    
    visitServer(server: Server): void {
        console.log(`-> [PortScanner] สแกนพอร์ตทั้งหมดที่เปิดอยู่บน ${server.getOs()} Server`);
    }
}

class MalwareScanner implements SecurityScanner {
    visitRouter(router: Router): void {
        console.log(`-> [MalwareScanner] ตรวจสอบการตั้งค่า DNS ปลอมแปลง และสแกนหา Firmware ที่ถูกดัดแปลงบน Router ${router.getIpAddress()}...`);
    }
    
    visitServer(server: Server): void {
        console.log(`-> [MalwareScanner] สแกนหา Rootkit, โทรจัน และไฟล์ที่ติดไวรัสในระบบไฟล์ของ ${server.getOs()}...`);
    }
}

interface NetworkDevice {
    accept(v: SecurityScanner): void;
}

class Router implements NetworkDevice {
    public ipAddress: string = "";

    constructor(ipaddress: string) {
        this.ipAddress = ipaddress;
    }

    setIpAddress(ip: string): void {
        this.ipAddress = ip;
    }

    getIpAddress(): string {
        return this.ipAddress;
    }

    accept(v: SecurityScanner): void {
        v.visitRouter(this); 
    }
}

class Server implements NetworkDevice {
    public os: string = "";

    constructor(os: string) {
        this.os = os;
    }

    setOs(os: string): void {
        this.os = os;
    }

    getOs(): string {
        return this.os;
    }
    
    accept(v: SecurityScanner): void {
        v.visitServer(this);
    }
}

const devices: NetworkDevice[] = [];

const myRouter = new Router("192.168.1.1");
const myServer = new Server("Linux");

devices.push(myRouter);
devices.push(myServer);

const portScanner = new PortScanner();
const malwareScanner = new MalwareScanner(); 

console.log("--- เริ่มการทำ Port Scan ---");
for (const device of devices) {
    device.accept(portScanner); 
}

console.log("\n--- เริ่มการทำ Malware Scan ---");
for (const device of devices) {
    device.accept(malwareScanner); 
}
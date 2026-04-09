interface TrafficObserver {
    onStatusChange(status: string, intersection: SmartIntersection): void;
}

class SmartIntersection {
    private observers: TrafficObserver[] = [];
    private trafficDensity: number;
    private locationName: string;

    constructor(locationName: string, trafficDensity: number) {
        this.locationName = locationName;
        this.trafficDensity = trafficDensity;
    }

    setTrafficDensity(density: number) {
        this.trafficDensity = density;
        console.log(`\n [Mainsystem]: Traffic density at ${this.getLocationName()} changed to ${this.getTrafficDensity()}`);
    }

    setlocationName(name: string) {
        this.locationName = name;
        console.log(`\n [Mainsystem]: Location name changed to ${this.locationName}`);
    }

    getTrafficDensity(): number {
        return this.trafficDensity;
    }

    getLocationName(): string {
        return this.locationName;
    }

    register(observer: TrafficObserver) {
        this.observers.push(observer);
    }

    unregister(observer: TrafficObserver) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    triggerEvent(status: string) {
        console.log(`\n [Mainsystem]: detected event -> ${status} at ${this.getLocationName()} with traffic density ${this.getTrafficDensity()}%`);
        this.observers.forEach(obs => obs.onStatusChange(status, this));
    }
}

class AmbulancePrioritySystem implements TrafficObserver {
    private vehicleId: string;

    constructor(vehicleId: string) {
        this.vehicleId = vehicleId;
    }

    setVehicleId(id: string) {
        this.vehicleId = id;
        console.log(`\n [${this.vehicleId}]: Vehicle ID updated to ${this.vehicleId}`);
    }

    getVehicleId(): string {
        return this.vehicleId;
    }

    onStatusChange(status: string, intersection: SmartIntersection) {
        if (status === "EMERGENCY") {
            console.log(`🚑 ${this.getVehicleId()}: Detected emergency at ${intersection.getLocationName()}.`);
        }
    }
}

class NavigationApp implements TrafficObserver {
    private appName: string;
    private transportMode: string;

    constructor(appName: string, transportMode: string) {
        this.appName = appName;
        this.transportMode = transportMode;
    }

    setAppName(name: string) {
        this.appName = name;
        console.log(`\n [${this.appName}]: App name updated to ${this.appName}`);
    }

    setTransportMode(mode: string) {
        this.transportMode = mode;
        console.log(`\n [${this.appName}]: Transport mode updated to ${this.transportMode}`);
    }

    getAppName(): string {
        return this.appName;
    }

    getTransportMode(): string {
        return this.transportMode;
    }


    onStatusChange(status: string, intersection: SmartIntersection) {
        if (status === "ACCIDENT") {
            console.log(`[${this.getAppName()} - Mode: ${this.getTransportMode()}]: Accident detected at "${intersection.getLocationName()}" with traffic density ${intersection.getTrafficDensity()}%`);
            
            if (intersection.getTrafficDensity() > 70) {
                if (this.getTransportMode() === "Car") {
                    console.log(`-> Car: Traffic congestion detected (${intersection.getTrafficDensity()}%) calculating new route...`);
                } else if (this.getTransportMode() === "Motorcycle") {
                    console.log(`-> Motorcycle: Heavy traffic (${intersection.getTrafficDensity()}%) please exercise caution when navigating`);
                }
            }
        } else if (status === "CLEAR") {
            console.log(`📱 [${this.getAppName()}]: Route "${intersection.getLocationName()}" is now clear`);
        }
    }
}

const intersection = new SmartIntersection("Route-123", 40);
const intersection1 = new SmartIntersection("Route-456", 60);
const intersection2 = new SmartIntersection("Route-789", 70);
const ambulance = new AmbulancePrioritySystem("Ambulance-001");
const ambulance2 = new AmbulancePrioritySystem("Ambulance-002");
const ambulance3 = new AmbulancePrioritySystem("Ambulance-003");
const navigation = new NavigationApp("MyGPS", "Car");
const navigation2 = new NavigationApp("GPS", "motorcycle");
const navigation3 = new NavigationApp("GPS-V2", "Car");

intersection.register(ambulance);
intersection.register(navigation);
intersection1.register(ambulance2);
intersection1.register(navigation2);
intersection2.register(ambulance3);
intersection2.register(navigation3);

intersection.triggerEvent("ACCIDENT");
intersection.triggerEvent("EMERGENCY");
intersection.triggerEvent("CLEAR");

intersection1.triggerEvent("ACCIDENT");
intersection1.triggerEvent("EMERGENCY");
intersection1.triggerEvent("CLEAR");

intersection2.triggerEvent("ACCIDENT");
intersection2.triggerEvent("EMERGENCY");
intersection2.triggerEvent("CLEAR");


console.log("\n--- Updating traffic density and triggering events again ---");
ambulance.onStatusChange("EMERGENCY", intersection);
navigation.onStatusChange("ACCIDENT", intersection);

intersection.unregister(ambulance);
console.log("\n--- Unregistered AmbulancePrioritySystem and triggering EMERGENCY event again ---");
intersection.triggerEvent("EMERGENCY");
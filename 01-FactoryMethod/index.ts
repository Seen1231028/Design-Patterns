interface IoT {
  connect(): void;
  initialize(): void;
  execute(): void;
  sendData(): void;
  shutdown(): void;
}

class SmartLight implements IoT {
  connect() {
    console.log("SmartLight connected");
  }

  initialize() {
    console.log("SmartLight initialized");
  }

  execute() {
    console.log("SmartLight turned ON");
  }

  sendData() {
    console.log("SmartLight status sent");
  }

  shutdown() {
    console.log("SmartLight disconnected");
  }
}

class SmartSwitch implements IoT {
  connect() {
    console.log("SmartSwitch connected");
  }

  initialize() {
    console.log("SmartSwitch initialized");
  }

  execute() {
    console.log("SmartSwitch turned ON");
  }

  sendData() {
    console.log("SmartSwitch status sent");
  }

  shutdown() {
    console.log("SmartSwitch disconnected");
  }
}

class SmartRemote implements IoT {
  connect() {
    console.log("SmartRemote connected");
  }

  initialize() {
    console.log("SmartRemote initialized");
  }

  execute() {
    console.log("SmartRemote turned ON");
  }

  sendData() {
    console.log("SmartRemote status sent");
  }

  shutdown() {
    console.log("SmartRemote disconnected");
  }
}

class Sensor implements IoT {
  connect() {
    console.log("Sensor connected");
  }

  initialize() {
    console.log("Sensor initialized");
  }

  execute() {
    console.log("Sensor turned ON");
  }

  sendData() {
    console.log("Sensor status sent");
  }

  shutdown() {
    console.log("Sensor disconnected");
  }
}

class Drones implements IoT {
  connect() {
    console.log("Drones connected");
  }

  initialize() {
    console.log("Drones initialized");
  }

  execute() {
    console.log("Drones turned ON");
  }

  sendData() {
    console.log("Drones status sent");
  }

  shutdown() {
    console.log("Drones disconnected");
  }
}

abstract class DeviceFactory {
  abstract createDevice(): IoT;

  onDevice(): void {
    const device = this.createDevice();
    device.connect();
    device.initialize();
    device.execute();
    device.sendData();
    device.shutdown();
  }
}

class MakeSmartlight extends DeviceFactory {
  createDevice(): IoT {
    return new SmartLight();
  }
}

class MakeSmartRemote extends DeviceFactory {
  createDevice(): IoT {
    return new SmartRemote();
  }
}

class MakeSmartSwitch extends DeviceFactory {
  createDevice(): IoT {
    return new SmartSwitch();
  }
}

class MakeSensor extends DeviceFactory {
  createDevice(): IoT {
    return new Sensor();
  }
}

class MakeDrones extends DeviceFactory {
  createDevice(): IoT {
    return new Drones();
  }
}

[
  new MakeSmartlight(),
  new MakeSmartRemote(),
  new MakeSmartSwitch(),
  new MakeSensor(),
  new MakeDrones()
].forEach((Client) => {
  Client.onDevice();
});
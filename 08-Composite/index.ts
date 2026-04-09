interface Attack {
    execute(): void;
    showDetails(indentation: string): void;
    getAttackCount(): number;
    findAttack(name: string): Attack | null;
}

class SimpleAttack implements Attack {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    execute(): void {
        console.log(`[START] ${this.name}`);
        const success = Math.random() > 0.5;
        if (success) {
            console.log(`[SUCCESS] ${this.name} executed successfully.`);
        } else {
            console.log(`[FAILURE] ${this.name} execution failed.`);
        }
    }

    showDetails(indentation: string = ''): void {
        console.log(`${indentation}- Simple Attack: ${this.name}`);
    }

    getAttackCount(): number {
        return 1;
    }

    findAttack(name: string): Attack | null {
        return this.name === name ? this : null;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }
}

class CompositeAttack implements Attack {
    private attacks: Attack[] = [];
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    add(attack: Attack): void {
        this.attacks.push(attack);
    }
    
    remove(attack: Attack): void {
        const index = this.attacks.indexOf(attack);
        if (index !== -1) {
            this.attacks.splice(index, 1);
        }
    }

    getAttackCount(): number {
        let count = 0;
        for (const attack of this.attacks) {
            count += attack.getAttackCount();
        }
        return count;
    }

    findAttack(name: string): Attack | null {
        if (this.name === name) return this;
        for (const attack of this.attacks) {
            const found = attack.findAttack(name);
            if (found) {
                return found;
            }
        }
        return null;
    }

    execute(): void {
        console.log("Executing composite attack: " + this.name);
        for (const attack of this.attacks) {
            attack.execute();
        }
    }

    showDetails(indentation: string = ''): void {
        console.log(`${indentation}+ ${this.name}`);
        for (const attack of this.attacks) {
            attack.showDetails(indentation + '  ');
        }
    }
}

const datatheft = new SimpleAttack("Data Theft");
const cyberattack = new CompositeAttack("Cyber Attack");

cyberattack.add(datatheft);

const phishing = new CompositeAttack("Phishing");
const emailSpoofing = new SimpleAttack("Email Spoofing");
phishing.add(emailSpoofing);

cyberattack.add(phishing);

const networkattack = new CompositeAttack("Network Attack");
const victim = new SimpleAttack("Victim");
networkattack.add(victim);
cyberattack.add(networkattack);

const botnet = new CompositeAttack("Botnet");
const ddos = new SimpleAttack("DDoS");
botnet.add(ddos);
networkattack.add(botnet);

cyberattack.showDetails();
//cyberattack.remove(datatheft);
//cyberattack.showDetails();

console.log("-----execute-----")
cyberattack.execute();
console.log("-----execute-----")
console.log(`Total attacks in ${cyberattack.getAttackCount()}`);

const found = cyberattack.findAttack("Email Spoofing");
console.log(`Found attack: ${found ? "Found" : "Not found"}`);
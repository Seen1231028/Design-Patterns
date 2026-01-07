
interface Weapon {
  fire(): void;
}

class AssaultRifle {
  shootAuto() {
    console.log("AssaultRifle Fire !!");
  }
}

class SniperRifle {
    shootSingle(){
        console.log("SniperRifle Fire !!");
    }
}

class Crossbow {
    shootArrow(){
        console.log("shooting Arrow !!");
    }
}

class RocketLauncher {
    launchRocket(){
        console.log("Rocket launched!")
    }
}

class ARAdapter implements Weapon {
    constructor(private ar : AssaultRifle){}

    fire(): void {
        this.ar.shootAuto();
    }
}

class SRAdapter implements Weapon {
    constructor(private sr : SniperRifle){}
    
    fire(): void {
        this.sr.shootSingle();
    }
}

class CrossbowAdapter implements Weapon {
    constructor(private cb : Crossbow){}

    fire(): void {
        this.cb.shootArrow();
    }
}

class RocketlauncherAdapter implements Weapon {
    constructor(private rl : RocketLauncher){}
    
    fire(): void {
        this.rl.launchRocket();
    }
}

const weapons: Weapon[] = [
    new ARAdapter(new AssaultRifle),
    new SRAdapter(new SniperRifle),
    new CrossbowAdapter(new Crossbow),
    new RocketlauncherAdapter(new RocketLauncher)
]

weapons.forEach(w => w.fire());

let AR = new AssaultRifle;
AR.shootAuto();
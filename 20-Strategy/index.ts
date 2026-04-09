interface ISwitchStrategy {
    typeKey(): void;
}

class BlueSwitch implements ISwitchStrategy {
    private actionForce: number;
    private soundProfile: string;

    constructor(actionForce: number, soundProfile: string) {
        this.actionForce = actionForce;
        this.soundProfile = soundProfile;
    }

    setActionForce(actionForce: number): void {
        this.actionForce = actionForce
    }

    setSoundProfile(soundProfile: string): void {
        this.soundProfile = soundProfile;
    }

    getActionForce(): number {
        return this.actionForce;
    }

    getSoundProfile(): string {
        return this.soundProfile;
    }

    typeKey(): void {
        console.log(this.getSoundProfile() + "... (เสียงคลิกชัดเจน ให้ความรู้สึกพิมพ์สนุก) แรงการกด: " + this.getActionForce());
    }
}

class RedSwitch implements ISwitchStrategy {
    private actionForce: number;
    private soundProfile: string;


    constructor(actionForce: number, soundProfile: string) {
        this.actionForce = actionForce;
        this.soundProfile = soundProfile;
    }

    setActionForce(actionForce: number): void {
        this.actionForce = actionForce
    }

    getActionForce(): number {
        return this.actionForce;
    }

    setSoundProfile(soundProfile: string): void {
        this.soundProfile = soundProfile;
    }

    getSoundProfile(): string {
        return this.soundProfile;
    }

    typeKey(): void {
        console.log(this.getSoundProfile() + "... (เสียงนุ่มๆ กดลื่นๆ ไม่มีแรงต้าน) แรงการกด: " + this.getActionForce());
    }
}

class BrownSwitch implements ISwitchStrategy {
    private actionForce: number;
    private soundProfile: string;
    constructor(actionForce: number, soundProfile: string) {
        this.actionForce = actionForce;
        this.soundProfile = soundProfile;
    }

    setActionForce(actionForce: number): void {
        this.actionForce = actionForce
    }

    setSoundProfile(soundProfile: string): void {
        this.soundProfile = soundProfile;
    }

    getActionForce(): number {
        return this.actionForce;
    }

    getSoundProfile(): string {
        return this.soundProfile;
    }

    typeKey(): void {
        console.log(this.getSoundProfile() + "... (เสียงเบาๆ มีจังหวะให้รู้สึกตอนกดผ่าน) แรงการกด: " + this.getActionForce());
    }
}

class MembraneSwitch implements ISwitchStrategy {
    private actionForce: number;
    private soundProfile: string;

    constructor(actionForce: number, soundProfile: string) {
        this.actionForce = actionForce;
        this.soundProfile = soundProfile;
    }

    setActionForce(actionForce: number): void {
        this.actionForce = actionForce
    }

    setSoundProfile(soundProfile: string): void {
        this.soundProfile = soundProfile;
    }

    getActionForce(): number {
        return this.actionForce;
    }

    getSoundProfile(): string {
        return this.soundProfile;
    }


    typeKey(): void {
        console.log(this.getSoundProfile() + "... (เสียงยางย้วยๆ อารมณ์คีย์บอร์ดยาง) แรงการกด: " + this.getActionForce());
    }
}


class CustomKeyboard {
    private switchType: ISwitchStrategy;

    constructor(initialSwitch: ISwitchStrategy) {
        this.switchType = initialSwitch;
    }

    changeSwitch(newSwitch: ISwitchStrategy): void {
        console.log("🔧 [Hot-swapping switches...]");
        this.switchType = newSwitch;
    }

    pressKey(): void {
        this.switchType.typeKey();
    }
}

const myKeyboard = new CustomKeyboard(new BlueSwitch(80, "Clicky"));
myKeyboard.pressKey(); 

myKeyboard.changeSwitch(new RedSwitch(60, "Thock"));
myKeyboard.pressKey(); 

myKeyboard.changeSwitch(new MembraneSwitch(40, "Membrane"));
myKeyboard.pressKey();

myKeyboard.changeSwitch(new BrownSwitch(70, "Tactile"));
myKeyboard.pressKey();
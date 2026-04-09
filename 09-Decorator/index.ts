interface Photo {
    applyFilter(): void;
}

class BasicPhoto implements Photo {
    private description: string
    constructor(description: string) {
        this.description = description;
    }
    getDiscription(): string {
        return this.description;
    }
    applyFilter(): void {
        console.log(`Applying filter to ${this.getDiscription()} 📸`);
    }

}

abstract class PhotoDecorator implements Photo {
    protected photo: Photo;
    constructor(photo: Photo) {
        this.photo = photo;
    }

    applyFilter(): void {
        this.photo.applyFilter();
    }
}

class VintageFilter extends PhotoDecorator {
    private darkValue: number;

    constructor(photo: Photo, darkValue: number) {
        super(photo);
        this.darkValue = darkValue;
    }

    setDarkValue(darkValue: number): void {
        this.darkValue = darkValue;
    }

    getDarkValue(): number {
        return this.darkValue;
    }


    applyFilter(): void {
        super.applyFilter();
        console.log(` + Applying Vintage filter to Vintage with dark value ${this.getDarkValue()} %`);
    }

}

class BlackAndWhiteFilter extends PhotoDecorator {
    private density: number;

    constructor(photo: Photo, density: number) {
        super(photo);
        this.density = density;
    }

    getDensity(): number {
        return this.density;
    }

    setDensity(density: number): void {
        this.density = density;
    }

    applyFilter(): void {
        super.applyFilter();
        console.log(` + Applying Black and White filter to Black and White with density ${this.getDensity()} %`);
    }

}

class BeautyFilter extends PhotoDecorator {
    private saturation: number;

     constructor(photo: Photo, saturation: number = 50) {
        super(photo);
        this.saturation = saturation;
    }

    getSaturation(): number {
        return this.saturation;
    }

    setSaturation(saturation: number): void {
        this.saturation = saturation;
    }


    applyFilter(): void {
        super.applyFilter();
        console.log(` + Applying Beauty filter to Beauty with saturation ${this.getSaturation()} %`);
    }
}

class CatearFilter extends PhotoDecorator {
    private earSize: number;

     constructor(photo: Photo, earSize: number) {
        super(photo);
        this.earSize = earSize;
    }

    getEarSize(): number {
        return this.earSize;
    }

    setEarSize(earSize: number): void {
        this.earSize = earSize;
    }



    applyFilter(): void {
        super.applyFilter();
        console.log(` + Applying Catear filter to Catear with ear size ${this.getEarSize()} %`);
    }

}

console.log('\n--- After applying filters ---\n');
let myPhoto: Photo = new BasicPhoto("Human Picture");
myPhoto = new VintageFilter(myPhoto, 60);
myPhoto = new BlackAndWhiteFilter(myPhoto, 70);
myPhoto = new BeautyFilter(myPhoto, 50);
myPhoto = new CatearFilter(myPhoto, 30);
myPhoto.applyFilter();

console.log('\n--- Using decorated photos in a collection ---\n');
const photos: Photo[] = [];
photos.push(new VintageFilter(new BasicPhoto("Vintage Picture"), 60));
photos.push(new BlackAndWhiteFilter(new BasicPhoto("Black and White Picture"), 70));
photos.push(new BeautyFilter(new BasicPhoto("Beauty Picture"), 50));
photos.push(new CatearFilter(new BasicPhoto("Catear Picture"), 30));

for (const photo of photos) {
    photo.applyFilter();
}

console.log('\n--- Using individual decorated photos ---\n');
const basicPhoto = new BasicPhoto("Simple Picture");
const vintagePhoto = new VintageFilter(basicPhoto, 60);
const bwPhoto = new BlackAndWhiteFilter(vintagePhoto, 70);
const beautyPhoto = new BeautyFilter(bwPhoto, 50);
const catearPhoto = new CatearFilter(beautyPhoto, 30);

catearPhoto.applyFilter();
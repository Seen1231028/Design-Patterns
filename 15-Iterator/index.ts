interface IStringIterator {
    getNext(): string | null;
    hasMore(): boolean;
}

interface IAlbum {
    createIterator(): IStringIterator;
    createReverseIterator(): IStringIterator;
    createFemaleIterator(): IStringIterator;
}

class Song {
    constructor(
        private title: string,
        private gender: string,
    ) {
        this.title = title;
        this.gender = gender;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }

    setGender(gender: string): void {
        this.gender = gender;
    }

    getGender(): string {
        return this.gender;
    }
}

class VinylRecord implements IAlbum {
    private songs: Song[] = [];

    constructor(songs: Song[]) {
        this.songs = songs;
    }

    public getSongs(): Song[] {
        return this.songs;
    }

    public getCount(): number {
        return this.songs.length;
    }

    public createIterator(): IStringIterator {
        return new RecordNeedle(this);
    }

    public createReverseIterator(): IStringIterator {
        return new ReverseRecordNeedle(this);
    }

    public createFemaleIterator(): IStringIterator {
        return new FemaleIterator(this, "Female");
    }
}


class RecordNeedle implements IStringIterator {
    private collection: VinylRecord;
    private currentPosition: number = 0;

    constructor(collection: VinylRecord) {
        this.collection = collection;
    }

    public hasMore(): boolean {
        return this.currentPosition < this.collection.getCount();
    }

    public getNext(): string | null {
        if (this.hasMore()) {
            const song = this.collection.getSongs()[this.currentPosition];
            this.currentPosition++;
            return song?.getTitle() ?? null;
        }
        return null;
    }
}

class ReverseRecordNeedle implements IStringIterator {
    private collection: VinylRecord;
    private currentPosition: number;

    constructor(collection: VinylRecord) {
        this.collection = collection;
        this.currentPosition = this.collection.getCount() - 1;
    }

    public hasMore(): boolean {
        return this.currentPosition >= 0;
    }

    public getNext(): string | null {
        if (this.hasMore()) {
            const songs = this.collection.getSongs();
            const song = songs[this.currentPosition];
            this.currentPosition--;
            return song?.getTitle() ?? null;
        }
        return null;
    }
}

class FemaleIterator implements IStringIterator {
    private collection: VinylRecord;
    private currentPosition: number = 0;
    private targetGender: string;

    constructor(collection: VinylRecord, gender: string) {
        this.collection = collection;
        this.targetGender = gender;
    }

    public hasMore(): boolean {
        const songs = this.collection.getSongs();
        while (this.currentPosition < songs.length) {
            if (songs[this.currentPosition]?.getGender() === this.targetGender) {
                return true;
            }
            this.currentPosition++;
        }
        return false;
    }

    public getNext(): string | null {
        if (this.hasMore()) {
            const song = this.collection.getSongs()[this.currentPosition];
            this.currentPosition++;
            return song?.getTitle() ?? null;
        }
        return null;
    }
}

function main() {
    console.log("--- คลังแผ่นเสียงสะสม ---");
    
    const myFavoriteAlbum = new VinylRecord([
        new Song("Bohemian Rhapsody", "Male"),
        new Song("Rolling in the Deep", "Female"),
        new Song("Imagine", "Male"),
        new Song("Flowers", "Female"),
        new Song("Bad Guy", "Female")
    ]);

    console.log("\n[เล่นตามลำดับปกติ]");
    const needle = myFavoriteAlbum.createIterator();
    while (needle.hasMore()) {
        console.log(`กำลังเล่น -> ${needle.getNext()}`);
    }

    const reverseNeedle = myFavoriteAlbum.createReverseIterator();
    console.log("\n[เล่นย้อนกลับ]");
    while (reverseNeedle.hasMore()) {
        console.log(`กำลังเล่น (ย้อนกลับ) -> ${reverseNeedle.getNext()}`);
    }

    console.log("\n[โหมด: เล่นเฉพาะนักร้องหญิง]");
    const femaleNeedle = myFavoriteAlbum.createFemaleIterator();
    while (femaleNeedle.hasMore()) {
        console.log(`กำลังเล่น (Female Artist) -> ${femaleNeedle.getNext()}`);
    }

    console.log("\nจบการทำงาน...");
}

main();
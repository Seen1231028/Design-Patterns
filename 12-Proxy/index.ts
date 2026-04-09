interface FileDownloader {
  downloadFile(url: string): void;
}

class Downloader implements FileDownloader {
  downloadFile(url: string): void {
    console.log("Downloading file from:", url);
    console.log("File downloaded successfully\n");
  }
}

class MalwareDownloadProxy implements FileDownloader {
  private realDownloader: Downloader;

  constructor() {
    this.realDownloader = new Downloader();
  }

  downloadFile(url: string): void {
    console.log("Proxy scanning file before download...");

    if (!this.isSafeFile(url)) {
      console.log("Malware detected! Download blocked.\n");
      return;
    }

    console.log("File is safe. Proceeding to download...");
    this.realDownloader.downloadFile(url);
  }

  private isSafeFile(url: string): boolean {
    const blockedExtensions = [".exe", ".bat", ".scr"];

    for (const ext of blockedExtensions) {
      if (url.endsWith(ext)) {
        return false;
      }
    }

    return true;
  }
}

const downloader: FileDownloader = new MalwareDownloadProxy();

downloader.downloadFile("https://example.com/report.pdf");
downloader.downloadFile("https://malicious.com/virus.exe");

const safeDownloader: FileDownloader = new Downloader();
safeDownloader.downloadFile("https://example.com/report.pdf");
declare module "pdfjs-dist/legacy/build/pdf" {
    const pdfjsLib: {
        GlobalWorkerOptions: { workerSrc: string };
        getDocument: (data: any) => { promise: Promise<any>; getAttachments?: () => Promise<any> };
    };
    export default pdfjsLib;
}
export interface ICourse {
    _id: string,
    title: string,
    price: number,
    description: string,
    thumbnail: string
};

export interface IModule {
    _id: string,
    title: string,
    moduleNumber: number
};

export interface ILecture {
    _id: string,
    title: string,
    videoUrl : string,
    pdfNotes : string
};
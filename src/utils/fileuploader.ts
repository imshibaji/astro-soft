/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formidable } from 'formidable';
import { chmod, mkdir, readdir, readFile, rmdir, unlink, writeFile } from 'fs/promises';
import { NextApiRequest } from "next";

interface RequestData {
    err: any;
    fields: any;
    files: any;
}

export class NextAppRequest{
    private data: RequestData | undefined;
    private uploadPath: string | undefined;

    constructor({uploadPath = './public/uploads'} = {}){
        this.uploadPath = uploadPath;
    }
    async formData(req: NextApiRequest){
        try {
            this.data = await new Promise((resolve, reject) => {
                const form = new Formidable();
            
                form.parse(req, (err, fields, files) => {
                    if (err) reject({ err })
                    resolve({ err, fields, files })
                }) 
            });
        } catch (error) {
            console.log(error);
        }
    }
    get err(){
        try {
            return this.data?.err;
        } catch (error) {
            return error;
        }
    }
    get fields(){
        try {
            return this.data?.fields;
        } catch (error) {
            return error;
        }
    }

    get files(){
        try {
            return this.data?.files;
        } catch (error) {
            return error;
        }
    }
    get(name: string){
        try {
            return this.data?.fields[name][0];
        } catch (error) {
            return error;
        }
    }
    field(name: string){
        try {
            return this.data?.fields[name];
        } catch (error) {
            return error;
        }
    }

    fileField(name: string){
        try {
            return this.data?.files[name];
        } catch (error) {
            return error;
        }
    }

    file(name: string){
        try {
            return this.data?.files[name][0];
        } catch (error) {
            return error;
        }
    }
    async makeDirectory(uploadPath: string){
        try {
            const directoryExists = await this.directoryExists(uploadPath);
            if (directoryExists) return uploadPath;
            await mkdir(uploadPath, { recursive: true });
            await chmod(uploadPath, 0o777);
            return uploadPath;
        } catch (error) {
            return error;
        }
    }

    async directoryExists(uploadPath: string){
        try {
            const directoryExists = await readdir(uploadPath, 'utf-8');
            return directoryExists ? true : false;
        } catch (error) {
            return error;
        }
    }

    async fileExists(fileName: string){
        try {
            const file = fileName.split('/').pop() || '';
            const uploadPath = this.uploadPath+'/'+file;
            const fileExists = await readFile(uploadPath, 'utf-8');
            return fileExists ? true : false;
        } catch (error) {
            return error;
        }
    }

    async readFile(fileName: string){
        try {
            const file = fileName.split('/').pop() || '';
            const uploadPath = this.uploadPath+'/'+file;
            const fileInfo = await readFile(uploadPath, 'utf-8'); 
            return fileInfo;
        } catch (error) {
            return error;
        }
    }

    async readFiles(uploadPath: string){
        try {
            const files = await readdir(uploadPath, 'utf-8');
            return files;
        } catch (error) {
            return error;
        }
    }
    async readDir(uploadPath: string){
        try {
            const files = await readdir(uploadPath);
            return files;
        } catch (error) {
            return error;
        }
    }
    async singleFileUpload(fieldName: string, fileName?: string, types: string[] = []){
        try {
            const fileData = this.file(fieldName);
            if (!fileData) return;
            if(types.length > 0 && !types.includes(fileData.mimetype)) throw new Error('File type not supported');
            const fileBuffer = await readFile(fileData.filepath);
            const file = this.uploadPath+'/'+(fileName || fileData.originalFilename);
            await writeFile(file, fileBuffer);
            return file;
        } catch (error) {
            return error;
        }
    }
    async multiFileUpload(fieldName: string, types: string[] = []){
        try {
            const files = this.files[fieldName];
            if (!files) return;
            const promises = files.map(async (file: any) => {
                if(types.length > 0 && !types.includes(file.mimetype)) throw new Error('File type not supported');
                const fileBuffer = await readFile(file.filepath);
                const fileData = this.uploadPath+'/'+file.originalFilename;
                await writeFile(fileData, fileBuffer);
                return fileData;
            });
            return Promise.all(promises);
        } catch (error) {
            return error;
        }
    }
    async deleteFile(fileName: string){
        try {
            const file = fileName.split('/').pop() || '';
            const deletedPath = this.uploadPath+'/'+file;            
            await chmod(deletedPath, 0o777);
            await unlink(deletedPath);
            return deletedPath;
        } catch (error) {
            return error;
        }
    }
    async deleteAllFiles(uploadPath: string){
        try {
            const files = await readdir(uploadPath);
            const promises = files.map(async (file: any) => {
                await chmod(uploadPath+'/'+file, 0o777);
                await unlink(uploadPath+'/'+file);
            });
            await Promise.all(promises);
            return uploadPath;
        } catch (error) {
            return error;
        }
    }
    async deleteDirectory(uploadPath: string){
        try {
            await chmod(uploadPath, 0o777);
            await rmdir(uploadPath);
            return uploadPath;
        } catch (error) {
            return error;
        }
    }
}

export async function formData(req: NextApiRequest): Promise<NextAppRequest> {
    const appReq = new NextAppRequest();
    await appReq.formData(req);
    return appReq;
}
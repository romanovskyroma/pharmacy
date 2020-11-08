import { IResume } from '../interfaces/resume.interface';

export class Resume implements IResume {
    constructor(
        public uid: string,
        public position: string,
        public city: string,
        public salery: number,
        public univercity: string,
        public experienceYears: number,
        public experience: string,
        public aboutMySelf: string,
    ) { }
}

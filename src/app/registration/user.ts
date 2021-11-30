export class User {
    constructor(
        public name: string,
        public email: string,
        public bio: string,
        public phone: number,
        public passiveincome: boolean,
        public politician: boolean,
        public executive: boolean,
        public lawyer: boolean,
        public password:string
    ) {}
}

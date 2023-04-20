export class Organization {
    _id?: string;
    name: string;
    email: string;
    password: string;
    website?: string;
    advertisers?: string[];

    constructor(name: string, email: string, password: string, website: string, advertisers: string[]) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.website =  website;
        this.advertisers = advertisers;
    }
}

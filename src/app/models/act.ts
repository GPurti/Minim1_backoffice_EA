export class Act {
    _id?: string;
    title: string;
    location: string;
    organization: string;
    need_time: string;
    help_time: string;
    need_description: string;
    help_description: string;
    need_requirements: string;
    help_requirements: string;
    need_tag: string;
    help_tag: string;
    assistance: string;

    constructor(title: string, location: string, organization: string, need_time: string, help_time: string, need_description: string, help_description: string, need_requirements: string, help_requirements: string, need_tag: string, help_tag: string, assistance: string) {
        this.title = title;
        this.location = location;
        this.organization = organization;
        this.need_time = need_time;
        this.help_time = help_time;
        this.need_description = need_description;
        this.help_description = help_description;
        this.need_requirements = need_requirements;
        this.help_requirements = help_requirements;
        this.need_tag = need_tag;
        this.help_tag = help_tag;
        this.assistance = assistance;
    }
}

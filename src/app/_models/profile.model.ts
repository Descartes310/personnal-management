import { Super } from './super.model';

export class Profile extends Super<Profile> {
    public name: string;
    public slug: string;
    public type: string;
    public placeholder: string;
    public is_required: boolean;
    public is_updatable: boolean;
    public min: number;
    public max: number;
    public step: number;
    public is_unique: boolean;
    public is_private:boolean;
    public default: string;
    public description: string;
    public options: any[];
    
}
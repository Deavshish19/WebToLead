import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import {NavigationMixin} from 'lightning/navigation';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import OWNER_ID_FIELD from '@salesforce/schema/Account.OwnerId';
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';
import OWNER_EMAIL_FIELD from '@salesforce/schema/Account.Owner.Email';
import OWNER_COMPANY_NAME_FIELD from '@salesforce/schema/Account.Owner.CompanyName';
import OWNER_PROFILE_FIELD from '@salesforce/schema/Account.Owner.Profile.Name';

const FIELDS = [
    OWNER_ID_FIELD,
    OWNER_NAME_FIELD,
    OWNER_EMAIL_FIELD,
    OWNER_COMPANY_NAME_FIELD,
    OWNER_PROFILE_FIELD
];

export default class RefreshComponent extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName = ACCOUNT_OBJECT;

    ownerName;
    ownerId ;
    ownerEmail;
    ownerCompanyName;
    ownerProfile;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    recordHandler({ error, data }) {
        if (data) {
            this.ownerId = data.fields.OwnerId.value;
            this.ownerName = data.fields.Owner.displayValue || data.fields.Owner.value.fields.Name.value;
            this.ownerEmail = data.fields.Owner.value.fields.Email.value;
            this.ownerCompanyName = data.fields.Owner.value.fields.CompanyName.value;
            this.ownerProfile = data.fields.Owner.value.fields.Profile.value.fields.Name.value;
            
        } else if (error) {
            console.error(error);
        }
    }

    handleNavigation(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: { 4
                recordId : this.ownerId,
                actionName : 'view'
            }
        });
        console.log('Navigating to:', this.ownerId);
    }
}

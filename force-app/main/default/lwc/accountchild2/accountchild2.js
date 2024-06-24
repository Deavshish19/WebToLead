import { LightningElement,api,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountDetailController.getAccounts';
import { MessageContext, publish } from 'lightning/messageService';
import Contact from '@salesforce/messageChannel/Contact__c';
const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    {label:'Actions', fieldName:'Actions', type:'button', typeAttributes:
        {
            label:'View Contacts',
            value:'view_contacts'
        }}
];
export default class Accountchild2 extends LightningElement {
    @api searchTextChild2;
    columns = columns;

    @wire (MessageContext) messageContext;

    handleRowAction(event){
        if(event.detail.action.value == 'view_contacts'){
            console.log('Click');

            const payload=
            {
                accountId : event.detail.row.Id,
                accountName : event.detail.row.Name
            };

            publish (this.messageContext,Contact,payload);
        }
    }

    @wire (getAccounts,{searchText:'$searchTextChild2'})
    accountRecords;
}
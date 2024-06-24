import { MessageContext, subscribe,unsubscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import Contact from '@salesforce/messageChannel/Contact__c';
import getAccountContacts from '@salesforce/apex/AccountDetailController.getAccountContacts';

export default class ShowAccountContacts extends LightningElement {

    @wire (MessageContext) messageContext;
    subscription = null;
    accountId;
    accountName;
    title = 'Contacts';
    contacts;
    hasContacts;
    isAccountSelected=false;

    connectedCallback(){
        this.handleSubscribe();
    }

    disconnectedCallback(){
        this.handleUnsubscribe();
    }

    handleSubscribe(){
        if(!this.subscription){
            this.subscription=subscribe(this.messageContext,Contact,
                (paramenter)=>
                {
                    this.accountId = paramenter.accountId;
                    this.accountName = paramenter.accountName;
                    this.title = this.accountName+"'s Contacts"
                    this.getContacts();
                });
        }    
    }

    handleUnsubscribe(){
        unsubscribe(this.subscription);
            this.subscription = null;
    }

    async getContacts(){
        this.contacts= await getAccountContacts({accountId : this.accountId});
        this.hasContacts=this.contacts.length>0?true:false;
        this.isAccountSelected = true;
    }
    
}
import { LightningElement } from 'lwc';

export default class AccountParent extends LightningElement {

    searchTextParent;

    handleSearchEvent(event){
        this.searchTextParent = event.detail;
    }
}
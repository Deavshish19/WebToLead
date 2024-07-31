import { LightningElement,wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
//import CASE_OBJECT from '@salesforce/schema/Case';
import CASE_STATUS from '@salesforce/schema/Case.Status';

export default class CaseDetailPage extends LightningElement {

    //objectApiName = CASE_OBJECT;
    caseStatus;
    CaseOpen;
    CaseClosed;
    @api recordId;
    fields = [CASE_STATUS];

    @wire (getRecord, {recordId: '$recordId', fields: [CASE_STATUS]})
    caseRecord({data,error}){
        if(data){
            this.caseStatus = data.fields.Status.value;
            console.log('Case Status: ' + this.caseStatus);
            if(this.caseStatus === 'Closed'){
                this.CaseOpen = false;
                this.CaseClosed = true;
                console.log('inside If');
                console.log('this.CaseOpen>>', this.CaseOpen);
                console.log('this.CaseClosed>>', this.CaseClosed);

            }
            else{
                this.CaseOpen = true;
                this.CaseClosed = false;
            }
        }
        if(error){
            console.log('Error');
        }
    };

    /* get caseOpen() {
        console.log('inside open');
        return this.caseStatus !== 'Closed' ? true:false;
        
    }

    get caseClosed() {
        console.log('inside Close');
        return this.caseStatus === 'Closed'? true:false;
       
    } */
        
    
}   
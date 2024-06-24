public with sharing class opportunityTrigger {
    public static void EmailToOwnerOnAmountUpdate(List<Opportunity> newOpp , Map<Id,Opportunity> oldMapOpp) {
    set<Id> oppOwnerId = new set<Id>();
    if(!newOpp.isEmpty()){
        for(Opportunity opp : newOpp){
            if(opp.Amount != oldMapOpp.get(opp.Id).Amount){
                if(opp.Amount > 10000 ){
                    oppOwnerId.add(opp.OwnerId);
                }
            }
        }
    }
    Map<Id,User> ownerUserMap = [SELECT Id,Name,Email FROM user WHERE Id IN : oppOwnerId ];
    for(Opportunity opp : newOpp){
        Messaging.singleEmailMessage email = new Messaging.singleEmailMessage();
		email.setToAddresses(new String[] {opp.OwnerId});
		email.setSubject('Amount greater than 10000');
		email.setPlainTextbody('An Opportunity AMount is greater than 10000');
        Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
        if (results[0].isSuccess()) {
            System.debug('Email notification sent to the admin.');
        } else {
            System.debug('Email notification failed to send: ' + results[0].getErrors()[0].getMessage());
        }

    }
    
    }
}
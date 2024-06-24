public with sharing class caseTrigger {
    public static void trgMethod(list<case> newCase) {

        set<String> caseEmail = new set<String>();
        map<String, Contact> contactmap = new map<String,Contact>();
        map<String,Id> MapToUpdate = new map<String,Id>();
        List<Contact> insertContactList = new List<Contact>();
    
        if(!newCase.isEmpty()){
            for(case c : newCase){
                if(c.suppliedEmail__c != null && c.ContactId == null){
                    caseEmail.add(c.suppliedEmail__c);
                }
            }
        }
        if(!caseEmail.isEmpty()){
            list<Contact> retrieveContacts = [SELECT id, LastName, Email FROM Contact WHERE Email In : caseEmail];
            if(!retrieveContacts.isEmpty()){
                for(contact con : retrieveContacts){        
                    contactmap.put(con.Email, con);
                }

                for(Case c : newCase){
                    if(contactmap.containsKey(c.suppliedEmail__c)){
                       Contact exsistingContact = contactmap.get(c.suppliedEmail__c);
                       MapToUpdate.put(exsistingContact.Email,exsistingContact.Id);
                    }
                    else{
                        Contact newContact = new Contact();
                        newContact.LastName = 'Test';
                        newContact.Email = c.suppliedEmail__c;
                        insertContactList.add(newContact);
                    }
                }

                if(!insertContactList.isEmpty()){
                    insert insertContactList;
                    for(contact c : insertContactList){
                        MapToUpdate.put(c.Email,c.Id);
                    }
                }

                for(Case cs : newCase){
                    if(mapToUpdate.containsKey(cs.suppliedEmail__c)){
                        cs.ContactId = mapToUpdate.get(cs.suppliedEmail__c);
                    }
                }
            }
        }

    }
}
public with sharing class checkBoxTrigger {
    public static void triggerMethod(List<Contact> newConList){

        Set<Id> accIds = new Set<Id>();
        Map<Id,Contact> recConMap = new Map<Id,Contact>();
        list<Contact> listToUpdate = new list<Contact>();
        if(!newConList.isEmpty()){
            for(Contact newCon : newConList){
                if(con.AccountId != null && con.primaryContact = false){
                    accIds.add(newCon.AccountId);
                }
            }
        }

        if(!accIds.isEmpty()){
            List<Contact> conlist = [SELECT Id, AccountId,createdDate, primaryContact FROM Contact 
                                    WHERE AccountId IN : accIds ORDER BY createdDate DESC ];
            if(!conList.isEmpty()){
                for(Contact recentCon : conList){
                    if(!recConMap.containsKey(recentCon.AccountId)){
                        recConMap.put(recentCon.AccountId,recentCon);
                    }
                   
                }

                for(Contact con : conList){
                    Contact recContact = recConMap.get(con.AccountId);
                    if(recContact.Id == con.Id && con.PrimaryContact == false){
                        con.PrimaryContact = true;
                        listToUpdate.add(con);
                    }
                    else{
                        if(con.PrimaryContact == true){
                            con.PrimaryContact = false;
                            listToUpdate.add(con);
                        }
                    }
                   
                }

                if(!listToUpdate.isEmpty()){
                    update listToUpdate;
                }
            }
            

        }
    }
}
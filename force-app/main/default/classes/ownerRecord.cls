public with sharing class ownerRecord {
    @AuraEnabled(cacheable= true)
    public Static List<User> getOwnerRecord(Id idOfOwner){
        return [select Id , Email, Profile.Name , CompanyName from User Where Id =: idOfOwner ];
    }
}
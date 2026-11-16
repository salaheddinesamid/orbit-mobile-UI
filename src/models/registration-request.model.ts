

export interface RegistrationRequest {
    customerDetails : CustomerDetails;
    idDocumentDetails : IdDocumentDetails;
}

export interface CustomerDetails {
    firstName : string;
    lastName : string;
    email : string;
    phone : string;
    address : string;
    city : string;
    state : string;
    zip : string;
    country : string;
    nationalID : string;

}

export interface IdDocumentDetails {
    documentType : string;
    originalFilename : string;
    contentType : string;
    size : number;
    uploadedAt : Date;
    downloadUrl : string;
}
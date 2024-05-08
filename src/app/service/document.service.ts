import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Documentt } from '../model/Document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private baseUrl = 'http://192.168.1.134:8071';

  constructor(private http: HttpClient) { }

  getDocuments() {
    return this.http.get<any[]>(`${this.baseUrl}/Documents/retrieveAllDocument`);
  }

  getDocumentByID(DocumentID: string) {
    return this.http.get<Documentt>(`${this.baseUrl}/Documents/retrievebyId/${DocumentID}`);
  }

  deleteDocument(DocumentID: string) {
    return this.http.delete<any[]>(`${this.baseUrl}/Documents/delete/${DocumentID}`);
  }

  addDocument(document: Documentt) {
    return this.http.post<any[]>(`${this.baseUrl}/Documents/addDocument`, document);
  }

  updateDocument(document: Documentt, documentId: string) {
    document.documentID = documentId;
    return this.http.put<any[]>(`${this.baseUrl}/Documents/updateDocument/` + documentId, document);
  }
  affectDocumentToCourse(DocumentID: string, courseID: string) {
    return this.http.put<any[]>(`${this.baseUrl}/Documents/affecterDoc/${DocumentID}/${courseID}`, {});
  }
  desaffectDocumentFromCourse(DocumentID: string, courseID: string) {
    return this.http.put<any[]>(`${this.baseUrl}/Documents/desaffecterDoc/${DocumentID}/${courseID}`, {});
  }

}

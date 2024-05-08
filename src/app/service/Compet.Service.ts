import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Competition} from "../model/Competition";
import {Prize} from "../model/Prize";
import {User} from "../model/User";




@Injectable({
  providedIn: 'root'
})
export class CompetService {
  private baseUrl = 'http://192.168.1.191:8001'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {
  }

  addCompetition(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(`${this.baseUrl}/compet`, competition);
  }

  getAllCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${this.baseUrl}/all`);
  }

  deleteCompetition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/compt/${id}`);
  }


  editCompetition(id: number, competition: Competition): Observable<Competition> {
    return this.http.put<Competition>(`${this.baseUrl}/competitions/${id}`, competition);
  }

  getCompetitionById(id: number): Observable<Competition> {
    return this.http.get<Competition>(this.baseUrl + `/getcompetById/${id}`);

  }

  getAllTypeC(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/typeC`);
  }
  getUserFriends(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${userId}/friends`);
  }

  getCompetitionsByType(type: string | null): Observable<Competition[]> {
    // Fais une requête HTTP pour récupérer les compétitions par type depuis l'API
    return this.http.get<Competition[]>(`${this.baseUrl}/competitions/${type}`);
  }

    addUserToCompetition(competitionId: number, userId: number | undefined): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/competition/${competitionId}/user/${userId}`, {});
  }

    isUserAlreadyRegistered(competitionId: number, userId: number | undefined): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/competitions/${competitionId}/user/${userId}`);
  }

  countBadgesPerCompetition(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/badgess`);
  }

 /* sendNotification(email: string) {

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Votre titre</title>
      </head>
      <body>
          <h1>Bonjour,</h1>
          <p>Ceci est le contenu de votre e-mail.</p>
      </body>
      </html>
    `;
    return this.http.post<any>(`${this.baseUrl}/send-notification`, {email, content});
  }*/
  getAllUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/get-all-users`;
    return this.http.get<User[]>(url);
  }

  addFriend(userId: number, friendId: number): Observable<string[]> {
    const url = `${this.baseUrl}/${userId}/friends/${friendId}`;
    return this.http.post<string[]>(url, {});
  }

 /* sendNotificationByEmail(email: string): Observable<string> {
    const notificationRequest = { email: email };
    return this.http.post<string>(`${this.baseUrl}/sendNotificationByEmail`, notificationRequest);
  }*/
  sendNotificationByEmail(email: string | undefined, userId: number | undefined, friendId: number, competitionId: number | undefined): Observable<string> {
    const notificationRequest = {
      email: email,
      userId: userId,
      friendId: friendId,
      competitionId: competitionId
    };
    return this.http.post<string>(`${this.baseUrl}/sendNotificationByEmail`, notificationRequest);
  }

  getUsersByCompetition(competitionId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/competition/${competitionId}`);
  }
  addScore(userId: number, competitionId: number, percentage: number) {
    const url = `http://localhost:8001/add/${userId}/${competitionId}`;
    return this.http.post(url, { percentage });
  }
  getPercentageForUserAndCompetition(userId: number, competitionId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/percentage/user/${userId}/competition/${competitionId}`);
  }

  getUserFriendIdByEmail(email: string | undefined): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/user/friendId/${email}`);
  }



  getPrizesByUserId(userId: number | undefined): Observable<Prize[]> {
    const url = `${this.baseUrl}/${userId}/prizes`;
    return this.http.get<Prize[]>(url);
  }
}

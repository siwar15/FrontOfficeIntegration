import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Badge} from "../model/Badge";
import {User} from "../model/User";


@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private baseUrl = 'http://192.168.1.191:8001'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {
  }

  getAllBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${this.baseUrl}/listb`);
  }

  getBadgesByCompetitionId(competitionId: number): Observable<Badge[]> {
    const url = `${this.baseUrl}/competitions/${competitionId}/badges`;
    return this.http.get<Badge[]>(url);
  }

  ajouterBadge(badge: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ajouterB`, badge);
  }

  ajouterBadgee(programme: Badge, idC: number, idu: number): Observable<Badge> {
    const url = `${this.baseUrl}?idC=${idC}&idu=${idu}`;
    return this.http.post<Badge>(url, programme);
  }

  addbadge( competitionId: number, badgeId: number, badgeName: string, badgeDescription: string): Observable<any> {
    const requestBody = {

      competitionId: competitionId,
      badgeId: badgeId,
      badgeName: badgeName,
      badgeDescription: badgeDescription
    };

    return this.http.post(`${this.baseUrl}/createBadge`, requestBody);
  }
  getCompetitionNameById(competitionId: number): Observable<string> {
    return this.http.get(`${this.baseUrl}/${competitionId}/name`, { responseType: 'text' });
  }
  getUsersWithBadges(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/with-badges`);
  }

  getBadgesByUserId(userId: number ): Observable<Badge[]> | Observable<[]> {
    return this.http.get<Badge[]>(`${this.baseUrl}/user/${userId}`);
  }

  assignRandomPrizeIfThresholdReached(userId: number ): Observable<any> {


    return this.http.post<any>(`${this.baseUrl}/assignRandomPrize/${userId}`, {});
  }

}

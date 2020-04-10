import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVisitor } from 'app/shared/model/visitor.model';

type EntityResponseType = HttpResponse<IVisitor>;
type EntityArrayResponseType = HttpResponse<IVisitor[]>;

@Injectable({ providedIn: 'root' })
export class VisitorService {
  public resourceUrl = SERVER_API_URL + 'api/visitors';

  constructor(protected http: HttpClient) {}

  create(visitor: IVisitor): Observable<EntityResponseType> {
    return this.http.post<IVisitor>(this.resourceUrl, visitor, { observe: 'response' });
  }

  update(visitor: IVisitor): Observable<EntityResponseType> {
    return this.http.put<IVisitor>(this.resourceUrl, visitor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVisitor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVisitor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

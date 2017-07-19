import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { ArticleOpenDataMind } from './article-open-data-mind.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ArticleOpenDataMindService {

    private resourceUrl = 'api/articles';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(article: ArticleOpenDataMind): Observable<ArticleOpenDataMind> {
        const copy = this.convert(article);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(article: ArticleOpenDataMind): Observable<ArticleOpenDataMind> {
        const copy = this.convert(article);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<ArticleOpenDataMind> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.date = this.dateUtils
            .convertDateTimeFromServer(entity.date);
        entity.dateUpdate = this.dateUtils
            .convertDateTimeFromServer(entity.dateUpdate);
    }

    private convert(article: ArticleOpenDataMind): ArticleOpenDataMind {
        const copy: ArticleOpenDataMind = Object.assign({}, article);

        copy.date = this.dateUtils.toDate(article.date);

        copy.dateUpdate = this.dateUtils.toDate(article.dateUpdate);
        return copy;
    }
}

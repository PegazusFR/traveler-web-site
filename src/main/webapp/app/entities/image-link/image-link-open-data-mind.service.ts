import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { ImageLinkOpenDataMind } from './image-link-open-data-mind.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ImageLinkOpenDataMindService {

    private resourceUrl = 'api/image-links';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(imageLink: ImageLinkOpenDataMind): Observable<ImageLinkOpenDataMind> {
        const copy = this.convert(imageLink);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(imageLink: ImageLinkOpenDataMind): Observable<ImageLinkOpenDataMind> {
        const copy = this.convert(imageLink);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<ImageLinkOpenDataMind> {
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
    }

    private convert(imageLink: ImageLinkOpenDataMind): ImageLinkOpenDataMind {
        const copy: ImageLinkOpenDataMind = Object.assign({}, imageLink);

        copy.date = this.dateUtils.toDate(imageLink.date);
        return copy;
    }
}

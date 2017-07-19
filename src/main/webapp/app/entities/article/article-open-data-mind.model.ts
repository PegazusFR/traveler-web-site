import { BaseEntity } from './../../shared';

export class ArticleOpenDataMind implements BaseEntity {
    constructor(
        public id?: number,
        public shortDescription?: string,
        public fullDescription?: string,
        public date?: any,
        public dateUpdate?: any,
        public lieu?: string,
        public positionX?: number,
        public positionY?: number,
        public countryCode?: string,
        public imagelinks?: BaseEntity[],
        public comments?: BaseEntity[],
    ) {
    }
}

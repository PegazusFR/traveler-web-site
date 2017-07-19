import { BaseEntity } from './../../shared';

export class ImageLinkOpenDataMind implements BaseEntity {
    constructor(
        public id?: number,
        public urlImage?: string,
        public date?: any,
        public articleId?: number,
    ) {
    }
}

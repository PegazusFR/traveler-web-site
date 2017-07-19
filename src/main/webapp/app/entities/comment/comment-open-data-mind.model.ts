import { BaseEntity } from './../../shared';

export class CommentOpenDataMind implements BaseEntity {
    constructor(
        public id?: number,
        public comment?: string,
        public pseudo?: string,
        public date?: any,
        public articleId?: number,
    ) {
    }
}

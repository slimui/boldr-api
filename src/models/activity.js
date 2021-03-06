import { Model } from 'objection';
import BaseModel from './base';
// Related Model
import User from './user';
import Post from './post';
import Attachment from './attachment';
import Tag from './tag';
import MenuDetail from './menuDetail';

class Activity extends BaseModel {
  static get tableName() {
    return 'activity';
  }
  static addTimestamps = true;
  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'activity.userId',
          to: 'user.id',
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'activity.activityPost',
          to: 'post.id',
        },
      },
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'activity.activityUser',
          to: 'user.id',
        },
      },
      attachment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attachment,
        join: {
          from: 'activity.activityAttachment',
          to: 'attachment.id',
        },
      },
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tag,
        join: {
          from: 'activity.activityTag',
          to: 'tag.id',
        },
      },
      menuDetail: {
        relation: Model.BelongsToOneRelation,
        modelClass: MenuDetail,
        join: {
          from: 'activity.activityMenuDetail',
          to: 'menu_detail.id',
        },
      },
    };
  }
}

export default Activity;

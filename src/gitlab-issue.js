import moment from 'moment';

export default class GitlabIssue {
  constructor(data) {
    this.id = data.hasOwnProperty('id') ? GitlabIssue.getIdByIssuesUrl(data.id._text) : null;
    this.link = data.hasOwnProperty('link') ? data.link._attributes._href : null;
    this.title = data.hasOwnProperty('title') ? data.title._text : null;
    this.updatedAt = data.hasOwnProperty('updated') ? moment(data.updated._text) : null;
    this.author = data.hasOwnProperty('author') ? data.author : null;
    this.summary = data.hasOwnProperty('summary') ? data.summary._text : null;
    this.labels = data.hasOwnProperty('labels') ? GitlabIssue.transformLabels(data.labels) : null;
    this.description = data.hasOwnProperty('description') ? data.description._text : null;
    this.assignee = data.hasOwnProperty('assignee') ? GitlabIssue.transformAssignee(data.assignee) : null;
  }

  static getIdByIssuesUrl(url) {
    let regex = new RegExp('^(https?:\\/\\/)(((.[^./]+[.])[^./]+)+)(\\/)(([^./]+)(\\/))+(issues\\/)([0-9]+)');
    let result = regex.exec(url);
    return result[10];
  }

  static transformLabels(labels) {
    if (labels in Array) {
      return labels.label.map(label => {
        return label._text;
      });
    } else {
      return [labels.label._text];
    }
  }

  static transformAssignee(assignee) {
    return {
      email: assignee.email._text,
      name: assignee.name._text,
    };
  }
}

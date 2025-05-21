class GroupMember {
  constructor({ id, user_id, group_id, is_admin, joined_date }) {
    this.id = id;
    this.user_id = user_id;
    this.group_id = group_id;
    this.is_admin = is_admin;
    this.joined_date = joined_date;
  }
}

module.exports = GroupMember;

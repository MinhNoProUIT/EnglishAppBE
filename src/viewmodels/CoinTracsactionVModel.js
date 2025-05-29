class CoinTransactionVModel {
  constructor({
    id,
    user_id,
    amount,
    reason,
    reference_id,
    reference_table,
    created_at,
    users,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.amount = amount;
    this.reason = reason;
    this.reference_id = reference_id;
    this.reference_table = reference_table;
    this.created_at = created_at;
    this.username = users?.username || null;
    this.user_avatar = users?.image_url || null;
  }
}

module.exports = { CoinTransactionVModel };

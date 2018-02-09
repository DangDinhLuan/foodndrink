class Order < ApplicationRecord
  has_many :items, dependent: :destroy
  validates :name, presence: true
  validates :email, presence: true, format: {with: Regexp.new(Settings.validates.email.pattern)}
  validates :phone, presence: true, format: {with: Regexp.new(Settings.validates.phone.pattern)}
  validates :address, presence: true, length: {maximum: Settings.validates.address.length.maximum}
  validates :total, presence: true
  validates :status, inclusion: {in: [true, false]}, allow_nil: true

  scope :order_user_id, -> (id) { where(user_id: id).order(created_at: :desc) }
  scope :report_order, -> (first_month, last_month) {where("created_at BETWEEN ? AND ?", first_month, last_month).order created_at: :desc}
  
  def status_order
    if self.status
      I18n.t("admin.order.show.status.delivered")
    else
      I18n.t("admin.order.show.status.not_delivery")
    end
  end

  def self.search_by_title(term)
    if term
      where('name LIKE ?', "%#{term}%")
    else
      all
    end
  end
end

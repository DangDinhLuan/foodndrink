class Order < ApplicationRecord
  belongs_to :user
  has_many :items, dependent: :destroy
  validates :name, presence: true
  validates :email, presence: true, format: {with: Regexp.new(Settings.validates.email.pattern)}
  validates :phone, presence: true, format: {with: Regexp.new(Settings.validates.phone.pattern)}
  validates :address, presence: true, length: {maximum: Settings.validates.address.length.maximum}
  validates :total, presence: true

end

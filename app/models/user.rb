class User < ApplicationRecord
  attr_accessor :remember_token, :activation_token, :password_reset_token
  has_many :orders, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :suggestions, dependent: :destroy
  has_many :ratings, dependent: :destroy
  before_save {self.email = self.email.downcase}
  before_create :create_activation_digest
  validates :name,  presence: true,
    length: {minimum: Settings.validates.name.length.minimum,
      maximum: Settings.validates.name.length.maximum},
    format: {with: Regexp.new(Settings.validates.name.pattern)}
  validates :email, presence: true,
    length: {maximum: Settings.validates.email.length.maximum},
    format: {with: Regexp.new(Settings.validates.email.pattern)},
    uniqueness: {case_sensitive: false}
  validates :phone, format: {with: Regexp.new(Settings.validates.phone.pattern)},uniqueness: true
  validates :address, length: {maximum: Settings.validates.address.length.maximum}
  validates :password, presence: true,
    length: {minimum: Settings.validates.password.length.minimum}, allow_nil: true
  has_secure_password

end

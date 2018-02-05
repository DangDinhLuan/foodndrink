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
  mount_uploader :avatar, ImageUploader
  validates :email, presence: true,
    length: {maximum: Settings.validates.email.length.maximum},
    format: {with: Regexp.new(Settings.validates.email.pattern)},
    uniqueness: {case_sensitive: false}
  validates :phone, format: {with: Regexp.new(Settings.validates.phone.pattern)},
    uniqueness: true, allow_nil: true
  validates :address, length: {maximum: Settings.validates.address.length.maximum}
  validates :password, presence: true,
    length: {minimum: Settings.validates.password.length.minimum}, allow_nil: true
  has_secure_password

  class << self
    def digest string
      if ActiveModel::SecurePassword.min_cost
        cost = BCrypt::Engine::MIN_COST
      else
        cost = BCrypt::Engine.cost
      end
      BCrypt::Password.create string, cost: cost
    end

    def new_token
      SecureRandom.urlsafe_base64
    end
  end

  def downcase_email
    self.email = email.downcase
  end

  def create_activation_digest
    self.activation_token = User.new_token
    self.activation_digest = User.digest activation_token
  end

  def activate
    update_attribute :activated, true
    update_attribute :activated_at, Time.zone.now
  end

  def activated?
    self.activated
  end

  def remember
    self.remember_token = User.new_token
    update_attribute :remember_digest, User.digest(remember_token)
  end

  def remembered?
    self.remember_digest.present?
  end

  def forget
    update_attribute :remember_digest, nil
  end

  def create_password_reset_digest
    self.password_reset_token = User.new_token
    update_attribute :password_reset_digest, User.digest(password_reset_token)
    update_attribute :password_reset_send_at, Time.zone.now
  end

  def password_reset_expired?
    self.password_reset_send_at < Settings.validates.password.reset_expired.hours.ago
  end

  def authenticated? attribute, token
    digest = self.send("#{attribute}_digest")
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password? token
  end
end

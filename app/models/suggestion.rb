class Suggestion < ApplicationRecord
  belongs_to :user
  belongs_to :category
  validates :user_id, presence: true
  validates :category_id, presence: true
  validates :title, presence: true, length: {maximum: Settings.validates.title.length.maximum}
  validates :image, presence: true
  validates :description, presence: true
  validates :price, presence: true
  validates :status, allow_nil: true
end

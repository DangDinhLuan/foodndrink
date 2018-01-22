class Suggestion < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
  validates :user_id, presence: true
  validates :title, presence: true, length: {maximum: Settings.validates.title.length.maximum}
  validates :image, presence: true
  validates :description, presence: true
  validates :price, presence: true

end

class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :product
  validates :user_id, presence: true
  validates :product_id, presence: true
  validates :content, presence: true
  
  scope :recent, -> (id) {where(product_id: id).order(created_at: :desc)}
end

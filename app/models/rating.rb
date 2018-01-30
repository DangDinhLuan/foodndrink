class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :product
  validates :user_id, presence: true
  validates :product_id, presence: true
  validates :point, presence: true

  scope :current, ->(user_id, product_id){where(user_id: user_id, product_id: product_id)}
end
